from rest_framework.viewsets import ViewSet
from .serializer import RegisterSerializer, UserEditSerializer, ProfileEditSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.

class RegisterViewSet(ViewSet):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ["post"]
    
    def create(self, request, *args, **kwargs):
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            return serializer.save()

class UserEditViewSet(ViewSet):
    serializer_class = UserEditSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["post"]
    
    def edit(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return serializer.save()

class ProfilEditViewSet(ViewSet):
    serializer_class = ProfileEditSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ["post"]
    
    def edit(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return serializer.save()
