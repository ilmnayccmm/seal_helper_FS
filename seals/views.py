from rest_framework import status
from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from seals.models import Seal
from seals.serializers import SealsListSerializer


class ListSeals(ListAPIView):
    queryset = Seal.objects.prefetch_related('images', 'updates').all()
    serializer_class = SealsListSerializer


class SealDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly, ]

    def get(self, request, pk):
        seal = get_object_or_404(Seal, pk=pk)
        serializer = SealsListSerializer(seal)
        return Response(serializer.data)
