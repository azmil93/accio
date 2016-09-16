angular.module('Accio_app', ['angularAudioRecorder', 'ngRoute'])
  .config(['$interpolateProvider', '$httpProvider', 'recorderServiceProvider',
  function($interpolateProvider, $httpProvider, recorderServiceProvider){
    'use strict';
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    recorderServiceProvider
      .forceSwf(false)
      .withMp3Conversion(false);
  }]);
