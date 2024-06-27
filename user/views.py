
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.views.generic import CreateView
from user.forms import CustomUserCreationForm, CustomAuthenticationForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from jobs.views import admin_dashboard
# @login_required
# def help(request):
#     return render(request, 'jobs/help.html')


def login_view(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                # Check the user type and redirect accordingly
                if user.user_type == 'recruiter':
                    
                    company_name = form.cleaned_data.get('company_name')
                    user.company_name = company_name  # Save company name for recruiter
                    user.save()
                    return redirect('admin_dashboard')  # Redirect to recruiter dashboard
                elif user.user_type == 'job_seeker':
                    return redirect('job_details')  # Redirect to job seeker page
                else:
                    return redirect('homepage')  # Default redirect, adjust as needed
    else:
        form = CustomAuthenticationForm()
    return render(request, 'login.html', {'form': form})











class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = '/login/'  # Redirect to login after successful registration
    template_name = 'register.html'

def authView(request):
    if request.method == "post":
        form = UserCreationForm(request.post or None)
        if form.is_valid():
            form.save()
    else:

     form = UserCreationForm
    return render(request,"register.html", {"form" : form})