from decimal import Decimal

from rest_framework import serializers

from transactions.models import Transaction


class DonateSerializer(serializers.Serializer):
    seal_id = serializers.IntegerField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.01'))

class TransactionHistorySerializer(serializers.ModelSerializer):
    seal_name = serializers.ReadOnlyField(source='seal.name')
    date = serializers.DateTimeField(source='created_at', format="%Y-%m-%d %H:%M")

    class Meta:
        model = Transaction
        fields = ('id', 'amount', 'status', 'date', 'seal_name')
