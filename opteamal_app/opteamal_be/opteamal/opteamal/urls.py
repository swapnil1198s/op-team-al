from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
import API.views as api

router = DefaultRouter()
router.register(r'api/employees', api.EmployeesViewSet)
router.register(r'api/projects', api.ProjectsViewSet)
router.register(r'api/locations', api.LocationsViewSet)
router.register(r'api/titles', api.TitleViewSet)



urlpatterns = [
     path('', include(router.urls)),

]

