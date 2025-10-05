const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-btn');
const retryBtn = document.getElementById('retry-btn');
const resultArea = document.getElementById('result-area');
const quizTitle = document.getElementById('quiz-title');

let currentCategory = 'python';
let questions = [];

// Load questions by category (default python)
async function loadQuestions(category = 'python') {
    currentCategory = category;
    quizTitle.innerText = category.charAt(0).toUpperCase() + category.slice(1) + " Quiz";
    quizContainer.innerHTML = '<p>Loading questions...</p>';
    resultArea.innerHTML = '';
    try {
        const res = await fetch(`/api/questions/${category}/`);
        questions = await res.json();

        if (!questions || questions.length === 0) {
            quizContainer.innerHTML = '<p>No questions available for this category.</p>';
            return;
        }
        displayQuestions();
    } catch (err) {
        quizContainer.innerHTML = '<p>Error loading questions.</p>';
        console.error(err);
    }
}

function displayQuestions() {
    quizContainer.innerHTML = '';
    questions.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'card-question';

        let html = `<p><strong>${idx + 1}. ${q.question_text}</strong></p>`;
        q.options.forEach((opt, i) => {
            const optId = `q${q.id}_opt${i}`;
            html += `
                <div>
                  <input type="radio" id="${optId}" name="q${q.id}" value="${opt}">
                  <label class="option-label" for="${optId}">${opt}</label>
                </div>
            `;
        });

        card.innerHTML = html;
        quizContainer.appendChild(card);
    });
}

// Submit answers
submitBtn.addEventListener('click', async () => {
    // Collect answers
    const answers = questions.map(q => {
        const sel = document.querySelector(`input[name="q${q.id}"]:checked`);
        return {id: q.id, answer: sel ? sel.value : null};
    });

    // POST to backend
    try {
        const res = await fetch('/api/submit/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({answers})
        });
        const data = await res.json();
        showResults(data);
    } catch (err) {
        console.error(err);
        resultArea.innerHTML = '<div class="alert alert-danger">Error submitting answers.</div>';
    }
});

// Show results: score + per question
function showResults(data) {
    resultArea.innerHTML = '';
    if (data.error) {
        resultArea.innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
        return;
    }
    const header = document.createElement('div');
    header.className = 'mb-3';
    header.innerHTML = `<h3 class="text-primary">You scored ${data.score} out of ${data.total}</h3>`;
    resultArea.appendChild(header);

    data.results.forEach(r => {
        const card = document.createElement('div');
        card.className = 'card mb-2';
        if (r.is_correct) {
            card.classList.add('correct');
        } else {
            card.classList.add('incorrect');
        }
        let html = `<p><strong>${r.question_text}</strong></p>`;
        html += `<p>Your answer: ${r.your_answer ? r.your_answer : '<em>No answer</em>'} `;
        html += r.is_correct ? `<span class="badge bg-success ms-2">Correct</span>` : `<span class="badge bg-danger ms-2">Incorrect</span>`;
        html += `</p>`;
        if (!r.is_correct) {
            html += `<p>Correct answer: <strong>${r.correct_answer}</strong></p>`;
        }
        card.innerHTML = html;
        resultArea.appendChild(card);
    });

    // Optionally disable submit to avoid resubmission accidentally
    // submitBtn.disabled = true;
}

// Retry button
retryBtn.addEventListener('click', () => {
    loadQuestions(currentCategory);
    resultArea.innerHTML = '';
});

// initial load
document.addEventListener('DOMContentLoaded', () => {
    loadQuestions(currentCategory);
});
