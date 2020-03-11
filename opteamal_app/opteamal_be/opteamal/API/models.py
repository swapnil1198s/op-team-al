from django.db import models

# Create your models here.

class Location(models.Model):

    city_name = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    continent = models.CharField(max_length=50)
    building = models.CharField(max_length=50)

class Talent(models.Model):

    skill = models.CharField(max_length=50)

class MangementLevel(models.Model):

    id = models.AutoField(primary_key=True)
    level = models.CharField(max_length=20)

class Title(models.Model):

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=25)

class Employee(models.Model):

    id = models.AutoField(primary_key=True)
    f_name = models.CharField(max_length=20)
    l_name = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    title= models.ForeignKey(Title, on_delete=models.PROTECT)
    management_level = models.ForeignKey(MangementLevel, on_delete=models.PROTECT)
    start_date = models.DateField()
    availability = models.DateField()
    location = models.ForeignKey(Location, on_delete=models.PROTECT)
    remote_work = models.BooleanField()
    relocate = models.BooleanField()



class Project(models.Model):

    id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=20)
    project_lead = models.ForeignKey(Employee, on_delete=models.PROTECT)
    location = models.ForeignKey(Location, on_delete=models.PROTECT)
    project_start  = models.DateField()
    project_due = models.DateField()
    client = models.CharField(max_length=20)

class AssignedEntry(models.Model):

    employee = models.ForeignKey(Employee, related_name="projects", on_delete=models.PROTECT)
    project = models.ForeignKey(Project, related_name="employees", on_delete=models.PROTECT)


class TitleEntry(models.Model):

    employee = models.ForeignKey(Employee, related_name="titles",  on_delete=models.PROTECT)
    title = models.ForeignKey(Title, related_name="title_name", on_delete=models.PROTECT)

class DesiredLocation(models.Model):

    id = models.AutoField(primary_key=True)
    location = models.ForeignKey(Location, related_name="locations", on_delete=models.PROTECT)
    employee = models.ForeignKey(Employee, related_name="desired_locations", on_delete=models.PROTECT)

class Talent(models.Model):

    id = models.AutoField(primary_key=True)
    talent = models.CharField(max_length=50)

class TalentEntry(models.Model):

    employee = models.ForeignKey(Employee, related_name="talents", on_delete=models.PROTECT)
    talent =  models.ForeignKey(Talent, related_name="talent_name", on_delete=models.PROTECT)

class EmployeeTalentView(models.Model):
    id = models.IntegerField(primary_key=True)
    f_name = models.CharField(max_length=20)
    l_name = models.CharField(max_length=20)
    title_id = models.IntegerField()
    title = models.CharField(max_length=20)
    talent_id = models.IntegerField()
    talent = models.CharField(max_length=20)
    location_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = "v_employee_talents"

