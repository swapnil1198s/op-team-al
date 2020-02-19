from rest_framework import serializers
from .models import Employee, Project

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id','first_name','last_name','email','title','start_date','skills')

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