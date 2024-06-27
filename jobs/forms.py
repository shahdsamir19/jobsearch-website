# jobs/forms.py

from django import forms
from .models import Job

class JobForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['id', 'job_title', 'salary', 'company_name', 'job_status', 'description', 'years_of_experience', 'created_by_admin']
