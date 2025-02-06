#Import useful stuff
from rest_framework import routers
from django.contrib import admin
from django.urls import path, include
from todo import views

#declaring routers
router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')

#Path for websites
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
