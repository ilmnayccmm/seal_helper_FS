import csv

from django.contrib import admin
from django.http import HttpResponse

from users.models import CustomUser
from users.models import VolunteerApplication

admin.site.register(CustomUser)


@admin.register(VolunteerApplication)
class VolunteerApplicationAdmin(admin.ModelAdmin):
    # What columns to show in the admin list view
    list_display = ('first_name', 'last_name', 'email', 'phone', 'city', 'created_at')

    # Add filters to the right sidebar
    list_filter = ('city', 'availability', 'created_at')

    # Add search functionality
    search_fields = ('first_name', 'last_name', 'email', 'phone')

    # Register the custom export action
    actions = ['export_as_csv']

    @admin.action(description="Завантажити обрані як CSV")
    def export_as_csv(self, request, queryset):
        # 1. Create the HttpResponse object with CSV headers
        response = HttpResponse(content_type='text/csv')
        # This tells the browser to download the file instead of displaying it
        response['Content-Disposition'] = 'attachment; filename="volunteer_applications.csv"'

        # 2. Add UTF-8 BOM so Excel opens Cyrillic (Ukrainian) characters correctly
        response.write('\ufeff'.encode('utf8'))

        writer = csv.writer(response)

        # 3. Write the header row
        writer.writerow([
            "Ім'я",
            "Прізвище",
            "Email",
            "Телефон",
            "Місто",
            "Напрямок допомоги",
            "Мотивація",
            "Доступність",
            "Додаткова інформація",
            "Згода на обробку",
            "Дата подачі"
        ])

        # 4. Write data rows
        for obj in queryset:
            # The JSON array of checkboxes needs to be joined into a single readable string
            areas = ", ".join(obj.areas_of_help) if isinstance(obj.areas_of_help, list) else str(obj.areas_of_help)

            writer.writerow([
                obj.first_name,
                obj.last_name,
                obj.email,
                obj.phone,
                obj.city,
                areas,
                obj.motivation,
                obj.availability,
                obj.additional_info,
                "Так" if obj.consent_data_processing else "Ні",
                obj.created_at.strftime("%Y-%m-%d %H:%M")  # Format the date nicely
            ])

        return response
