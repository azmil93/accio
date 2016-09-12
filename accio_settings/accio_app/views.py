from django.http import HttpResponse
from django.shortcuts import render
from django.core import serializers
from accio_app.acr import acr
from .utilities import createTrack
import json



def index(request):
    return render(request, 'accio_app/index.html')

def recognize(request):
    accio = acr.recognize(request.body)
    try:
        createTrack(accio)
        return HttpResponse(accio)
    except KeyError:
        return HttpResponse(accio)
