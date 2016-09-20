angular.module('Accio_app', ['angularAudioRecorder', 'ngRoute'])
  .config(['$interpolateProvider', '$httpProvider', 'recorderServiceProvider', '$sceDelegateProvider',
  function($interpolateProvider, $httpProvider, recorderServiceProvider, $sceDelegateProvider){
    'use strict';
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    recorderServiceProvider
      .forceSwf(false)
      .withMp3Conversion(false);
    $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://p.scdn.co/**']);
  }]);
