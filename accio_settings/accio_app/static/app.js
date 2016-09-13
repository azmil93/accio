'use strict';
angular.module('Accio_app', ['angularAudioRecorder', 'ngRoute'])
  .config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
  })
  .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  })
  .config(function (recorderServiceProvider) {
    recorderServiceProvider
      .forceSwf(false)
      .withMp3Conversion(false);
  })
