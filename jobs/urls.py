from django.urls import path
from jobs import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('add-job/', views.add_job, name='add_job'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('help/', views.help, name='help'),
    path('FUser/', views.FUser, name='FUser'),
    path('applied_jobs/', views.applied_jobs, name='applied_jobs'),
    path('job_details/', views.job_details, name='job_details'),
    path('help/', views.help, name='help'),
    path('search_jobs/', views.search_jobs, name='search_jobs'),
    path('api/jobs/', views.job_list_api, name='job_list_api'),
    path('edit_job/<int:job_id>/', views.edit_job_api, name='edit_job_api'),
    path('job/<int:job_id>/', views.job_detail, name='job_detail'),
    path('job/<int:job_id>/apply/', views.apply_for_job, name='apply_for_job'),
    path('applied_jobs/', views.applied_jobs, name='applied_jobs'),
    path('api/delete_job/<int:job_id>/', views.delete_job_api, name='delete_job_api'),
    path('api/add_job/', views.add_job_api, name='add_job_api'),
]
