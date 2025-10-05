from django.shortcuts import render
from django.http import JsonResponse
from .models import Question
from django.views.decorators.csrf import csrf_exempt
import json

# Home page (template)
def index(request):
    return render(request, 'index.html')


# Questions API for a category
def questions_api(request, category):
    qs = Question.objects.filter(category=category)
    data = []
    for q in qs:
        # collect only non-empty options (but keep order)
        options = []
        for opt in (q.option1, q.option2, q.option3, q.option4):
            if opt is not None and opt != '':
                options.append(opt)
        data.append({
            'id': q.id,
            'question_text': q.question_text,
            'options': options
        })
    return JsonResponse(data, safe=False)


# Submit API - calculate score and per-question result
@csrf_exempt
def submit_api(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    try:
        payload = json.loads(request.body)
        answers = payload.get('answers', [])
        score = 0
        results = []

        for ans in answers:
            qid = ans.get('id')
            user_ans = ans.get('answer')
            try:
                question = Question.objects.get(id=qid)
            except Question.DoesNotExist:
                continue
            correct = question.correct_answer
            is_correct = (user_ans == correct)
            if is_correct:
                score += 1
            results.append({
                'id': qid,
                'question_text': question.question_text,
                'your_answer': user_ans,
                'correct_answer': correct,
                'is_correct': is_correct
            })

        total = Question.objects.filter(category__in=['python','django','html','css','js','bootstrap']).count()
        # total could be changed to number of questions asked; better return len(results) if needed
        return JsonResponse({'score': score, 'total': len(results), 'results': results})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
