from django.contrib import admin

from user_profile.models import CustomUserProfile, CustomUserSettings

# Register your models here.
admin.site.register(CustomUserProfile)
admin.site.register(CustomUserSettings)