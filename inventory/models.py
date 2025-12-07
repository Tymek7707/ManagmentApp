from django.db import models

# Create your models here.
class Part(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    price = models.FloatField()
    def __str__(self):
        return f"{self.name}, {self.quantity}szt. ,{self.price}"