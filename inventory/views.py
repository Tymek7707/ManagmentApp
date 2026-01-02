from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django. views.generic import ListView
from . models import Part
from .forms import PartForm

# Create your views here.
class PartListView(LoginRequiredMixin, ListView):
    login_url = 'login'
    redirect_field_name = 'next'
    model = Part
    template_name = 'inventory/items_view.html'
    context_object_name = 'parts'
    paginate_by = 20
    ordering = ['name']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['total_parts'] = Part.objects.count()
        context['low_stock'] = Part.objects.filter(quantity__lte=5).count()
        context['total_value'] = sum(part.quantity * part.price for part in Part.objects.all())
        return context
@login_required
def create_part(request):
    if request.method == 'POST':
        form = PartForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('lista_czesci')
    else:
        form = PartForm()

    return render(request, 'inventory/create_part.html', {
        'form': form,
        'is_update': False
    })
@login_required()
def update_part(request, id):
    part = get_object_or_404(Part, id=id)
    if request.method == 'POST':
        form = PartForm(request.POST, instance=part)
        if form.is_valid():
            form.save()
            return redirect('lista_czesci')
    else:
        form = PartForm(instance=part)
    return render(request, 'inventory/create_part.html',{
        'form':form,
        'is_update': True,
        'part': part
    })
@login_required()
def delete_part(request,id):
    part = get_object_or_404(Part,id=id)
    if request.method == 'POST':
        part.delete()
        return redirect('lista_czesci')
    else:
        return redirect('lista_czesci')