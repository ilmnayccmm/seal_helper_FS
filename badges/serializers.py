from rest_framework import serializers
from .models import Badge, EarnedBadge
from user_profile.models import CustomUserCertificate

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ('name', 'slug', 'description', 'icon')

class EarnedBadgeSerializer(serializers.ModelSerializer):
    badge = BadgeSerializer(read_only=True)

    class Meta:
        model = EarnedBadge
        fields = ('badge', 'awarded_at')

class UserCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserCertificate
        fields = ('name', 'file', 'uploaded_at')
