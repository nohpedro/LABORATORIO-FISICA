"""
Serializers for the user API view.
"""
from django.contrib.auth import (
    get_user_model,
    authenticate,
)
from django.utils.translation import gettext as _
from rest_framework import serializers


from core.models import Session, getAdminRole, getAssistantRole, LAB_ADMIN, LAB_ASSIST

from rest_framework.exceptions import APIException



class NotValidRole(APIException):
    status_code = 400
    default_detail = 'A non valid role name has been sent.'
    default_code = 'not_a_valid_role'


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object."""

    role_field = serializers.CharField(source='role.role_name', read_only=True)

    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'name', 'is_active', 'role_field']
        extra_kwargs = {'password':{'write_only': True, 'min_length': 12},
                        'email':{'read_only':True},
                        'role_field':{'read_only':True},
                        'is_active':{'read_only':True},
                        }

    def create(self, validated_data):
        """Create and return a user with encrypted password"""
        return get_user_model().objects.create_user(**validated_data)


    def update(self, instance, validated_data):
        """Update and return user."""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class ManageUserSerializer(UserSerializer):

    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'name', 'is_active', 'role_field']
        extra_kwargs = {'password':{'write_only': True, 'min_length': 12},}


    def create(self, validated_data):
        """Create and return a user with encrypted password"""
        role_name = validated_data.pop('role_field', None)
        user = get_user_model().objects.create_user(**validated_data)

        if role_name:
            if(role_name == LAB_ASSIST):
                user.role = getAssistantRole()
            elif(role_name == LAB_ADMIN):
                user.role = getAdminRole()
            else:
                raise NotValidRole()

        return user


    def update(self, instance, validated_data):
        """Update and return user."""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user

class AssistanSerializer(ManageUserSerializer):

    def create(self, validated_data):
        """Create and return a user with encrypted password"""
        return get_user_model().objects.create_lab_assistant(**validated_data)


class AdminSerializer(ManageUserSerializer):

    def create(self, validated_data):
        """Create and return a user with encrypted password"""
        return get_user_model().objects.create_lab_admin(**validated_data)




class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user auth token."""
    email = serializers.EmailField()
    password = serializers.CharField(
        style = {'input_type': 'password'},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        """Validate and authenticate the user."""
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password,
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials.')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


class  SessionSerializer(serializers.ModelSerializer):
    """Serializer for session."""

    class Meta:
        model = Session
        fields = ['id', 'login_time', 'logout_time']
        read_only_fields = ['id', 'login_time', 'logout_time']
