from decimal import Decimal

from django.db import models
from django.conf import settings
from django.db.models import Sum


class Seal(models.Model):
    STATUS_CHOICES = [
        ('treatment', 'On a treatment'),
        ('rehabilitation', 'On a rehabilitation'),
        ('released', 'Released'),
        ('permanent', 'Permanent resident'),
    ]

    name = models.CharField(max_length=100, verbose_name="Name")
    age = models.PositiveIntegerField(verbose_name="Age")
    rescue_date = models.DateField(verbose_name="Rescue Date", blank=True, default=None)
    history = models.TextField(verbose_name="Personal History", blank=True, default=None)
    guardians = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='adopted_seals',
        blank=True,
        verbose_name="Volunteers"
    )

    medical_data = models.TextField(verbose_name="Medical Data", blank=True, null=True, default=None)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='treatment',
        verbose_name="Treatment Status"
    )

    updated_at = models.DateTimeField(auto_now=True, verbose_name="Last update date")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Profile creation date")

    target_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Funding Goal"
    )

    @property
    def total_gathered(self):
        total = self.donations.filter(status='completed').aggregate(
            total=Sum('amount')
        )['total']
        return total or Decimal('0.0')

    class Meta:
        verbose_name = "Seal"
        verbose_name_plural = "Seals"

    def __str__(self):
        return self.name


class SealImage(models.Model):
    seal = models.ForeignKey(Seal, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='seals/gallery/')
    is_main = models.BooleanField(default=False, verbose_name="Main image")

    class Meta:
        verbose_name = "Seal image"
        verbose_name_plural = "Seal images"


class SealUpdateFeed(models.Model):
    seal = models.ForeignKey(Seal, related_name='updates', on_delete=models.CASCADE)
    title = models.CharField(max_length=200, verbose_name="Update title")
    content = models.TextField(verbose_name="Update text")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date")

    class Meta:
        verbose_name = "Update"
        verbose_name_plural = "Updates Feed"
        ordering = ['-created_at']
