from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name='name')
    slug = models.SlugField(unique=True, allow_unicode=True, verbose_name='Slug')



    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    def __str__(self):
        return self.name




class Product(models.Model):
    #img = models.ImageField(null=True, blank=True, upload_to='image/', verbose_name='Изображение')
    image = models.ImageField(upload_to='product_images/', null=True)
    product_display_name = models.CharField(max_length=100, verbose_name='Отображаемое имя', null=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='KZT')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    slug = models.SlugField(unique=True, allow_unicode=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name

    class Meta:
        ordering = ['category']
        verbose_name = 'Product'
        verbose_name_plural = 'Products'