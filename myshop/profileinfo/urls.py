from django.urls import path, include

from .views import  CreatedUserApiView, ProfileDetail,LoginUserApiView, ProfileUpdate

urlpatterns = [

    path('profile/<str:username>/', ProfileDetail.as_view(), name='profile'),
    path('register/', CreatedUserApiView.as_view(), name='register'),
    path('signin/', LoginUserApiView.as_view(), name='signin'),
    path('update/',ProfileUpdate.as_view(), name='update'),
    path('cart/', include('cart.urls')),

]

