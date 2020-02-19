# Generated by Django 3.0.3 on 2020-02-19 02:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0002_employee_skills'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(max_length=20)),
                ('project_start', models.DateField()),
                ('project_due', models.DateField()),
                ('client', models.CharField(max_length=20)),
                ('project_lead', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.Employee')),
            ],
        ),
    ]
