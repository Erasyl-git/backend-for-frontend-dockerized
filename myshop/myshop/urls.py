
from django.contrib import admin
from django.urls import path, include
from myshop.settings import MEDIA_URL, MEDIA_ROOT
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),

    path('catalog/', include('products.urls')),
    path('cart/', include('cart.urls')),
    path('account/', include('profileinfo.urls')),

] 

urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)

