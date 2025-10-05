# models.py
from django.db import models

class Question(models.Model):
    CATEGORY_CHOICES = [
        ('python', 'Python'),
        ('django', 'Django'),
        ('html', 'HTML'),
        ('css', 'CSS'),
        ('js', 'JavaScript'),
        ('bootstrap', 'Bootstrap'),
    ]
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='python')
    question_text = models.TextField()
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)
    correct_answer = models.CharField(max_length=200, blank=True, null=True)


    def __str__(self):
        return f"{self.category} - {self.question_text[:30]}"
