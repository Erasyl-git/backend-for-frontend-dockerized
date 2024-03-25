from django.urls import path
from .views import CartDetail, CartAdd, CartUpdate,CartDelete


urlpatterns = [
    path('mycart/<str:username>/', CartDetail.as_view(), name='cart'),
    path('add/', CartAdd.as_view(), name='add'),
    path('update/', CartUpdate.as_view(), name='update'),
    path('delete/', CartDelete.as_view(), name='delete'),
]


