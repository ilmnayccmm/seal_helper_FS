from http import HTTPStatus

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class HomePageView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({"status_code": HTTPStatus.OK})