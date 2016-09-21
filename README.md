# Accio
![Sreenshot of Record page](https://raw.githubusercontent.com/hannahhall/accio/master/accio_settings/accio_app/static/img/screen_shot_record.png)
![Sreenshot of Profile page](https://raw.githubusercontent.com/hannahhall/accio/master/accio_settings/accio_app/static/img/screen_shot_profile.png)

A music recognition app that saves song info to user's profile. 
Technologies used include: Python, Django, SASS, Gulp, AngularJS, and ACRCloud.

The browser records 5 seconds of audio using getUserMedia(). The audio blob is sent to the server, analyzed by ACRCloud's fingerprinting software, and saved to the database before it returns the song's info. 
