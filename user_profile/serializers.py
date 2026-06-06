from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from badges.serializers import EarnedBadgeSerializer, UserCertificateSerializer
from seals.serializers import SealsListSerializer
from transactions.serializers import TransactionHistorySerializer
from user_profile.models import CustomUserProfile, CustomUserSettings
from users.models import CustomUser


class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserSettings
        fields = ['theme', 'font_style', 'notifications_enabled']


class CustomUserProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField()
    email = serializers.ReadOnlyField()
    total_donations = serializers.ReadOnlyField()
    badges = EarnedBadgeSerializer(many=True, read_only=True)
    adopted_seals = serializers.SerializerMethodField()

    class Meta:
        model = CustomUserProfile
        fields = [
            'id',
            'username',
            'email',
            'date_of_birth',
            'bio',
            'profile_image',
            'social_shares_count',
            'total_donations',
            'adopted_seals',
            'badges'
        ]

    def get_adopted_seals(self, obj):
        from seals.serializers import SealsListSerializer
        from transactions.models import SealSupport

        active_supports = SealSupport.objects.filter(user=obj.user.id, status='active')
        seals = [support.seal for support in active_supports]

        return SealsListSerializer(seals, many=True).data

class MyProfileSerializer(serializers.ModelSerializer):
    settings = UserSettingsSerializer(source='user.settings', read_only=True)
    adopted_seals = serializers.SerializerMethodField()
    profile_data = CustomUserProfileSerializer(source='user_profile', read_only=True)
    settings_data = UserSettingsSerializer(source='settings', read_only=True)
    badges = EarnedBadgeSerializer(many=True, read_only=True)
    certificates = UserCertificateSerializer(many=True, read_only=True)
    total_donations = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    transactions = TransactionHistorySerializer(source='user.payments', many=True, read_only=True)

    class Meta:
        model = CustomUserProfile
        fields = ['id',
            'username', 'email', 'date_of_birth', 'bio', 'profile_image', 'settings', 'adopted_seals',
            'profile_data', 'settings_data', 'badges', 'certificates', 'total_donations',
            'transactions'
        ]

    def get_adopted_seals(self, obj):
        from seals.serializers import SealsListSerializer
        from transactions.models import SealSupport

        active_supports = SealSupport.objects.filter(user=obj.user.id, status='active')
        seals = [support.seal for support in active_supports]

        return SealsListSerializer(seals, many=True).data


class FullUserSerializer(serializers.ModelSerializer):
    profile_data = CustomUserProfileSerializer(source='user_profile', read_only=True)
    settings_data = UserSettingsSerializer(source='settings', read_only=True)
    badges = EarnedBadgeSerializer(many=True, read_only=True)
    certificates = UserCertificateSerializer(many=True, read_only=True)
    total_donations = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = CustomUserProfile
        fields = (
            'id',
            'username',
            'email',

            'profile_data',
            'settings_data',

            'total_donations',
            'badges',
            'certificates'
        )


class ProfileUpdateSerializer(serializers.ModelSerializer):
    theme = serializers.CharField(source='user.settings.theme')
    font_style = serializers.CharField(source='user.settings.font_style')
    notifications_enabled = serializers.BooleanField(source='user.settings.notifications_enabled')

    email = serializers.EmailField(source='user.email')

    class Meta:
        model = CustomUserProfile
        fields = [
            'email', 'date_of_birth', 'bio', 'profile_image',
            'theme', 'font_style', 'notifications_enabled'
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user
        if 'email' in user_data:
            user.email = user_data['email']
            user.save()

        settings_data = user_data.get('settings', {})
        settings = user.settings
        for attr, value in settings_data.items():
            setattr(settings, attr, value)
        settings.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
