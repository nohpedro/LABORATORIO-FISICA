"""
URL mapping for the user API.
"""
from django.urls import path

from user import views

app_name = 'user'

urlpatterns = [
    path('create/', views.CreateAssistanView.as_view(), name='create'),
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('me/', views.ManageUserView.as_view(), name = 'me'),
    path('list/', views.ListUsersView.as_view(), name = 'list')
]