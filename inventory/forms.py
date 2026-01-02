from django import forms
from inventory.models import Part

class PartForm(forms.ModelForm):
    class Meta:
        model = Part
        fields = ['name', 'quantity', 'price']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Nazwa części'
            }),
            'quantity': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': '0',
                'min': '0'
            }),
            'price': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': '0.00',
                'step': '0.01',
                'min': '0'
            }),
        }
        labels = {
            'name': 'Nazwa części',
            'quantity': 'Ilość (szt.)',
            'price': 'Cena (zł)',
        }