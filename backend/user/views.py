from django.shortcuts import render
from .models import User
from .serializers import MyTokenObtaoinPairSerialiser, RegistrationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtaoinPairSerialiser

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protectedView(request):
    output = f"Welcome {request.user}!"
    return Response({'response':output}, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_all_routes(request):
    data = [
        'token/refresh/',
        'register/',
        'token/'
    ]

    return Response(data)