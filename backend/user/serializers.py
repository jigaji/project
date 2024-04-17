from rest_framework import serializers
from rest_framework_simplejwt.tokens import Token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.core.validators import RegexValidator
from .models import User, Profile

# Create Your Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class MyTokenObtaoinPairSerialiser(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email

        return token


class RegistrationSerializer(serializers.ModelSerializer):

    login_validator = RegexValidator(
        regex=r'^[a-zA-Z]{1}[a-z0-9]{3,20}$',
        message='Login should start with letter, consist of letters and numbers, 4-20 characters',)
   
    password_validator = RegexValidator(
        regex=r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,/])[A-Za-z\d@$!%*?&.,]{6,}$', 
        message='Password should be at least 6 characters and consist of one uppercase letter, one numeric digit, and one special character',)
   
    username = serializers.CharField(label="Login", required=True, validators=[login_validator])
    password = serializers.CharField(write_only=True, required=True, validators=[password_validator])
    password2 = serializers.CharField(write_only=True, required=True)
    full_name = serializers.CharField(write_only=True, required=True)
    
           
    class Meta:
        model = User
        fields = ['id','full_name', 'email', 'username', 'password', 'password2',]
        
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password':"Password Fields Didn't Match"}
            )
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])

        user.save()

        if "full_name" in validated_data:
            user.profile.full_name = validated_data['full_name']
            user.profile.save()

        return user
    

        return User.objects.create(**validated_data)
