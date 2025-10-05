from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='quiz-home'),
    path('api/questions/<str:category>/', views.questions_api, name='questions-api'),
    path('api/submit/', views.submit_api, name='submit-api'),
]

