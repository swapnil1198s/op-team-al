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
router.register(r'api/title/entry', api.TitleEntryViewSet)
router.register(r'api/managementlevel', api.ManagementLevelViewSet)
router.register(r'api/desiredlocations', api.DesiredLocationViewSet)
router.register(r'api/talents', api.TalentViewSet)
router.register(r'api/talent/entry', api.TalentEntryViewSet)



urlpatterns = [
     path('', include(router.urls)),

]

