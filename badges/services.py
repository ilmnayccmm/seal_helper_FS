from decimal import Decimal
from badges.models import Badge, EarnedBadge

def award_badge(user, slug):
    badge = Badge.objects.filter(slug=slug).first()
    if badge:
        EarnedBadge.objects.get_or_create(user=user, badge=badge)

def check_user_achievements(user):
    profile = user.user_profile
    total_donated = profile.total_donations
    adopted_count = user.subscriptions.filter(status='active').count()

    # 1. "Перший крок"
    if total_donated > 0:
        award_badge(user, 'first-step')

    # 2. "Друг котиків"
    if adopted_count >= 1:
        award_badge(user, 'seal-friend')

    # 3. "Щедрий спонсор"
    if total_donated >= Decimal('500.00'):
        award_badge(user, 'generous-sponsor')

    # 4. "Золотий донор"
    if total_donated >= Decimal('2000.00'):
        award_badge(user, 'gold-donor')

    # 5. "Колекціонер"
    if adopted_count >= 5:
        award_badge(user, 'collector')

    # 6. "Охоронець морів"
    if getattr(profile, 'social_shares_count', 0) >= 10:
        award_badge(user, 'sea-guardian')