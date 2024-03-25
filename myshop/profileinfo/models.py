from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(null=True, blank=True,default="")
    username = models.CharField(max_length=255,default="")
    email = models.EmailField(null=True, blank=True,default="")
    password = models.CharField(max_length=255,default="")



    def __str__(self):
        return f"Profile for {self.user.username}"

