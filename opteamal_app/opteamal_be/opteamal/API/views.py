from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.generics import ListAPIView

from .models import Employee, Project, Location, Title
from .serializer import EmployeeSerializer, ProjectSerializer, LocationSerializer, TitleSerializer

class EmployeesViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class ProjectsViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class LocationsViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class TitleViewSet(viewsets.ModelViewSet):

    queryset = Title.objects.all()
    serializer_class = TitleSerializer

    def get_object(self):
        if self.request.method == 'PUT':
            obj, created = Title.objects.get_or_create(pk=self.kwargs.get('pk'))
            return obj
        else:
            return super(TitleViewSet, self).get_object()
