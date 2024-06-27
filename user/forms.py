# user/forms.py

# from django import forms
# from django.contrib.auth.models import User
# from django.contrib.auth.forms import UserCreationForm

# class SignUpForm(UserCreationForm):
#     email = forms.EmailField(max_length=254, required=True)

#     class Meta:
#         model = User
#         fields = ('username', 'email', 'password1', 'password2')
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from user.models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    company_name = forms.CharField(max_length=100, required=False, label='Company Name (For Recruiters Only)' )

    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'email', 'user_type', 'company_name', 'password1', 'password2' )


class CustomAuthenticationForm(AuthenticationForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'password')


