from rest_framework import serializers
from .models import Category, Product
from rest_framework.renderers import JSONRenderer




class ProductSerializer(serializers.ModelSerializer):


    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    
    def get_price(self, instance):
        return instance.price

    class Meta:
        model = Category
        fields = '__all__'
