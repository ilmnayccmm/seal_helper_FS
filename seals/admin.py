from django.contrib import admin

from seals.models import Seal, SealImage, SealUpdateFeed

# Register your models here.
admin.site.register(Seal)
admin.site.register(SealImage)
admin.site.register(SealUpdateFeed)