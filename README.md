# 📝 Django Quiz Application

A simple and interactive **Quiz Application** built with **Django** for the backend and **HTML, CSS, JavaScript (Bootstrap)** for the frontend.
Users can attempt quizzes in different categories (Python, Django, HTML, CSS, JavaScript, Bootstrap) and see their scores instantly.

---

## 🚀 Features

* Multiple quiz categories (Python, Django, HTML, CSS, JS, Bootstrap).
* Simple and responsive UI using Bootstrap.
* Fetch quiz questions dynamically via Django REST APIs.
* Real-time score calculation and result display.
* Option to **Retry Quiz** after submission.

---

## 🛠️ Tech Stack

* **Backend:** Django (Python)
* **Frontend:** HTML, CSS, Bootstrap, JavaScript
* **Database:** SQLite (default with Django, can be switched to PostgreSQL/MySQL)

---

## 📸 Screenshots

### Quiz Interface

(![Uploading quiz_project.png…]())
*(Add a screenshot of your running app here)*

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sandhyua/quiz-app.git
   cd quiz-app
   ```

2. **Create Virtual Environment & Activate**

   ```bash
   python -m venv venv
   source venv/bin/activate   # Mac/Linux
   venv\Scripts\activate      # Windows
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Migrations**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run Development Server**

   ```bash
   python manage.py runserver
   ```

6. **Open in Browser**
   Visit: `http://127.0.0.1:8000/`

---

## 📂 Project Structure

```
quiz-app/
│── quizapp/            # Main Django app
│   ├── migrations/     
│   ├── models.py       # Database models (Questions, Categories, Answers)
│   ├── views.py        # Views and API logic
│   ├── urls.py         # App URLs
│   └── templates/      
│       └── index.html  # Main quiz UI
│
├── quizapp_project/    # Project configuration files
│   ├── settings.py
│   ├── urls.py
│
├── static/             # CSS, JS, Images
├── requirements.txt
└── README.md
```

---

## 📖 Usage Guide

* Select a quiz category (Python/Django/HTML/CSS/JS/Bootstrap).
* Attempt the multiple-choice questions.
* Submit to see your score and correct answers.
* Retry quiz anytime.

---

## 📌 Future Improvements

* Add user authentication & profiles.
* Store quiz history for each user.
* Add timer-based quizzes.
* Leaderboard functionality.

---

## 👨‍💻 Author

Developed by **[Sandhya]** ✨
🔗 [LinkedIn]((https://www.linkedin.com/in/sandhya-raj-7389a52a2)) | [GitHub](https://Sandhyua.com)

---
 Thnaku you


