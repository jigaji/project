from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated
from .serializer import FileSerializer, FolderSerializer

# Create your views here.


class FileViewSet(ViewSet):
    http_method_names = ("post", "get", "put", "delete")
    permission_classes = (IsAuthenticated)
    serializer_class = FileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return serializer.data


class FileViewSet(ViewSet):
    http_method_names = ("post", "get", "put", "delete")
    permission_classes = (IsAuthenticated)
    serializer_class = FolderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return serializer.data