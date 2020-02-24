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

    id = models.AutoField(primary_key=True)
    level = models.CharField(max_length=20)


class Employee(models.Model):

    id = models.AutoField(primary_key=True)
    f_name = models.CharField(max_length=20)
    l_name = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    management_level = models.ForeignKey(MangementLevel, on_delete=models.CASCADE)
    start_date = models.DateField()
    availability = models.DateField()
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    remote_work = models.BooleanField()
    relocate = models.BooleanField()



class Title(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=25)

class Project(models.Model):

    project_name = models.CharField(max_length=20)
    project_lead = models.ForeignKey(Employee, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    project_start  = models.DateField()
    project_due = models.DateField()
    client = models.CharField(max_length=20)


class TitleEntry(models.Model):

    employee = models.ForeignKey(Employee, related_name="titles",  on_delete=models.CASCADE)
    title = models.ForeignKey(Title, related_name="title_name", on_delete=models.CASCADE)

class DesiredLocation(models.Model):

    id = models.AutoField(primary_key=True)
    location = models.ForeignKey(Location, related_name="locations",  on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, related_name="desired_locations", on_delete=models.CASCADE)


class Talent(models.Model):

    id = models.AutoField(primary_key=True)
    talent = models.CharField(max_length=50)

class TalentEntry(models.Model):

    employee = models.ForeignKey(Employee, related_name="talents",  on_delete=models.CASCADE)
    talent =  models.ForeignKey(Talent, related_name="talent_name", on_delete=models.CASCADE)

