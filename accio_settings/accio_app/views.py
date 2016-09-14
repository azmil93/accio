from django.http import HttpResponse
from django.shortcuts import get_list_or_404, get_object_or_404, render
from django.core import serializers
from accio_app.acr import acr
from .utilities import createTrack
from .models import Track
import json
from django.contrib.auth.models import User, AnonymousUser
from django.contrib.auth import logout, login, authenticate

def index(request):
    return render(request, 'accio_app/index.html')

def recognize(request):
    accio = acr.recognize(request.body)
    try:
        track = createTrack(accio, request.user)
        return HttpResponse(track)
    except KeyError:
        return HttpResponse(accio)

def newUser(request):
    data = json.loads(request.body.decode())
    user = User.objects.create_user(
        username = data['username'],
        password = data['password'],
        email = data['email'],
        first_name = data['first_name'],
        last_name = data['last_name']
    )
    return loginUser(request)

def loginUser(request):
    data = json.loads(request.body.decode())
    username = data['username']
    password = data['password']
    user = authenticate(
        username = username,
        password = password
    )
    loggedIn = True
    if user is not None:
        login(request = request, user = user)
        userJson = serializers.serialize("json", [user, ])
        return HttpResponse(userJson, content_type='application/json')
    else:
        loggedIn = False
        response = json.dumps({"loggedIn": loggedIn})
        return HttpResponse(response, content_type='application/json')

def logoutUser(request):
    logout(request)
    response = json.dumps({'logout': True})
    return HttpResponse(response, content_type='application/json')

def userAuth(request):
    if request.user.is_anonymous:
        response = json.dumps({"user": False})
    else:
        response = json.dumps({"user": True})
    return HttpResponse(response, content_type='application/json')

def getUserTracks(request):
    try:
        tracks = get_list_or_404(Track, user=request.user.pk)
        tracksJson = serializers.serialize("json", tracks)
        return HttpResponse(tracksJson, content_type="application/json")
    except:
        response = json.dumps({
            "error": "No tracks saved. Once you Accio a track it will save to your profile for later."
        })
        return HttpResponse(response, content_type="application/json")

def deleteTrack(request, event_id):
    track = Track.objects.filter(pk=event_id)
    track.delete()
    return HttpResponse("success")
