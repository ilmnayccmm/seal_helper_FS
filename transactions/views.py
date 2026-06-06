from django.db import transaction
from django.utils import timezone
from rest_framework import permissions, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from badges.services import check_user_achievements
from seals.models import Seal
from transactions.models import SealSupport, Transaction
from transactions.serializers import DonateSerializer


class StartSupportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        seal_id = kwargs.get('seal_id')
        seal = get_object_or_404(Seal.objects.select_for_update(), id=seal_id)

        support, created = SealSupport.objects.get_or_create(
            user=request.user,
            seal=seal,
            defaults={'status': 'active'}
        )

        if not created and support.status == 'active':
            return Response(
                {"detail": "You are already supporting this seal."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not created and support.status != 'active':
            support.status = 'active'
            support.save()

        seal.guardians.add(request.user)

        check_user_achievements(request.user)

        return Response({
            "message": f"You are now supporting {seal.name}!",
            "status": "active"
        }, status=status.HTTP_201_CREATED)


class CancelSupportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        seal_id = request.data.get('seal_id')

        support = get_object_or_404(
            SealSupport,
            user=request.user,
            seal_id=seal_id,
            status='active'
        )

        support.status = 'cancelled'
        support.canceled_at = timezone.now()
        support.save()

        support.seal.guardians.remove(request.user)

        check_user_achievements(request.user)

        return Response({
            "message": f"Support for {support.seal.name} has been cancelled.",
            "status": "cancelled"
        }, status=status.HTTP_200_OK)


class DonateToSealView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        serializer = DonateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        seal_id = serializer.validated_data['seal_id']
        amount = serializer.validated_data['amount']
        seal = get_object_or_404(Seal, id=seal_id)

        payment = Transaction.objects.create(
            user=request.user,
            seal=seal,
            amount=amount,
            status='completed'
        )

        support, created = SealSupport.objects.get_or_create(
            user=request.user,
            seal=seal
        )
        support.activate_support()
        check_user_achievements(request.user)

        return Response({
            "message": f"Successfully donated ${amount} to {seal.name}!",
            "transaction_id": payment.id,
            "current_total_for_seal": seal.total_gathered
        }, status=status.HTTP_201_CREATED)