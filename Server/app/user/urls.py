"""
URL mapping for the user API.
"""
from django.urls import path
from django.contrib.auth import views as auth_view

from user import views

app_name = 'user'

urlpatterns = [
    path('list/', views.ListUsersView.as_view(), name = 'list'),
    path('create/admin', views.CreateLabAdminView.as_view(), name = 'create/admin'),
    path('manage', views.ManageUserView.as_view(), name='manage'),
    path('create/', views.CreateLabAssistantView.as_view(), name='create'),
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('me/', views.UserProfileView.as_view(), name = 'me'),
    path('log/', views.ListUserLogsView.as_view(), name = 'log' ),
    path('logout/', views.LogoutView.as_view(), name = 'logout'),

    path('reset_password/', auth_view.PasswordResetView.as_view(), name = 'reset_password'),
    path('reset_password_sent/', auth_view.PasswordResetDoneView.as_view(), name = 'password_reset_done'),
    path('reset/<uidb64>/<token>', auth_view.PasswordResetConfirmView.as_view(), name = 'password_reset_confirm'),
    path('reset_password_complete/', auth_view.PasswordResetCompleteView.as_view, name = 'password_reset_complete')
]