from django.db.transaction import atomic
from rest_framework import serializers
from django.contrib.auth import authenticate

from user_profile.models import CustomUserProfile, CustomUserSettings
from user_profile.serializers import CustomUserProfileSerializer
from users.models import CustomUser, VolunteerApplication


class CustomUserSerializer(serializers.ModelSerializer):
    user_profile = CustomUserProfileSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'user_profile']


class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class CustomUserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class VolunteerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerApplication
        fields = '__all__'
