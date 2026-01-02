from django.urls import path , include
from . import views
urlpatterns = [
   path('dodaj_zamowienie/', views.create_order, name = 'dodaj_zamowienie'),
   path('lista_zlecen/', views.OrderView.as_view() ,name= 'lista_zlecen'),
   path('edytuj_zlecenie/<int:id>' ,views.update_order, name='edytuj_zlecenie'),
   path('usun_zlecenie/<int:id>', views.delete_order, name='usun_zlecenie'),
   path('wyloguj/', views.logout_view, name='wyloguj')
]
