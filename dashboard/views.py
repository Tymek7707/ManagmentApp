from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views import View
from orders.models import Order
# Create your views here.
@login_required
def home_page(request):
    orders = Order.objects.all()
    new_orders = orders.filter(status = 'NEW')
    return render(request ,'dashboard/dashboard_page.html', {
        'new' : len(new_orders)
    })