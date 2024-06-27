from django.urls import path,include
from user.views import *

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', login_view, name='login'),
    
    # path("accounts/", include("django.contrib.auth.urls")),
]
