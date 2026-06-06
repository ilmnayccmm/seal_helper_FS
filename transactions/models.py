from django.db import models
from django.conf import settings
from seals.models import Seal

class Transaction(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='payments'
    )

    seal = models.ForeignKey(
        Seal,
        on_delete=models.DO_NOTHING,
        related_name='donations'
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - ${self.amount} ({self.status})"

class SealSupport(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscriptions')
    seal = models.ForeignKey(Seal, on_delete=models.CASCADE, related_name='supported_by')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} supporting {self.seal.name} - {self.status}"

    def mark_as_completed(self):
        if self.status != 'completed':
            self.status = 'completed'
            self.save()

            support, created = SealSupport.objects.get_or_create(
                user=self.user,
                seal=self.seal
            )

            if not created and support.status == 'cancelled':
                support.activate_support()
            elif created:
                support.activate_support()

    def cancel_support(self):
        self.status = 'cancelled'
        self.save()
        self.seal.guardians.remove(self.user)

    def activate_support(self):
        self.status = 'active'
        self.save()
        self.seal.guardians.add(self.user)