from django.db import models

# Create your models here.
class Address(models.Model):
    postal_code = models.CharField(max_length=12)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.city}, {self.postal_code}, {self.street} "
class Client(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=9)
    email = models.EmailField()
    address = models.OneToOneField(Address, on_delete=models.CASCADE , blank=True )
    def __str__(self):
        return f"{self.name} {self.surname}"
class Order(models.Model):
    class OrderStatus(models.TextChoices):
        NEW = 'NE', 'Nowe'
        PENDING = 'PE', 'Oczekujące'
        SHIPPED = 'SH', 'Wysłane'
        TO_SHIP = 'TS', 'Do wysłania'
        CANCELLED = 'CA', 'Anulowane'
    client = models.ForeignKey(Client , on_delete=models.SET_NULL, null=True)
    device = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(
        max_length=2,
        choices=OrderStatus.choices,
        default=OrderStatus.NEW,
    )
    arrival_date = models.DateTimeField(auto_now_add=True)
    finish_date = models.DateTimeField(null=True, blank=True)
class UsedPart(models.Model):
    order = models.ForeignKey(Order , on_delete=models.SET_NULL , null=True)
    part = models.ForeignKey('inventory.Part', on_delete=models.SET_NULL , null=True)
    quantity = models.IntegerField