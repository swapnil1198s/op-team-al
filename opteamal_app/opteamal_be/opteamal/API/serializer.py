from rest_framework import serializers
from .models import Employee, Project, Title, Location


class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title
        fields = ["id","title","employee_id"]


class EmployeeSerializer(serializers.ModelSerializer):
    titles = TitleSerializer(many=True, read_only=True)
    id = serializers.ReadOnlyField()
    class Meta:
        model = Employee
        fields = ('id','f_name','l_name','email', 'start_date','availability', 'location', 'remote_work', 'relocate', 'titles',)



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

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id","city_name", "state", "country", "continent"]