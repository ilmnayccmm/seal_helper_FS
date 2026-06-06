from django.urls import path

from transactions.views import StartSupportView, CancelSupportView, DonateToSealView

urlpatterns = [
    path('<int:seal_id>/', StartSupportView.as_view(), name="start_support"),
    path('<int:support_id>/cancel', CancelSupportView.as_view(), name='cancel_support'),
    path('donate/', DonateToSealView.as_view(), name='api-donate'),
]