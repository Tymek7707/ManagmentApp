from django.urls import path , include
from . import views
urlpatterns = [
   path('dodaj_zamowienie/', views.create_order, name = 'dodaj_zamowienie'),
   path('lista_zlecen/', views.OrderView.as_view() ,name= 'lista_zlecen')
]
