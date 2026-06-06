import datetime
from cProfile import Profile
from datetime import timezone

from django.contrib.auth.models import UserManager, AbstractUser, PermissionsMixin
from django.db import models
from django.db.transaction import atomic

from user_profile.models import CustomUserProfile, CustomUserSettings


# Create your models here.
class CustomUserManager(UserManager):
    def _create_user(self, username, email, password, **kwargs):
        with atomic():
            if not email:
                raise ValueError("Email has not been provided or invalid")
            if not username:
                raise ValueError("Username has not been provided or invalid")
            email = self.normalize_email(email)
            user = self.model(
                username=username, email=email,
                **kwargs
            )
            user.set_password(password)
            user.save(using=self.db)

            from user_profile.models import CustomUserProfile, CustomUserSettings
            CustomUserProfile.objects.create(user=user)
            CustomUserSettings.objects.create(user=user)

        return user

    def create_user(self, username=None, email=None, password=None, **kwargs):
        kwargs.setdefault("is_staff", False)
        kwargs.setdefault("is_superuser", False)
        return self._create_user(username, email, password, **kwargs)

    def create_superuser(self, username=None, email=None, password=None, **kwargs):
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)

        return self._create_user(username, email, password, **kwargs)

class CustomUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(blank=True, unique=True, default='')
    username = models.CharField(max_length=255, blank=True, unique=True, default='')
    name = models.CharField(max_length=255, default='', blank=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    joined_date = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    objects = CustomUserManager()


class VolunteerApplication(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Ім'я")
    last_name = models.CharField(max_length=100, verbose_name="Прізвище")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    city = models.CharField(max_length=100, verbose_name="Місто/Регіон")

    areas_of_help = models.JSONField(verbose_name="Напрямок допомоги")

    motivation = models.TextField(verbose_name="Мотивація")
    availability = models.CharField(max_length=50, verbose_name="Доступність")
    additional_info = models.TextField(blank=True, null=True, verbose_name="Додаткова інформація")
    consent_data_processing = models.BooleanField(verbose_name="Згода з обробкою даних")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Волонтер: {self.first_name} {self.last_name} ({self.city})"
