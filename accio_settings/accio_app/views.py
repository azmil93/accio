from django.http import HttpResponse
from django.shortcuts import render
from django.core import serializers
from accio_app.acr import acr



def index(request):
    return render(request, 'accio/index.html')

def recognize(request):
    accio = acr.recognize(request.body)
    return HttpResponse(accio)
