from django.db import models

# Create your models here.
class Client(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=9)
    email = models.EmailField()
    postal_code = models.CharField(max_length=12)
    city = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.name} {self.surname}"


class Order(models.Model):
    class OrderStatus(models.TextChoices):
        NEW = 'NE', 'Nowe'
        PENDING = 'PE', 'Oczekujące'
        SHIPPED = 'SH', 'Wysłane'
        TO_SHIP = 'TS', 'Do wysłania'
        CANCELLED = 'CA', 'Anulowane'

    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, related_name='orders')
    device = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=2, choices=OrderStatus.choices, default=OrderStatus.NEW)
    arrival_date = models.DateTimeField(auto_now_add=True)
    finish_date = models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return f"Zamówienie #{self.id} - {self.device}"
    def get_parts_total(self):
        return sum(up.quantity * up.part.price for up in self.used_parts.all())
    class Meta:
        ordering = ['-arrival_date']
class UsedPart(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='used_parts')
    part = models.ForeignKey('inventory.Part', on_delete=models.PROTECT, related_name='usage_history')
    quantity = models.PositiveIntegerField()
    def __str__(self):
        return f"{self.part.name} x{self.quantity}"
    def get_total_price(self):
        return self.quantity * self.part.price
    class Meta:
        verbose_name = 'Użyta część'
        verbose_name_plural = 'Użyte części'