# Accio
![Gif of site](https://raw.githubusercontent.com/hannahhall/accio/master/site_gif.gif)

A music recognition app that saves song info to user's profile. 
Technologies used include: Python, Django, SASS, Gulp, AngularJS, and ACRCloud.

The browser records 5 seconds of audio using getUserMedia(). The audio blob is sent to the server, analyzed by ACRCloud's fingerprinting software, and saved to the database before it returns the song's info. 

To clone or fork:
  1. To use the code sign up for a free trial of ACRCloud at ```https://www.acrcloud.com/```. It does not require a credit card.
  
  2. In the command line run: ```git clone https://github.com/hannahhall/accio``` then cd into the accio directory.
  
  3. The master branch uses ACRCloud's software for macs running python3. If you use windows checkout the windows branch to have to correct software. The windows branch also relies on python3. Run ```git checkout windows```
  
  4. If using mac run ```brew install portaudio```. This step is not necessary for windows users
  
  5. Uses Python >v3.4. To install Python dependencies run ```pip install -r requirements.txt```
  8. Run ```echo "config = {'host':'XXXXXXXX', 'access_key':'XXXXXXXXXX', 'access_secret':'XXXXXXXXXXXXXXXXXXXXXX', 'debug':False, 'timeout':10 # seconds}" > accio_settings/accio_app/acr/config_dict.py```. This creates a variable called config and adds the information from the ACRC account. Replace the X's with the host and access from ACRCloud account. 
  6. Run ```cd accio_settings```
  7. Run ```python manage.py migrate```
  9.  Navigate into the static folder in accio/accio_settings/accio_app/static. Run ```bower install``` to install dependencies
  10.  ```cd bower_components``` then ```git clone https://github.com/hannahhall/angular-recorder.git``` to install angular-recorder
  11.  To serve the app: cd to accio/accio_settings then run ```python manage.py runserver```. Since the angular-recorder relies on getUserMedia use either Firefox or Chrome ```http://localhost:8000```
  
