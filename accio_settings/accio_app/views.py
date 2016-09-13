from django.http import HttpResponse
from django.shortcuts import render
from django.core import serializers
from accio_app.acr import acr
from .utilities import createTrack
import json
from django.contrib.auth.models import User
from django.contrib.auth import logout, login, authenticate

def index(request):
    return render(request, 'accio_app/index.html')

def recognize(request):
    accio = acr.recognize(request.body)
    try:
        createTrack(accio)
        return HttpResponse(accio)
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
