from django.db import models
from django.contrib.auth.models import User


class Track(models.Model):
    title = models.CharField(max_length=100)
    album = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    imageURL = models.CharField(max_length=200, default='')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title + ' by ' + self.artist
