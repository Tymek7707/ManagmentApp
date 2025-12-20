from django.contrib import admin
from .models import Client, UsedPart, Order
# Register your models here.
admin.site.register(Client)
admin.site.register(UsedPart)
admin.site.register( Order)
