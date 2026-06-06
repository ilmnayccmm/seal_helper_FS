from django.urls import path

from user_profile.views import (
    ListCustomUserProfiles, MyProfileView,
    UpdateSettingsView, CustomUserProfileDetail,
    ProfileUpdateView
)

urlpatterns = [
    path('', ListCustomUserProfiles.as_view(), name="profiles"),
    path('profile/', MyProfileView.as_view(), name="my_profile"),
    path('profile/<int:pk>/', CustomUserProfileDetail.as_view(), name="retrieve_profile"),
    path('profile/settings/', UpdateSettingsView.as_view(), name="my_settings"),
    path('profile/edit/', ProfileUpdateView.as_view(), name="edit_profile"),
]