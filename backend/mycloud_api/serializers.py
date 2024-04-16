from .models import File,Folder
from rest_framework import serializers


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ["uid", "files", "user", "file_name", "folder", "size", "upload_date", "comment", "share_link"]
        extra_kwargs = {"upload_date": {"read_only": True}, }
    
    def get_file_path(self, obj):
        return obj.file.url
        
        
# Folder Model Serializer Class {A Api Format of the Model}
class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ["user", "uid", "folder_name", "comment", "size", "upload_date", "share_link"]
        extra_kwargs = {"date_created": {"read_only": True}, }