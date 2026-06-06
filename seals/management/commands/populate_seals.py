import os
import random
from datetime import timedelta
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.conf import settings
from django.utils import timezone

from seals.models import Seal, SealImage, SealUpdateFeed
from transactions.models import Transaction


class Command(BaseCommand):
    help = 'Autopopulate the database with random Seals and assign random images'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing seals before populating',
        )

    def handle(self, *args, **kwargs):
        if kwargs['clear']:
            self.stdout.write(self.style.WARNING('Clearing existing Seals and related data...'))
            Transaction.objects.all().delete()
            Seal.objects.all().delete()

        names = [
            'Ponsuke', 'Kyoro', 'Hiyori', 'Tsuki',
            'Snuggle', 'Yo', 'Tsuki', 'Mizore'
        ]

        gallery_dir = os.path.join(settings.MEDIA_ROOT, 'seals', 'gallery')

        available_images = []
        if os.path.exists(gallery_dir):
            available_images = [
                f for f in os.listdir(gallery_dir)
                if os.path.isfile(os.path.join(gallery_dir, f)) and not f.startswith('.')
            ]
        else:
            self.stdout.write(self.style.WARNING(
                f"Directory {gallery_dir} does not exist. Seals will be created without images."
            ))

        statuses = [choice[0] for choice in Seal.STATUS_CHOICES]

        self.stdout.write("Populating seals...")

        for name in names:
            # 1. Create the Seal
            random_days_ago = random.randint(10, 730)
            rescue_date = timezone.now().date() - timedelta(days=random_days_ago)

            seal = Seal.objects.create(
                name=name,
                age=random.randint(1, 15),
                rescue_date=rescue_date,
                history=f"{name} was rescued {random_days_ago} days ago. They are doing very well and love eating fish.",
                medical_data="Vitals are stable. Receiving standard vitamin supplements.",
                status=random.choice(statuses),
                target_amount=Decimal(random.randint(500, 5000))
            )

            # 2. Assign a random Image (if images exist in the folder)
            if available_images:
                num_images = random.randint(1, min(3, len(available_images)))
                chosen_images = random.sample(available_images, num_images)

                for index, img_filename in enumerate(chosen_images):
                    relative_image_path = f"seals/gallery/{img_filename}"

                    SealImage.objects.create(
                        seal=seal,
                        image=relative_image_path,
                        is_main=(index == 0)
                    )

            # 3. Create a mock Update Feed to make the data look complete
            SealUpdateFeed.objects.create(
                seal=seal,
                title=f"{name} had a great day!",
                content=f"Today {name} played with the volunteers and ate a lot of fish."
            )

            self.stdout.write(self.style.SUCCESS(f'Successfully created profile for {name}'))

        self.stdout.write(self.style.SUCCESS('Autopopulation complete!'))