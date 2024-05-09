from django.urls import path

from django.contrib.auth import views as auth_view
from . import views

app_name = 'pages'


urlpatterns = [
    path('reset_password/', auth_view.PasswordResetView.as_view(), name = 'reset_password'),
    path('reset_password_sent/', auth_view.PasswordResetDoneView.as_view(), name = 'password_reset_done'),
    path('reset/<uidb64>/<token>', auth_view.PasswordResetConfirmView.as_view(), name = 'password_reset_confirm'),
    path('reset_password_complete/', auth_view.PasswordResetCompleteView.as_view, name = 'password_reset_complete'),
    path('', views.index),
    path('includes/navbar.html/', views.navbar)
]