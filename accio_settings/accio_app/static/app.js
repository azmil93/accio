'use strict';
angular.module('Accio_app', ['angularAudioRecorder'])
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
  .controller('RecordCtrl', function ($scope, $timeout, $http, recorderService, $interval) {
    const record = this;

    record.int = $interval(function () {
      if ($scope.$parent.recorder.status.songTrue === true) {
        console.log($scope.$parent.recorder.status.songTrue);
        console.log($scope.$parent.recorder.songInfo);
        record.stopInterval()
      }
    }, 1000);

    record.stopInterval = function () {
      $interval.cancel(record.int);
    };
  })
