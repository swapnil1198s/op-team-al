from rest_framework import serializers
from .models import Employee,\
                    Project,\
                    Title,\
                    Location,\
                    TitleEntry,\
                    MangementLevel,\
                    DesiredLocation, \
                    Talent, \
                    TalentEntry, \
                    AssignedEntry


class TitleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Title
        fields = ["id",
                  "title"]

class TitleEntrySerializer(serializers.ModelSerializer):

    employee_id = serializers.IntegerField(write_only=True)
    title_id = serializers.IntegerField(write_only=True)
    title_name = TitleSerializer(read_only=True, source='title')

    class Meta:
        model = TitleEntry
        fields = ["id",
                  "employee_id",
                  "title_id",
                  "title_name",]
        depth = 2

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id",
                  "city_name",
                  "state",
                  "country",
                  "continent"]

class ManagementLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MangementLevel
        fields = ["level"]

class DesiredLocationSerializer(serializers.ModelSerializer):

    employee_id = serializers.IntegerField(write_only=True)
    location_id = serializers.IntegerField(write_only=True)
    location_name = LocationSerializer(read_only=True, source='location')

    class Meta:
        model = DesiredLocation
        fields = ["id",
                  "employee_id",
                  "location_id",
                  "location_name",]
        depth = 2

class TalentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Talent
        fields =["id",
                 "talent"]

class TalentEntrySerializer(serializers.ModelSerializer):

    employee_id = serializers.IntegerField(write_only=True)
    talent_id = serializers.IntegerField(write_only=True)
    talent_name = TalentSerializer(read_only=True, source='talent')

    class Meta:
        model = TalentEntry
        fields = ["id",
                  "employee_id",
                  "talent_id",
                  "talent_name",]



class EmployeeSerializer(serializers.ModelSerializer):

    titles = TitleEntrySerializer(many=True, read_only=True)
    id = serializers.ReadOnlyField(source="pk")
    location_id = serializers.IntegerField(write_only=True)
    location = LocationSerializer(read_only=True)
    management_level_id = serializers.IntegerField(write_only=True)
    management_level = ManagementLevelSerializer(read_only=True)
    desired_locations = DesiredLocationSerializer(many=True,read_only=True)
    talents = TalentEntrySerializer(many=True,read_only=True)

    class Meta:
        model = Employee
        fields = ('id',
                  'f_name',
                  'l_name',
                  'email',
                  'management_level_id',
                  'management_level',
                  'start_date',
                  'availability',
                  "location_id",
                  "location",
                  'remote_work',
                  'relocate',
                  'desired_locations',
                  'titles',
                  'talents',
                  'projects')
        depth = 2


class ManagementLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MangementLevel
        fields = ["id","level"]

class ProjectSerializer(serializers.ModelSerializer):
    location_id = serializers.IntegerField(write_only=True)
    location = LocationSerializer(read_only=True)
    project_lead_id = serializers.IntegerField(write_only=True)
    project_lead = EmployeeSerializer(read_only=True)
    class Meta:
        model = Project
        fields = ('id',
                  'project_name',
                  'project_lead_id',
                  'project_lead',
                  'project_start',
                  'location_id',
                  'location',
                  'project_due',
                  'client')

class AssignedEntrySerializer(serializers.ModelSerializer):

    employee_id = serializers.IntegerField(write_only=True)
    employee = EmployeeSerializer(read_only=True)
    project_id = serializers.IntegerField(write_only=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = AssignedEntry
        fields = ('id',
                  'employee_id',
                  'employee',
                  'project_id',
                  'project')

