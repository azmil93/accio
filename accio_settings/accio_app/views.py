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
    newUser = User.objects.create(
        username = data['username'],
        password = data['password'],
        email = data['email'],
        first_name = data['first_name'],
        last_name = data['last_name']
    )

    return login(request)

def login(request):
    data = json.loads(request.body.decode())
    authenticateUser = authenticate(
        username = data['username'],
        password = data['password']
    )
