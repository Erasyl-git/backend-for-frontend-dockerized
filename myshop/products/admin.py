from django.contrib import admin
from .models import Product, Category
from django.utils.safestring import mark_safe




    
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'image_show', 'price']
    list_filter = ['category']
    search_fields = ['name']

    def image_show(self, obj):
        if obj.image:
            return mark_safe("<img src='{}' width='60' />".format(obj.image.url))


admin.site.register(Product,ProductAdmin)
admin.site.register(Category)

