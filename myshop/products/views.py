from .models import Product, Category,  Product
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from django.db.models import F
from django.db.models import Prefetch





class CategoryList(ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()


class ProductList(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all().select_related('category')
    def get_queryset(self):
        category_pk = self.kwargs.get('pk')
        if category_pk:
            category = Category.objects.get(id=category_pk)
        #так как у нас почему то отправляет несколько запросов в бд а именно category то я решил сделать так чтобы они не дублировались.
            queryset = self.queryset.filter(category=category)
            return queryset
    

class CategoryDetail(RetrieveAPIView):
    #получаем данные из бд
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        #при получении данных мы либо отправим данные в ином случае 404
        category = get_object_or_404(self.queryset, pk=self.kwargs['pk'])
        serializer = self.serializer_class(category)
        #отправка данных в формате json
        return Response(serializer.data)
    permission_classes = [permissions.AllowAny]

#анологично как сверху
class ProductDetail(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'


    def get(self, request, *args, **kwargs):
        product = get_object_or_404(self.queryset, pk=self.kwargs['pk'])
        serializer = self.serializer_class(product)
        return Response(serializer.data)
