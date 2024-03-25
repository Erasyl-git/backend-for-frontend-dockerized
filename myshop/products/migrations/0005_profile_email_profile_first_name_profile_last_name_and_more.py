# Generated by Django 5.0.1 on 2024-01-30 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_alter_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='email',
            field=models.EmailField(blank=True, default='', max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='first_name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='profile',
            name='last_name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='profile',
            name='pasword',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_name',
            field=models.CharField(default='', max_length=255),
        ),
    ]