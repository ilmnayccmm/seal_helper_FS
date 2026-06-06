import os
from django.core.files import File
from django.core.management.base import BaseCommand
from badges.models import Badge
from seal_helper_backend.settings import BASE_DIR


class Command(BaseCommand):
    help = 'Populates the database with initial badges'

    def handle(self, *args, **options):
        badges_data = [
            {
                'slug': 'first-step',
                'name': 'Перший крок',
                'description': 'Зробив свій перший внесок у порятунок тюленів.',
                'icon': 'badges/first-step.png'
            },
            {
                'slug': 'seal-friend',
                'name': 'Друг котиків',
                'description': 'Став опікуном першого тюленя.',
                'icon': 'badges/seal-friend.png'
            },
            {
                'slug': 'generous-sponsor',
                'name': 'Щедрий спонсор',
                'description': 'Сума ваших донатів перевищила $500.',
                'icon': 'badges/generous.png'
            },
            {
                'slug': 'gold-donor',
                'name': 'Золотий донор',
                'description': 'Неймовірна підтримка! Сума донатів понад $2000.',
                'icon': 'badges/gold.png'
            },
            {
                'slug': 'collector',
                'name': 'Колекціонер',
                'description': 'Ви одночасно опікуєтесь 5 або більше тюленями.',
                'icon': 'badges/collector.png'
            },
            {
                'slug': 'sea-guardian',
                'name': 'Охоронець морів',
                'description': 'За активне поширення інформації про наш центр.',
                'icon': 'badges/guardian.png'
            },
            {
                'slug': 'loyal-assistant',
                'name': 'Лояльний помічник',
                'description': 'Підтримка протягом 6 місяців поспіль.',
                'icon': 'badges/loyal.png'
            },
            {
                'slug': 'help-legend',
                'name': 'Легенда допомоги',
                'description': 'Ви з нами вже понад 2 роки!',
                'icon': 'badges/legend.png'
            },
        ]

        for data in badges_data:
            # 1. Update or create the text fields first
            badge, created = Badge.objects.update_or_create(
                slug=data['slug'],
                defaults={
                    'name': data['name'],
                    'description': data['description'],
                }
            )

            # 2. Construct the absolute path to the image in the 'storage' folder
            # This assumes your 'storage' folder is in the root of your Django project
            image_path = os.path.join(BASE_DIR, 'storage', data['icon'])

            # 3. Open the file and save it to the ImageField
            if os.path.exists(image_path):
                with open(image_path, 'rb') as f:
                    file_name = os.path.basename(image_path)
                    # Use Django's File wrapper to save the image to the field
                    badge.icon.save(file_name, File(f), save=True)

                if created:
                    self.stdout.write(self.style.SUCCESS(f"Created badge & attached image: {badge.name}"))
                else:
                    self.stdout.write(self.style.WARNING(f"Updated badge & attached image: {badge.name}"))
            else:
                self.stdout.write(self.style.ERROR(f"IMAGE NOT FOUND: {image_path} for badge {badge.name}"))

        self.stdout.write(self.style.SUCCESS('Successfully populated all badges!'))
