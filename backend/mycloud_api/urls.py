from django.urls import path
from . import views

urlpatterns = [
    path('files/', views.FileList.as_view(), name='file-list'),
    path('files/upload', views.FileList.as_view(), name='file-list'),
    path('file/delete', views.FileDelete.as_view(), name='file_delete'),
    path("folder/", views.FolderList.as_view(), name="folder_list"),
    path("folder/create", views.FolderList.as_view(), name="folder_list"),
    path('folder/delete', views.FolderDelete.as_view(), name='folder_delete'),
]
