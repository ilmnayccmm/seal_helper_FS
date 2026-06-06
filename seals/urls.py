from django.urls import path

from seals.views import ListSeals, SealDetailView

urlpatterns = [
    path('', ListSeals.as_view(), name="all_seals"),
    path('<int:pk>/', SealDetailView.as_view(), name="seal_detail"),
]
