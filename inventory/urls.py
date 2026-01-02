from django.urls import path
from . import views
urlpatterns = [
   path('magazyn/', views.PartListView.as_view(), name='lista_czesci'),
    path('dodaj_czesc/', views.create_part, name='dodaj_czesc'),
    path('aktualizuj_czesc/<int:id>', views.update_part, name='aktualizuj_czesc'),
    path('usun_czesc/<int:id>',views.delete_part,name='usun_czesc')
]
