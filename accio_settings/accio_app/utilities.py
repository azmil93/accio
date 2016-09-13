# upc example for spotify
# "https://api.spotify.com/v1/search?q=upc:00602537817016&type=album"
import requests
from .models import Track
import json

def createTrack(data):
    jsonData = json.loads(data)
    music = jsonData['metadata']['music'][0]
    isrc = music['external_ids']['isrc']
    title = music['title']
    album = music['album']['name']
    artist = ''.join([str(artist['name']) for artist in music['artists']])
    spotify = requests.get(
        'https://api.spotify.com/v1/search?type=track&q=isrc:' + str(isrc)
    )
    spotifyJson = spotify.json()
    print(spotifyJson)
    try:
        imageUrl = spotifyJson['tracks']['items'][0]['album']['images'][1]['url']

        newTrack = Track.objects.create(
            title=title,
            album=album,
            artist=artist,
            imageURL=imageUrl
        )
    except IndexError:
        newTrack = Track.objects.create(
            title=title,
            album=album,
            artist=artist
        )
    print(newTrack)
