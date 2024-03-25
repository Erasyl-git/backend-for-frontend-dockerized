from django.db import models
from django.contrib.auth.models import User
from products.models import Product



class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product ,on_delete=models.CASCADE)
    quantity = models.PositiveBigIntegerField(default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Поле для общей стоимости

    created_timistamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f'корзина для {self.user.username}| продукт {self.product.name}'



#    def save(self, *args, **kwargs):
#        # Вычисляем общую стоимость при сохранении объекта CartItem
#        self.total_price = self.product.price * self.quantity
#        super().save(*args, **kwargs)