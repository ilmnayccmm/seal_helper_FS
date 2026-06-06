from django.contrib import admin

from transactions.models import Transaction, SealSupport

admin.site.register(Transaction)
admin.site.register(SealSupport)