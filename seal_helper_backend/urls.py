from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include

from seal_helper_backend.views import HomePageView
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from users.views import CustomUserRegisterView, CustomUserLoginView, CustomUserLogoutView, BecomeVolunteerView

schema_view = get_schema_view(
   openapi.Info(
      title="Seal Helper API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="skxlpv@gmail.com"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny,],
)


urlpatterns = [
    path('', HomePageView.as_view(), name="home"),
    path('admin/', admin.site.urls),

    path('users/', include('user_profile.urls'), name="users"),
    path('seals/', include('seals.urls'), name="seals"),
    path('support/', include('transactions.urls'), name="transactions"),
    path('help/become-volunteer/', BecomeVolunteerView.as_view(), name='become-volunteer'),

    path('register/', CustomUserRegisterView.as_view(), name='register_page'),
    path('login/', CustomUserLoginView.as_view(), name='login'),
    path('logout/', CustomUserLogoutView.as_view(), name='logout'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)