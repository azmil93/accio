from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^recognize/', views.recognize, name='recognize'),
    url(r'^login/', views.loginUser, name="login"),
    url(r'^register/', views.newUser, name="register"),
    url(r'^getTracks/', views.getUserTracks, name="getUserTracks"),
    url(r'^logout/', views.logoutUser, name="logout"),
    url(r'^userAuth/', views.userAuth, name="userAuth"),
    url(r'^(?P<event_id>[0-9]+)/$', views.deleteTrack, name="delete"),
    url(r'^update/', views.updateUser, name="updateUser"),
]
