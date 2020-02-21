from django.db import models

# Create your models here.

class Location(models.Model):

    city_name = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    continent = models.CharField(max_length=50)


class Talent(models.Model):

    skill = models.CharField(max_length=50)



class MangementLevel(models.Model):

    level = models.CharField(max_length=20)


class Employee(models.Model):

    id = models.IntegerField(primary_key=True)
    f_name = models.CharField(max_length=20)
    l_name = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    start_date = models.DateField()
    availability = models.DateField()
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    remote_work = models.BooleanField()
    relocate = models.BooleanField()

class Title(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=25)
    employee = models.ForeignKey(Employee, related_name="titles",  on_delete=models.CASCADE, default=1)

class Project(models.Model):

    project_name = models.CharField(max_length=20)
    project_lead = models.ForeignKey(Employee, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    project_start  = models.DateField()
    project_due = models.DateField()
    client = models.CharField(max_length=20)


class DesiredLocations(models.Model):

    employee_id = models.ManyToManyField(Employee)
    location_id = models.ManyToManyField(Location)

class TalentEntry(models.Model):

    employee_id = models.ManyToManyField(Employee)
    talent = models.ManyToManyField(Talent)



