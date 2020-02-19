from django.db import models

# Create your models here.
class Employee(models.Model):

    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    title = models.CharField(max_length=20)
    start_date = models.DateField()
    skills = models.CharField(max_length=100)

class Project(models.Model):

    project_name = models.CharField(max_length=20)
    project_lead = models.ForeignKey(Employee, on_delete=models.CASCADE)
    project_start  = models.DateField()
    project_due = models.DateField()
    client = models.CharField(max_length=20)

