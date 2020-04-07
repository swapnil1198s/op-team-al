
from rest_framework.response import Response
from rest_framework import status, viewsets, filters as rff
from django_filters.rest_framework import DjangoFilterBackend, filters, ModelChoiceFilter
import django_filters as df
from django.db.models import ProtectedError
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView

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
                    EmployeeTalentView, \
                    TalentGroup

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
                        EmployeeTalentsViewSerializer, \
                        TalentGroupSerializer

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
    availability_gte = df.DateTimeFilter(field_name="availability", lookup_expr='gte')
    availability_lte = df.DateTimeFilter(field_name="availability", lookup_expr='lte')
    is_free = df.BooleanFilter(field_name="is_free")
    class Meta:
        model = Employee
        fields = ['title_id_in', 'location_id_in', 'availability_gte', 'availability_lte', 'is_free']

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



class ProjectFilter(df.FilterSet):
    duedate_gte = df.DateTimeFilter(field_name="project_due", lookup_expr='gte')
    duedate_lte = df.DateTimeFilter(field_name="project_due", lookup_expr='lte')

    class Meta:
        model = Project
        fields = ['duedate_gte', 'duedate_lte']



class ProjectsViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = ProjectFilter

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


class EmployeeCountView(APIView):
    """
    A view that returns the count of active users in JSON.
    """
    renderer_classes = [JSONRenderer]

    def get(self, request, format=None):
        employee_count = Employee.objects.all().count()
        content = {'employee_count': employee_count}
        return Response(content)

class ProjectCountView(APIView):
    """
    A view that returns the count of active users in JSON.
    """
    renderer_classes = [JSONRenderer]

    def get(self, request, format=None):
        project_count = Project.objects.all().count()
        content = {'project_count': project_count}
        return Response(content)


class TalentGroupViewSet(viewsets.ModelViewSet):
    queryset = TalentGroup.objects.all()
    serializer_class = TalentGroupSerializer

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


