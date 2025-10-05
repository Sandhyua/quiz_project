from django.contrib import admin
from .models import Question

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'question_text')
    list_filter = ('category',)
    search_fields = ('question_text',)
