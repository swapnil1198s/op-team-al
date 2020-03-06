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
                    AssignedEntry, \
                    EmployeeTalentView


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
                  "building",
                  "city_name",
                  "state",
                  "country",
                  "continent"]

class ManagementLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MangementLevel
        fields = ["id","level"]

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
class TalentField(serializers.RelatedField):
    def to_representation(self, Talent):
        return 'Talent: %s ' % (Talent.talent)

class TalentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Talent
        fields =["id",
                 "talent"]

class TalentEntryField(serializers.RelatedField):
    def to_representation(self, TalentEntry):
        talent =  {"id":TalentEntry.id,
                   "talent_id": TalentEntry.talent.id,
                   "talent":TalentEntry.talent.talent}
        return talent


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

    id = serializers.ReadOnlyField(source="pk")
    location_id = serializers.IntegerField(write_only=True)
    location = LocationSerializer(read_only=True)
    title_id = serializers.IntegerField(write_only=True)
    title = TitleSerializer(read_only=True)
    management_level_id = serializers.IntegerField(write_only=True)
    management_level = ManagementLevelSerializer(read_only=True)
    desired_locations = DesiredLocationSerializer(many=True,read_only=True)
    talents = TalentEntryField(many=True, read_only=True)

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
                  'title_id',
                  'title',
                  'talents',
                  'projects')
        depth = 2


class ManagementLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MangementLevel
        fields = ["id","level"]


class AssignedEntrySerializer(serializers.ModelSerializer):

    employee_id = serializers.IntegerField(write_only=True)
    employee = EmployeeSerializer(read_only=True)
    project_id = serializers.IntegerField(write_only=True)


    class Meta:
        model = AssignedEntry
        fields = ('id',
                  'employee_id',
                  'employee',
                  'project_id',
                  )

class ProjectSerializer(serializers.ModelSerializer):
    location_id = serializers.IntegerField(write_only=True)
    location = LocationSerializer(read_only=True)
    project_lead_id = serializers.IntegerField(write_only=True)
    project_lead = EmployeeSerializer(read_only=True)
    employees = AssignedEntrySerializer(many=True ,read_only=True)
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
                  'client',
                  'employees')


class EmployeeTalentsViewSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmployeeTalentView
        fields =('__all__')