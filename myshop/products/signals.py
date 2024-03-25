#from django.db.models.signals import post_save
#from django.dispatch import receiver
#from django.contrib.auth.models import User
#from ca.models import CartItem
#
#
#@receiver(post_save, sender=User)
#def create_profile_and_cart(sender, instance, created, **kwargs):
#    if created:
#        CartItem.objects.create(user=instance)
#