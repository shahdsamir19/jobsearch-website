
import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import user_passes_test, login_required
from django.http import JsonResponse
from jobs.models import Job,Application  # Assuming you have a Job model
from django.contrib.auth.models import AnonymousUser
from .forms import JobForm  # Assuming you have a JobForm
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.db.models import Q
from django.template.loader import render_to_string

def admin_dashboard(request):
    return render(request, 'jobs/admin_dashboard.html')

def job_details(request):
    jobs = Job.objects.all()
    return render(request, 'jobs/jobdetails.html', {'jobs': jobs})

def add_job(request):
    job_id = request.GET.get('edit')
    if job_id:
        job = get_object_or_404(Job, id=job_id)
        if request.method == 'POST':
            form = JobForm(request.POST, instance=job)
            if form.is_valid():
                form.save()
                #return JsonResponse({'success': True, 'job_id': job.id})
                return redirect('admin_dashboard') 
                
            else:
                return JsonResponse({'success': False, 'errors': form.errors})
        else:
            form = JobForm(instance=job)
    else:
        if request.method == 'POST':
            form = JobForm(request.POST)
            if form.is_valid():
                job = form.save()
                #return JsonResponse({'success': True, 'job_id': job.id})
                return redirect('admin_dashboard')
            else:
                return JsonResponse({'success': False, 'errors': form.errors})
        else:
            form = JobForm()
    return render(request, 'jobs/addjob.html', {'form': form, 'job_id': job_id})


def homepage(request):
    return render(request, 'jobs/homepage.html')


def help(request):
    return render(request, 'jobs/help.html')


def job_list_api(request):
    if request.method == 'GET':
        jobs = list(Job.objects.values())
        return JsonResponse(jobs, safe=False)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    




@csrf_exempt
def edit_job_api(request, job_id):
    if request.method == 'POST':
        try:
            job = Job.objects.get(id=job_id)
            data = json.loads(request.body)
            job.job_title = data.get('job_title', job.job_title)
            job.salary = data.get('salary', job.salary)
            job.company_name = data.get('company_name', job.company_name)
            job.job_status = data.get('job_status', job.job_status)
            job.description = data.get('description', job.description)
            job.years_of_experience = data.get('years_of_experience', job.years_of_experience)
            job.created_by_admin = data.get('created_by_admin', job.created_by_admin)
            job.save()
            return JsonResponse({'message': 'Job updated successfully'})
        except Job.DoesNotExist:
            return JsonResponse({'error': 'Job not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    
   

@csrf_exempt
def delete_job_api(request, job_id):
    if request.method == 'DELETE':
        try:
            job = Job.objects.get(id=job_id)
            job.delete()
            return JsonResponse({'message': 'Job deleted successfully'})
        except Job.DoesNotExist:
            return JsonResponse({'error': 'Job not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)










def FUser(request):
    return render(request, 'jobs/FUser.html')


@csrf_exempt
def add_job_api(request):
    if request.method == 'POST': 
        data = json.loads(request.body)
        form = JobForm(data)
        if form.is_valid():
            job = form.save()
            #return JsonResponse({'success': True, 'redirect_url': '/admin_dashboard/'})
            return redirect('admin_dashboard')
        else:
            return JsonResponse({'success': False, 'errors': form.errors})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def FUser(request):
    return render(request, 'jobs/FUser.html')
#----------------------------------------------------------------------------------
def search_jobs(request):
    title_query = request.GET.get('title', '')  # Get the job title query string from the request
    experience_query = request.GET.get('experience', '')  # Get the experience query string from the request

    # Initialize jobs as an empty queryset
    jobs = Job.objects.none()

    # Check if any search parameters are provided
    if title_query or experience_query:
        # Start with all jobs
        jobs = Job.objects.all()

        # Apply filters if queries are provided
        if title_query:
            jobs = jobs.filter(Q(job_title__icontains=title_query))
        if experience_query:
            jobs = jobs.filter(Q(years_of_experience__icontains=experience_query))

        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
         job_list = list(jobs.values('job_title', 'company_name', 'salary', 'description', 'years_of_experience', 'job_status'))
        return JsonResponse({'jobs': job_list})

    return render(request, 'jobs/searchjob.html', {'jobs': jobs, 'title_query': title_query, 'experience_query': experience_query})



#----------------------------------------------------------------------------------

def apply_for_job(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    user = request.user

    # Check if the user has already applied for the job
    if Application.objects.filter(job=job, user=user).exists():
        return redirect('job_detail', job_id=job_id)

    # Create a new application
    Application.objects.create(job=job, user=user)
    return redirect('applied_jobs')  # Redirect to the applied jobs page


def applied_jobs(request):
    applications = Application.objects.filter(user=request.user)
    return render(request, 'jobs/appliedjob.html', {'applications': applications})

def job_detail(request, job_id):
    job = get_object_or_404(Job, id=job_id)
      
    user = request.user
    already_applied = Application.objects.filter(job=job, user=user).exists()
    
    context = {
        'job': job,
        'already_applied': already_applied,
    }
    return render(request, 'jobs/job_detail.html', context)
    


