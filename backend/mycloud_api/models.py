from django.db import models
from user.models import User
from django.db.models import Q
from django.utils import timezone
import shutil
import uuid 

# Create your models here.
def get_file_location(instance, filename):
    current_location = instance.folder
    path = ""
    while (current_location):
        path = f'/{current_location.name}' + path
        current_location = current_location.folder
    return f"files/{instance.folder.user.username}/{path}/{filename}"

def get_current_location(current_folder):
    username = current_folder.user.username
    path = ""
    while(current_folder):
        path = f"/{current_folder.folder_name}" + path
        current_folder = current_folder.folder
    return f"media/files/{username}{path}"



class Folder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uid = models.UUIDField(editable=True, default=uuid.uuid4, unique=True)
    folder_name = models.CharField(max_length=255)
    folder = models.ForeignKey('self',on_delete=models.CASCADE, related_name='folders_within', null=True)
    size = models.IntegerField(null=True)
    upload_date = models.DateField(default=timezone.now, editable=False)
    share_link = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.user} - {self.name}"
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['folder', 'folder_name'], name='unique_folder_name'),
            models.UniqueConstraint(fields=['folder_name', 'user'], condition=Q(folder=None), name='unique_folder_on_home_page')
        ] 

    def delete(self, *args, **kwargs):
        try:
           shutil.rmtree(get_current_location(self))
        except:
           pass
        finally:
           super().delete(*args, **kwargs)
        

          

class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uid = models.UUIDField(editable=True, default=uuid.uuid4, unique=True)
    file_name = models.CharField(max_length=255, blank=True, null=True,)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True, related_name='files')
    files = models.FileField(upload_to=get_file_location)
    comment = models.TextField(null=True, blank=True)
    size = models.IntegerField(null=True)
    upload_date = models.DateField(default=timezone.now, editable=False)
    share_link = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.files}"

    def save(self, *args, **kwargs):
        self.filename = self.files.name
        super().save(*args, **kwargs)
    
    def delete(self, *args, **kwargs):
        self.files.storage.delete(self.files.name)
        super().delete(*args, **kwargs)