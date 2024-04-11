from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.validators import RegexValidator
from . models import Profile

# Create Your Serializer


class RegisterSerializer(serializers.ModelSerializer):
    
    login_validator = RegexValidator(
        regex=r'^([a-zA-Z]{1}[a-z0-9]{3,20}$',
        message='Login should start with letter, consist of letters and numbers, 4-20 characters',)
   
    password_validator = RegexValidator(
        regex=r'^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.*\s).{6,}$',
        message='Password should be at least 6 characters and consist of one uppercase letter, one numeric digit, and one special character',)

    login = serializers.CharField(label="Login", required=True, validators=[login_validator])
    password = serializers.CharField(label='Password', write_only=True, required=True, validators=[password_validator])
    password2 = serializers.CharField(label='Password', write_only=True, required=True, validators=[password_validator])
    
    
    class Meta:
        model  = User
        fields = ("login", "first_name", "last_name", "email")

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password']!=cd['password2']:
            raise serializers.ValidationError("Password check failed")
        else:
            return cd['password2']
        

class UserEditForm(serializers.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class ProfileEditForm(serializers.ModelForm):
    photo = serializers.ImageField()
    class Meta:
        model = Profile
        fields = ('photo', )
    class Meta:
        model = User
        fields = ["id", "login", "password", "first_name", "last_name", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)