from decimal import Decimal

from django.conf import settings
from django.db import models
from django.db.models import Sum


class CustomUserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_profile'
    )
    date_of_birth = models.DateField(null=True, blank=True, default=None)
    bio = models.TextField(max_length=300, blank=True, null=True, default=None)
    profile_image = models.ImageField(upload_to='profiles/avatars/', null=True, blank=True)
    social_shares_count = models.PositiveIntegerField(default=0)

    @property
    def username(self):
        return self.user.username

    @property
    def email(self):
        return self.user.email

    @property
    def transaction_history(self):
        return self.user.support.all()

    @property
    def active_seals(self):
        return [sub.seal for sub in self.user.support.filter(status='active')]

    @property
    def total_donations(self):
        total = self.user.payments.filter(status='completed').aggregate(
            total=Sum('amount')
        )['total']
        return total if total is not None else Decimal('0.00')

    @property
    def badges(self):
        return self.user.earned_badges.all()

    def __str__(self):
        return f"Profile for {self.user.username}"

class CustomUserSettings(models.Model):
    THEME_CHOICES = [('light', 'Light'), ('dark', 'Dark'), ('amoled', 'Amoled')]
    FONT_CHOICES = [('standard', 'Standard'), ('serif', 'Serif'), ('mono', 'Monospaced')]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='settings'
    )
    theme = models.CharField(max_length=20, choices=THEME_CHOICES, default='light')
    font_style = models.CharField(max_length=20, choices=FONT_CHOICES, default='standard')
    notifications_enabled = models.BooleanField(default=True)

    def __str__(self):
        return f"Settings for {self.user.username}"


class CustomUserCertificate(models.Model):
    user_profile = models.ForeignKey(
        CustomUserProfile,
        on_delete=models.CASCADE,
        related_name='certificates'
    )
    name = models.CharField(max_length=255, verbose_name="Certificate Name")
    file = models.FileField(upload_to='profiles/certificates/%Y/%m/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.user_profile.user.username}"