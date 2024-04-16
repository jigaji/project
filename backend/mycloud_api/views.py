from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import FileSerializer, FolderSerializer
from .models import File, Folder

# Create your views here.


class FileList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FileSerializer

    def get_queryset(self):
        user = self.request.user
        return File.objects.filter(user=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)


class FileDelete(generics.DestroyAPIView):
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return File.objects.filter(autuser=user)
    

class FolderList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FolderSerializer

    def get_queryset(self):
        user = self.request.user
        return Folder.objects.filter(user=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)


class FolderDelete(generics.DestroyAPIView):
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Folder.objects.filter(autuser=user)