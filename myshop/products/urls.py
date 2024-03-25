from django.urls import path
from .views import CategoryList, ProductList
from products.views import CategoryDetail, ProductDetail, CategoryUpdate

urlpatterns = [
    path('category/', CategoryList.as_view(), name='category'),
    path('category/<slug:category_slug>/', CategoryDetail.as_view(), name='category-detail'),
    path('category/<slug:slug>/product/', ProductList.as_view(), name='product-list'),
    path('category/<slug:category_slug>/product/<slug:product_slug>/', ProductDetail.as_view(), name='product-detail'),
    path('update/<slug:slug>/', CategoryUpdate.as_view(), name='update'),

    
    #path('cartitem/', CartItemDetail.as_view(), name='cartitem-detail'),
    
]
