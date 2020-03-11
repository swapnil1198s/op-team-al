from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status, viewsets, filters as rff
from django_filters.rest_framework import DjangoFilterBackend, filters, ModelChoiceFilter
import django_filters as df
from django.db.models import ProtectedError

from .models import Employee,\
                    Project,\
                    Location,\
                    Title,\
                    TitleEntry,\
                    MangementLevel,\
                    DesiredLocation,\
                    Talent,\
                    TalentEntry, \
                    AssignedEntry, \
                    EmployeeTalentView

from .serializer import EmployeeSerializer,\
                        ProjectSerializer,\
                        LocationSerializer,\
                        TitleSerializer,\
                        TitleEntrySerializer, \
                        ManagementLevelSerializer, \
                        DesiredLocationSerializer, \
                        TalentSerializer, \
                        TalentEntrySerializer, \
                        AssignedEntrySerializer, \
                        EmployeeTalentsViewSerializer


"""
If you wanna run a sql statement
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    model = Employee

    def list(self, request):
        talent_id = self.request.query_params.get('talentid')
        print(talent_id)
        talents = talent_id.split(",")
        print(talents)
        for i in range(0, len(talents)):
            talents[i] = int(talents[i])
        print(talents)
        query = 'SELECT * FROM v_employee_talents WHERE talent_id IN (%s);'
        queryset = Employee.objects.raw(query,[talents])
        serializer = EmployeeSerializer(queryset, many=True)
        return Response(serializer.data)
"""
class NumberInFilter(filters.BaseInFilter, filters.NumberFilter):
    pass

class EmployeeFilter(df.FilterSet):

    title = ModelChoiceFilter(queryset=Title.objects.all())
    talent = ModelChoiceFilter(queryset=TitleEntry.objects.all(),lookup_expr='contain')
    location = ModelChoiceFilter(queryset=Location.objects.all())
    title_id_in = NumberInFilter(field_name='title', lookup_expr='in')
    location_id_in = NumberInFilter(field_name='location', lookup_expr='in')
    class Meta:
        model = Employee
        fields = ['title_id_in', 'location_id_in']

class EmployeesViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = EmployeeFilter


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            self.object = serializer.save()
            headers = self.get_success_headers(serializer.data)
            print(serializer.data)
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

    def destroy(self, *args, **kwargs):
        try:
            serializer = self.get_serializer(self.get_object())
            super().destroy(*args, **kwargs)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProtectedError as exception:
            data = {
                'code': 'server_error',
                'message': ('Internal server error.'),
                'error': {
                    'type': str(type(exception)),
                    'message': str(exception)
                }
            }
            return Response(data=data, status=status.HTTP_409_CONFLICT)

class ManagementLevelViewSet(viewsets.ModelViewSet):
    queryset = MangementLevel.objects.all()
    serializer_class = ManagementLevelSerializer

    def destroy(self, *args, **kwargs):
        try:
            serializer = self.get_serializer(self.get_object())
            super().destroy(*args, **kwargs)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProtectedError as exception:
            data = {
                'code': 'server_error',
                'message': ('Internal server error.'),
                'error': {
                    'type': str(type(exception)),
                    'message': str(exception)
                }
            }
            return Response(data=data, status=status.HTTP_409_CONFLICT)

class TitleViewSet(viewsets.ModelViewSet):

    queryset = Title.objects.all()
    serializer_class = TitleSerializer

    def destroy(self, *args, **kwargs):
        try:
            serializer = self.get_serializer(self.get_object())
            super().destroy(*args, **kwargs)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProtectedError as exception:
            data = {
                'code': 'server_error',
                'message': ('Internal server error.'),
                'error': {
                    'type': str(type(exception)),
                    'message': str(exception)
                }
            }
            return Response(data=data, status=status.HTTP_409_CONFLICT)

class TitleEntryViewSet(viewsets.ModelViewSet):

    queryset = TitleEntry.objects.all()
    serializer_class = TitleEntrySerializer

    def destroy(self, *args, **kwargs):
        try:
            serializer = self.get_serializer(self.get_object())
            super().destroy(*args, **kwargs)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProtectedError as exception:
            data = {
                'code': 'server_error',
                'message': ('Internal server error.'),
                'error': {
                    'type': str(type(exception)),
                    'message': str(exception)
                }
            }
            return Response(data=data, status=status.HTTP_409_CONFLICT)


class DesiredLocationViewSet(viewsets.ModelViewSet):

    queryset = DesiredLocation.objects.all()
    serializer_class = DesiredLocationSerializer

class TalentViewSet(viewsets.ModelViewSet):

    queryset = Talent.objects.all()
    serializer_class = TalentSerializer

    def destroy(self, *args, **kwargs):
        try:
            serializer = self.get_serializer(self.get_object())
            super().destroy(*args, **kwargs)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProtectedError as exception:
            data = {
                'code': 'server_error',
                'message': ('Internal server error.'),
                'error': {
                    'type': str(type(exception)),
                    'message': str(exception)
                }
            }
            return Response(data=data, status=status.HTTP_409_CONFLICT)

class TalentEntryViewSet(viewsets.ModelViewSet):

    queryset =  TalentEntry.objects.all()
    serializer_class = TalentEntrySerializer

    def destroy(self, *args, **kwargs):
        try:
            serializer = self.get_serializer(self.get_object())
            super().destroy(*args, **kwargs)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProtectedError as exception:
            data = {
                'code': 'server_error',
                'message': ('Internal server error.'),
                'error': {
                    'type': str(type(exception)),
                    'message': str(exception)
                }
            }
            return Response(data=data, status=status.HTTP_409_CONFLICT)

class AssignedEntryViewSet(viewsets.ModelViewSet):

    queryset =  AssignedEntry.objects.all()
    serializer_class = AssignedEntrySerializer

    def destroy(self, *args, **kwargs):
        try:
            serializer = self.get_serializer(self.get_object())
            super().destroy(*args, **kwargs)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProtectedError as exception:
            data = {
                'code': 'server_error',
                'message': ('Internal server error.'),
                'error': {
                    'type': str(type(exception)),
                    'message': str(exception)
                }
            }
            return Response(data=data, status=status.HTTP_409_CONFLICT)

class NumberInFilter(filters.BaseInFilter, filters.NumberFilter):
    pass

class EmployeeTalentFilter(df.FilterSet):
    title_id_in = NumberInFilter(field_name='title_id', lookup_expr='in')

    class Meta:
        model = EmployeeTalentView
        fields = ['title_id_in', ]

class EmployeeTalentsViewSet(viewsets.ModelViewSet):

    serializer_class = EmployeeTalentsViewSerializer
    queryset = EmployeeTalentView.objects.all()
    filter_backends = (DjangoFilterBackend, rff.SearchFilter)
    search_fields = ['f_name',]
    #filterset_fields = ['talent_id']
    filter_class = EmployeeTalentFilter

    def destroy(self, *args, **kwargs):
        try:
            serializer = self.get_serializer(self.get_object())
            super().destroy(*args, **kwargs)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProtectedError as exception:
            data = {
                'code': 'server_error',
                'message': ('Internal server error.'),
                'error': {
                    'type': str(type(exception)),
                    'message': str(exception)
                }
            }
            return Response(data=data, status=status.HTTP_409_CONFLICT)






