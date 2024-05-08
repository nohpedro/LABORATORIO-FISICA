"""
Database models
"""
from django.conf import settings
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
)

from core.permissions import Role, RolePermissionsMixin

from django.contrib.auth.password_validation import validate_password

from core.permissions import LAB_ADMIN, LAB_ASSIST

class LabAdmin(Role):
    """Lab Administrator role"""

    class Meta:
        permissions = [ ("lab_admin_creation", "Creation of lab admin users"),
                        ("lab_admin_modification", "Modification of lab admin users"),
                        ("assistant_inactivation", "Deletion of assistant users"),
                        ("assistant_modification", "Modification of assistant users"),
                        ("assistant_creation", "Creation of assistan users"),
                        ]
        proxy = True

    def save(self, *args, **kwargs):
        self.role_name = LAB_ADMIN
        super().save(*args, **kwargs)


class LabAssistant(Role):
    """Lab Assistant role"""

    class Meta:
        permissions = []
        proxy = True

    def save(self, *args, **kwargs):
        self.role_name = LAB_ASSIST
        super().save(*args, **kwargs)


def createAdminRole():
    try:
        Role.objects.get(role_name = LAB_ADMIN)
        print(LAB_ADMIN + "LabAdmin Already Added")
    except:
        LabAdmin.objects.create()
        print(LAB_ADMIN + "LabAdmin Added")

def createAssistantRole():
    try:
        Role.objects.get(role_name = LAB_ASSIST)
        print(LAB_ASSIST + "LabAssistant  Added")
    except:
        LabAssistant.objects.create()
        print(LAB_ASSIST + "LabAssistant Added")

def createRoles():
    createAdminRole()
    createAssistantRole()


def getAdminRole():
    try:
        return LabAdmin.objects.get(role_name = LAB_ADMIN)
    except:
        createAdminRole()
        return LabAdmin.objects.get(role_name = LAB_ADMIN)


def getAssistantRole():
    try:
        return LabAssistant.objects.get(role_name = LAB_ASSIST)
    except:
        return LabAssistant.objects.get(role_name = LAB_ASSIST)


class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        validate_password(password)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_lab_admin(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.role = getAdminRole()
        validate_password(password)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_lab_assistant(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.role = getAssistantRole()
        validate_password(password)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """Create and return a new superuser."""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, RolePermissionsMixin):
    """User in the system."""

    class Meta:
        permissions = [("own_password_modification", "Modification of self's account password"),
                       ("own_phone_modification", "Modification of self's account phone number"),]

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'




class Recipe(models.Model):
    """Recipe object."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    time_minutes = models.IntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2)
    link = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title

