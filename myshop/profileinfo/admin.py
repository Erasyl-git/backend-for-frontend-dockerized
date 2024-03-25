from django.contrib import admin
from .models import Profile

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user','get_image', 'get_username', 'email', 'get_password']

    def get_image(self, obj):
        return obj.image
    
    def get_username(self, obj):
        return obj.username

    def get_email(self, obj):
        return obj.email
    
    def get_password(self, obj):
        return obj.password
    
    
admin.site.register(Profile, ProfileAdmin)
