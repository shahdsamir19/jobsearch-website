
from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()

class Job(models.Model):
    id = models.AutoField(primary_key=True)
    job_title = models.CharField(max_length=255)
    salary = models.CharField(max_length=100)
    company_name = models.CharField(max_length=255)
    job_status = models.CharField(max_length=10, choices=[('open', 'Open'), ('closed', 'Closed')])
    description = models.CharField(max_length=255)
    years_of_experience = models.CharField(max_length=10)
    created_by_admin = models.CharField(max_length=255)

    def __str__(self):
        return self.job_title
    
class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('job', 'user')
    
    def __str__(self):
        return f'{self.user.username} applied for {self.job.job_title}'
    
    
    
    
    
    
    
    
    
    
    
    
    