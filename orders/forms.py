from django. forms import ModelForm
from django import forms
from .models import Client, Order

class ClientForm(ModelForm):
    class Meta:
        model = Client
        fields = ['name', 'surname', 'phone_number', 'email', 'postal_code', 'city', 'street']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Imię'}),
            'surname': forms. TextInput(attrs={'class': 'form-control', 'placeholder': 'Nazwisko'}),
            'phone_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '123456789'}),
            'email':  forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'email@example.com'}),
            'postal_code': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '00-000'}),
            'city':  forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Miasto'}),
            'street': forms.TextInput(attrs={'class':  'form-control', 'placeholder': 'Ulica i numer'}),
        }
        labels = {
            'name':  'Imię',
            'surname': 'Nazwisko',
            'phone_number':  'Numer telefonu',
            'email': 'Email',
            'postal_code':  'Kod pocztowy',
            'city': 'Miasto',
            'street': 'Ulica',
        }

class OrderForm(ModelForm):
    class Meta:
        model = Order
        fields = ['client', 'device', 'description', 'status', 'finish_date']
        widgets = {
            'client': forms.Select(attrs={'class': 'form-control'}),
            'device': forms.TextInput(attrs={'class': 'form-control', 'placeholder':  'np.  Ps5'}),
            'description':  forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Opisz problem... ', 'rows': 4}),
            'status': forms.Select(attrs={'class': 'form-control'}),
            'finish_date': forms.DateTimeInput(attrs={'class': 'form-control', 'type':  'datetime-local'}),
        }
        labels = {
            'client': 'Klient',
            'device': 'Urządzenie',
            'description': 'Opis problemu',
            'status': 'Status',
            'finish_date': 'Data zakończenia',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['client'].required = False