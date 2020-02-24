from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.generics import ListAPIView

from .models import Employee, Project, Location, Title, TitleEntry, MangementLevel, DesiredLocation, Talent, TalentEntry
from .serializer import EmployeeSerializer,\
                        ProjectSerializer,\
                        LocationSerializer,\
                        TitleSerializer,\
                        TitleEntrySerializer, \
                        ManagementLevelSerializer, \
                        DesiredLocationSerializer, \
                        TalentSerializer, \
                        TalentEntrySerializer


class EmployeesViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            self.object = serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED,
                            headers=headers)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            # Return this if request method is not POST
        return Response({'key': 'value'}, status=status.HTTP_200_OK)


class ProjectsViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class LocationsViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class ManagementLevelViewSet(viewsets.ModelViewSet):
    queryset = MangementLevel.objects.all()
    serializer_class = ManagementLevelSerializer

class TitleViewSet(viewsets.ModelViewSet):

    queryset = Title.objects.all()
    serializer_class = TitleSerializer

    def get_object(self):
        if self.request.method == 'PUT':
            obj, created = Title.objects.get_or_create(pk=self.kwargs.get('pk'))
            return obj
        else:
            return super(TitleViewSet, self).get_object()

class TitleEntryViewSet(viewsets.ModelViewSet):

    queryset = TitleEntry.objects.all()
    serializer_class = TitleEntrySerializer

class DesiredLocationViewSet(viewsets.ModelViewSet):

    queryset = DesiredLocation.objects.all()
    serializer_class = DesiredLocationSerializer


class TalentViewSet(viewsets.ModelViewSet):

    queryset = Talent.objects.all()
    serializer_class = TalentSerializer

class TalentEntryViewSet(viewsets.ModelViewSet):

    queryset =  TalentEntry.objects.all()
    serializer_class = TalentEntrySerializer