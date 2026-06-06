from rest_framework import serializers

from seals.models import Seal, SealImage, SealUpdateFeed

class SealImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SealImage
        fields = ['id', 'image', 'is_main']

class SealUpdateFeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = SealUpdateFeed
        fields = ['id', 'title', 'content', 'created_at']

class SealsListSerializer(serializers.ModelSerializer):
    images = SealImageSerializer(many=True, read_only=True)
    updates = SealUpdateFeedSerializer(many=True, read_only=True)
    guardian_count = serializers.IntegerField(source='guardians.count', read_only=True)

    class Meta:
        model = Seal
        fields = [
            'id', 'name', 'age',
            'status', 'rescue_date',
            'history', 'guardians',
            'medical_data', 'images',
            'updates', 'guardian_count',
            'total_gathered', 'target_amount'
        ]
