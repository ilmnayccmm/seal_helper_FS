from django.contrib.auth import logout, login
from django.shortcuts import redirect
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from user_profile.serializers import FullUserSerializer
from users.models import CustomUser, VolunteerApplication
from users.serializers import CustomUserRegistrationSerializer, CustomUserLoginSerializer, CustomUserSerializer, \
    VolunteerApplicationSerializer


class ListUsers(ListAPIView):
    queryset = CustomUser.objects.select_related(
        'user_profile', 'settings'
    ).prefetch_related(
        'earned_badges__badge', 'user_profile__certificates'
    )
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]


class CustomUserRegisterView(CreateAPIView):
    permission_classes = [AllowAny, ]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserRegistrationSerializer


class CustomUserLoginView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = CustomUserLoginSerializer

    def post(self, request):
        if request.user.is_authenticated:
            token, _ = Token.objects.get_or_create(user=request.user)
            serializer = FullUserSerializer(request.user)

            return Response({
                "token": token.key,
                "user_data": serializer.data,
                "message": "You are already logged in."
            }, status=status.HTTP_200_OK)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token, created = Token.objects.get_or_create(user=user)

            login(request, user)
            user_serializer = FullUserSerializer(user)

            return Response({
                "token": token.key,
                "user_data": user_serializer.data,
                "message": "Login successful"
            }, status=status.HTTP_200_OK)

        return Response({
            "message": "Invalid credentials",
            "errors": serializer.errors
        }, status=status.HTTP_401_UNAUTHORIZED)

class CustomUserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_authenticated:
            return redirect('/')

        request.user.auth_token.delete()
        logout(request)

        return Response(
            {"message": "Successfully logged out."},
            status=status.HTTP_200_OK
        )


class BecomeVolunteerView(CreateAPIView):
    queryset = VolunteerApplication.objects.all()
    serializer_class = VolunteerApplicationSerializer
    permission_classes = [AllowAny]
