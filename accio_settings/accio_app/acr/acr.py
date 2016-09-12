import os, sys
from accio_app.acr.acrcloud.recognizer import ACRCloudRecognizer
import pyaudio
import wave
import uuid
from .config_dict import config

def recognize(data):
    CHUNK = 1024
    FORMAT = pyaudio.paInt16
    CHANNELS = 1
    RATE = 44100
    FILENAME = str(uuid.uuid4()) + ".wav"
    p = pyaudio.PyAudio()
    wf = wave.open(FILENAME, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(data)
    wf.close()

    re = ACRCloudRecognizer(config)
    song = re.recognize_by_file(FILENAME, 0)

    #delete file
    print(song)
    return song
