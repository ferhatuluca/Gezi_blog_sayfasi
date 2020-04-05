from django.conf.urls import url, include
from django.conf.urls.static import static
from rest_framework import routers

from geziajanda import settings
from trips import views
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

# Create a router and register our viewsets with it.
router = routers.DefaultRouter()
router.register(r'trips', views.TripViewSet)
router.register(r'users', views.UserViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^token-auth/', obtain_jwt_token),
    url(r'^token-refresh/', refresh_jwt_token)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)