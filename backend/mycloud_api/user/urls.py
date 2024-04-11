from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    # path('login/', views.user_login, name='login'),
    # path('logout/', views.logout_user, name='logout'),
    path('register/', views.register, name='register'),
    path('profile/', views.profile, name='profile')
]