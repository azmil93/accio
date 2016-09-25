# Accio
![Sreenshot of Record page](https://raw.githubusercontent.com/hannahhall/accio/master/accio_settings/accio_app/static/img/screen_shot_record.png)
![Sreenshot of Profile page](https://raw.githubusercontent.com/hannahhall/accio/master/accio_settings/accio_app/static/img/screen_shot_profile.png)

A music recognition app that saves song info to user's profile. 
Technologies used include: Python, Django, SASS, Gulp, AngularJS, and ACRCloud.

The browser records 5 seconds of audio using getUserMedia(). The audio blob is sent to the server, analyzed by ACRCloud's fingerprinting software, and saved to the database before it returns the song's info. 

To clone or fork:
  1. To use the code sign up for a free trial of ACRCloud at ```https://www.acrcloud.com/```. It does not require a credit card.
  
  2. In the command line run: ```git clone https://github.com/hannahhall/accio``` then cd into the accio directory.
  
  3. The master branch uses ACRCloud's software for macs running python3. If you use windows checkout the windows branch to have to correct software. The windows branch also relies on python3. Run ```git checkout windows```
  
  4. If using mac run ```brew install portaudio```. This step is not necessary for windows users
  
  5. Run ```pip install django requests pyaudio``` or ```pip3 install django requests pyaudio``` if python3 isn't the default
  
  6. Run ```cd accio_settings```
  7. Run ```python manage.py migrate```
  8.  Create a file called ```config_dict.py``` in accio_settings/accio_app/acr. Create a variable called config and add the information from the ACRC account. It should look like this: 
  
  ```
  config = {
          'host':'XXXXXXXX',
          'access_key':'XXXXXXXXXX',
          'access_secret':'XXXXXXXXXXXXXXXXXXXXXX',
          'debug':False,
          'timeout':10 # seconds
      }
  ```
  
  9.  Navigate into the static folder in accio/accio_settings/accio_app/static. Run ```bower install``` to install dependencies
  10.  ```cd bower_components``` then ```git clone https://github.com/hannahhall/angular-recorder.git``` to install angular-recorder
  
  11.  To serve the app: cd to accio/accio_settings then run ```python manage.py runserver```. Since the angular-recorder relies on getUserMedia use either Firefox or Chrome ```http://localhost:8000```
  
