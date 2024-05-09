"""
Views for the user API.
"""
from rest_framework import generics, authentication, permissions, throttling
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework import pagination

from core.models import User
from core.permissions import getDBPermission, IsLabAdmin
from core.utils import LogInThrottle

from django.contrib.auth import get_user_model

from user.serializers import (
    AssistantUserSerializer,
    AdminUserSerializer,
    AuthTokenSerializer,
    UserSerializer,
)

from rest_framework.serializers import ModelSerializer

from core.models import getAdminRole, getAssistantRole



class UserListPagination(pagination.CursorPagination):
    page_size = 10
    ordering = 'email'
    cursor_query_param = 'cursor'
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return super().get_paginated_response(data)



class ListUsersView(generics.ListAPIView):
    """List saves users in the api"""
    serializer_class = UserSerializer
    permission_classes = []# [IsLabAdmin]
    pagination_class = UserListPagination
    queryset = get_user_model().objects.all().order_by('email')


    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


    def get_queryset(self):

        admin_param = self.request.query_params.get('is_admin', None)
        queryset = self.queryset
        # Filter queryset based on the 'admin' parameter
        if admin_param is not None:
            if admin_param.lower() in ['true', '1', 'yes']:
                admin = getAdminRole()
                queryset = queryset.filter(role = admin)

            elif admin_param.lower() in ['false', '0', 'no']:
                assistant = getAssistantRole()
                queryset = queryset.filter(role = assistant)

        return queryset


class CreateAssistanView(generics.CreateAPIView):
    """Create a new lab asistant in the system."""
    serializer_class = AssistantUserSerializer
    permission_classes = []

class CreateAdminView(generics.CreateAPIView):
    """Create a new lab admin in the system"""
    serializer_class = AdminUserSerializer
    permission_classes = [IsLabAdmin]


class CreateTokenView(ObtainAuthToken):
    """Create a new auth toker for user."""
    serializer_class = AuthTokenSerializer
    throttle_classes = [LogInThrottle]
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user."""
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """Retrieve and return the authenticated user."""
        return self.request.user

