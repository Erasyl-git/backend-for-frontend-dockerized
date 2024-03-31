from django.db import models



class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name='name')

    def save(self, *args, **kwargs):

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name




class Product(models.Model):

    image = models.ImageField(upload_to='product_images/', null=True)
    name = models.CharField(max_length=100, verbose_name='Отображаемое имя', null=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='KZT')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'Продукт: {self.name}'
    
    class Meta:
        ordering = ['category']
        verbose_name = 'Product'
        verbose_name_plural = 'Products'