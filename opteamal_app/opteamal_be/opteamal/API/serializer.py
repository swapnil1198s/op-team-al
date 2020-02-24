from rest_framework import serializers
from .models import Employee, Project, Title, Location, TitleEntry, MangementLevel, DesiredLocation, Talent, TalentEntry


class TitleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Title
        fields = ["id","title"]

class TitleEntrySerializer(serializers.ModelSerializer):

    employee_id = serializers.IntegerField(write_only=True)
    title_id = serializers.IntegerField(write_only=True)
    title_name = TitleSerializer(read_only=True, source='title')

    class Meta:
        model = TitleEntry
        fields = ["id", "employee_id" ,"title_id", "title_name",]
        depth = 2

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id","city_name", "state", "country", "continent"]

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
        fields = ["id","employee_id", "location_id", "location_name",]
        depth = 2

class TalentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Talent
        fields =["id", "talent"]

class TalentEntrySerializer(serializers.ModelSerializer):

    employee_id = serializers.IntegerField(write_only=True)
    talent_id = serializers.IntegerField(write_only=True)
    talent_name = TalentSerializer(read_only=True, source='talent')

    class Meta:
        model = TalentEntry
        fields = ["id", "employee_id" ,"talent_id", "talent_name",]



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
                  'talents')
        depth = 2





class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id","city_name", "state", "country", "continent"]

class ManagementLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MangementLevel
        fields = ["id","level"]




class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('project_name','project_lead','project_lead_fname','project_lead_lname','project_start','project_due','client')

    project_lead_fname = serializers.SerializerMethodField('get_project_leads_fname')
    def get_project_leads_fname(self, obj):
        return obj.project_lead.first_name

    project_lead_lname = serializers.SerializerMethodField('get_project_leads_lname')
    def get_project_leads_lname(self, obj):
        return obj.project_lead.last_name