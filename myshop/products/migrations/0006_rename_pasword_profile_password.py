# Generated by Django 5.0.1 on 2024-01-30 10:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_profile_email_profile_first_name_profile_last_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='pasword',
            new_name='password',
        ),
    ]
