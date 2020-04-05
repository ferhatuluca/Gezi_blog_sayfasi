from django.db import models
from django.utils import timezone

def upload_path(instance, filename):
    return '/'.join([filename])

#trips
class Trip(models.Model):
    owner = models.ForeignKey('auth.User', related_name='trips', on_delete=models.CASCADE)
    place = models.CharField(max_length=45)
    notes = models.TextField()
    trip_date = models.DateField(null=True)
    created_date = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=45)
    image = models.ImageField(null=True)