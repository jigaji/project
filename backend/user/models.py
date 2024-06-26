from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save


# Create your models here.

    
def get_profile_img_path(instance, filename):
    return f"{instance.user.username}/profile/{filename}"

class User(AbstractUser):
    username = models.CharField(max_length=100, unique = True)
    email = models.EmailField(unique = True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def profile(self):
        profile = Profile.objects.get(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=300)
    photo = models.ImageField(upload_to=get_profile_img_path, blank=True)

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)