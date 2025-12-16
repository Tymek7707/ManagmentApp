from django. contrib.auth.mixins import LoginRequiredMixin
from django. urls import reverse_lazy
from django. views.generic import CreateView , ListView
from .models import Order

class CreateOrder(LoginRequiredMixin, CreateView):
    login_url = 'login'
    redirect_field_name = 'next'
    model = Order
    fields = '__all__'
    template_name = 'orders/create_order.html'
    success_url = reverse_lazy('dashboard')

class OrderView(LoginRequiredMixin, ListView):
    login_url = 'login'
    redirect_field_name = 'next'
    model = Order
    template_name = 'orders/orderlist.html'
    success_url = reverse_lazy('dashboard')
