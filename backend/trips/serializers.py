from rest_framework import serializers
from rest_framework.settings import api_settings

from .models import Trip
from django.contrib.auth.models import User

class TripSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source="owner.username", read_only="True")

    class Meta:
        model = Trip
        fields = ['url', 'id', 'place', 'notes', 'trip_date', 'created_date', 'title', 'owner', 'image']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    #trips = serializers.HyperlinkedRelatedField(many=True, view_name="trip-detail", read_only=True)
    trips = TripSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'password', 'first_name', 'last_name', 'email', 'trips']

    def create(self, validate_data):
        user = User.objects.create_user(username=validate_data['username'], password=validate_data['password'])
        return user