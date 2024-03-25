from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .models import Product, Category,  Product
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView, ListAPIView
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions







class CategoryList(ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()

class ProductList(ListAPIView):
    serializer_class = ProductSerializer
    #parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        category_slug = self.kwargs.get('slug')
        if category_slug:
            category = Category.objects.get(slug=category_slug)
            return Product.objects.filter(category=category)
        

        return Product.objects.all()

class CategoryDetail(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    def get(self, request, *args, **kwargs):
        category = get_object_or_404(self.queryset, slug=self.kwargs['category_slug'])
        serializer = self.serializer_class(category)
        return Response(serializer.data)
    permission_classes = [permissions.AllowAny]


class ProductDetail(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'


    def get(self, request, *args, **kwargs):
        product = get_object_or_404(self.queryset, slug=self.kwargs['product_slug'])
        serializer = self.serializer_class(product)
        return Response(serializer.data)
    
class CategoryUpdate(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    def get(self, request, *args, **kwargs):
        category = get_object_or_404(self.queryset, slug=self.kwargs['slug'])
        serializer = self.serializer_class(category)
        return Response(serializer.data)
    permission_classes = [permissions.AllowAny]

