from .models import Product, Category,  Product
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from django.db.models import F






class CategoryList(ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()

class ProductList(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all().prefetch_related('product').only('product')

    def get_queryset(self):
        category_pk = self.kwargs.get('pk')
        if category_pk:
            category = get_object_or_404(Category, pk=category_pk)
            # Фильтруем продукты по категории
            return Product.objects.filter(category=category)
        

        return self.queryset

class CategoryDetail(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        category = get_object_or_404(self.queryset, pk=self.kwargs['pk'])
        serializer = self.serializer_class(category)
        return Response(serializer.data)
    permission_classes = [permissions.AllowAny]


class ProductDetail(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'


    def get(self, request, *args, **kwargs):
        product = get_object_or_404(self.queryset, pk=self.kwargs['pk'])
        serializer = self.serializer_class(product)
        return Response(serializer.data)
