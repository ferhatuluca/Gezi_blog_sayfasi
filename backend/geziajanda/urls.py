from django.contrib import admin
from django.conf.urls import url, include

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('trips.urls'))
    #url(r'^api/', include('trips.urls'))
]
