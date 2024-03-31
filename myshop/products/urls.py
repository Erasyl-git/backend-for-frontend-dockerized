from django.urls import path
from .views import CategoryList, ProductList
from products.views import CategoryDetail, ProductDetail
urlpatterns = [
    path('category/', CategoryList.as_view(), name='category'),
    path('category/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('category/<int:pk>/product/', ProductList.as_view(), name='product-list'),
    path('category/<int:category_pk>/product/<int:pk>/', ProductDetail.as_view(), name='product-detail'),

    
    #path('cartitem/', CartItemDetail.as_view(), name='cartitem-detail'),
    
]
