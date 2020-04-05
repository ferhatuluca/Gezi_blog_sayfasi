from requests import Response
from rest_framework.decorators import api_view

from trips.permissions import IsOwnerOrReadOnly, IsLoggedInUserOrAdmin, IsAdminUser
from .models import Trip
from .serializers import TripSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions



class TripViewSet(viewsets.ModelViewSet):

    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticated,
                          IsOwnerOrReadOnly]   #put ve delete methodlarını sadece sahibi yapabilir.


    def perform_create(self, serializer):       #foreign key alani icin yazilmasi gerekiyor.
        serializer.save(owner=self.request.user)

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create' or self.action == 'list':
            permission_classes = [permissions.AllowAny]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInUserOrAdmin]
        elif self.action == 'destroy':
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]