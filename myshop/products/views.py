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

    def get_queryset(self):
        queryset = Product.objects.all()
        return queryset.prefetch_related('category')
    

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
