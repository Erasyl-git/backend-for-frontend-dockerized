from django.http import JsonResponse
from rest_framework import status 
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from products.serializers import ProductSerializer
from products.models import Product
from .models import CartItem
from .serializers import CartItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import *

class CartDetail(APIView):
    queryset = CartItem.objects.all()

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        user_cart = CartItem.objects.filter(user=user)
        
        cart_items_data = []
        for cart_item in user_cart:
            product_data = ProductSerializer(cart_item.product).data
            cart_item_data = {
                'product': product_data,
                'quantity': cart_item.quantity,
                'total_price': cart_item.total_price  
            }
            cart_items_data.append(cart_item_data)

        return Response(cart_items_data)

class CartAdd(APIView):
    @csrf_exempt
    def post(self, request):
        # Получаем данные из тела запроса
        data = request.data

        # Извлекаем информацию о пользователе, продукте и количестве
        username = data.get('user')
        product_slug = data.get('product')
        quantity = int(data.get('quantity'))  # Преобразуем в целое число

        # Получаем текущего пользователя по его имени
        user = get_object_or_404(User, username=username)

        # Получаем продукт по его slug
        product = get_object_or_404(Product, slug=product_slug)

        # Проверяем, есть ли уже такой товар в корзине пользователя
        cart_item, created = CartItem.objects.get_or_create(user=user, product=product)

        # Если товар уже был добавлен в корзину, увеличиваем количество и пересчитываем общую стоимость
        if not created:
            cart_item.quantity += quantity
            cart_item.total_price += product.price * quantity  # Обновляем общую стоимость
        else:
            # Иначе, просто устанавливаем количество и общую стоимость
            cart_item.quantity = quantity
            cart_item.total_price = product.price * quantity

        # Сохраняем изменения
        cart_item.save()

        # Сериализуем объект CartItem и возвращаем его данные
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data)



class CartUpdate(APIView):
    def patch(self, request):
        data = request.data
        username = data.get('user')
        product_slug = data.get('product')
        quantity = data.get('quantity')
        total_price = data.get('total_price')

        user = get_object_or_404(User, username=username)
        product = get_object_or_404(Product, slug=product_slug)
        
        # Получаем объект корзины для данного пользователя и продукта
        cart_item = get_object_or_404(CartItem, user=user, product=product)

        # Обновляем количество и общую стоимость
        cart_item.quantity = quantity
        cart_item.total_price = total_price
        cart_item.save()

        # Сериализуем объект CartItem и возвращаем его данные
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data)


class CartDelete(APIView):
    permission_classes = [AllowAny]
    def delete(self, request):
        data = request.data 
        username = data.get('username') 
        product_slug = data.get('product')

        user = get_object_or_404(User, username=username)
        product = get_object_or_404(Product, slug=product_slug)
        
        # Получаем объект корзины для данного пользователя и продукта
        cart_item = get_object_or_404(CartItem, user=user, product=product)  

        # Удаляем объект корзины
        cart_item.delete()

        return Response({'message': 'дроп товара прошёл успешно'})
    
