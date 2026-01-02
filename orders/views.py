from django.contrib.auth import logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import ListView
from .models import Order
from django.shortcuts import render, redirect , get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import ClientForm, OrderForm


@login_required
def create_order(request):
    if request.method == 'POST':
        mode = request.POST.get('mode')

        if mode == 'new':
            client_form = ClientForm(request.POST)
            order_form = OrderForm(request.POST)

            if client_form.is_valid() and order_form.is_valid():
                client = client_form.save()

                order = order_form.save(commit=False)
                order.client = client
                order.save()

                messages.success(request, 'Zamówienie zostało utworzone pomyślnie!')
                return redirect('dashboard')
            else:
                if not client_form.is_valid():
                    messages.error(request, 'Błąd w danych klienta.  Sprawdź formularz.')
                if not order_form.is_valid():
                    messages.error(request, 'Błąd w danych zamówienia.  Sprawdź formularz.')

        elif mode == 'existing':
            client_form = ClientForm()
            order_form = OrderForm(request.POST)
            if order_form.is_valid():
                if order_form.cleaned_data.get('client'):
                    order = order_form.save()
                    messages.success(request, 'Zamówienie zostało utworzone pomyślnie!')
                    return redirect('dashboard')
                else:
                    messages.error(request, 'Musisz wybrać klienta z listy.')
            else:
                messages.error(request, 'Błąd w danych zamówienia. Sprawdź formularz.')
        else:
            messages.error(request, 'Nieprawidłowy tryb formularza.')
            client_form = ClientForm()
            order_form = OrderForm()
    else:
        client_form = ClientForm()
        order_form = OrderForm()

    return render(request, 'orders/create_order.html', {
        'client_form': client_form,
        'order_form': order_form
    })

class OrderView(LoginRequiredMixin, ListView):
    login_url = 'login'
    redirect_field_name = 'next'
    model = Order
    template_name = 'orders/orderlist.html'
    success_url = reverse_lazy('dashboard')
@login_required
def update_order(request , id):
    order = get_object_or_404(Order, id=id)
    org_client = order.client
    if request.method == "POST":
        order_form = OrderForm(request.POST, instance=order)
        if order_form.is_valid():
            updated_order = order_form.save(commit = False)
            updated_order.client = org_client
            updated_order.save()

            return redirect('lista_zlecen')
    else:
        order_form = OrderForm(instance=order)
    return render(request, 'orders/create_order.html', {
        'order_form': order_form,
        'is_update' : True,
        'order': order,
    })
@login_required()
def delete_order(request, id):
    order = get_object_or_404(Order , id=id)
    order_form = OrderForm()
    if request.method == 'POST':
        order.delete()
        return redirect('lista_zlecen')
    else:
        messages.warning(request, 'nieprawidlowe zadanie')
        return redirect('lista_zlecen')
@login_required()
def logout_view(request):
    logout(request)
    return redirect('dashboard')

