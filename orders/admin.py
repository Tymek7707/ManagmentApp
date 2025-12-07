from django.contrib import admin
from .models import Client, UsedPart , Address , Order
# Register your models here.
admin.site.register(Client)
admin.site.register(UsedPart)
admin.site.register( Address)
admin.site.register( Order)
