from rest_framework import serializers
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from badges.services import check_user_achievements
from user_profile.models import CustomUserProfile, CustomUserSettings
from user_profile.serializers import MyProfileSerializer, UserSettingsSerializer, \
    FullUserSerializer, CustomUserProfileSerializer, ProfileUpdateSerializer


class ListCustomUserProfiles(ListAPIView):
    queryset = CustomUserProfile.objects.all()
    serializer_class = FullUserSerializer


class CustomUserProfileDetail(RetrieveAPIView):
    queryset = CustomUserProfile.objects.all()
    serializer_class = CustomUserProfileSerializer


class MyProfileView(RetrieveUpdateAPIView):
    serializer_class = MyProfileSerializer
    permission_classes = [IsAuthenticated, ]

    def get_object(self):
        profile = self.request.user.user_profile
        check_user_achievements(self.request.user)
        return profile

class UpdateSettingsView(RetrieveUpdateAPIView):
    serializer_class = UserSettingsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj, created = CustomUserSettings.objects.get_or_create(user=self.request.user)
        return obj

class ProfileUpdateView(RetrieveUpdateAPIView):
    serializer_class = ProfileUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.user_profile
