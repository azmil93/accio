angular.module('Accio_app')
.controller('RecordParent', function() {
  const parent = this;
})
.controller('RecordCtrl', function ($scope, $timeout, $http, recorderService, $interval) {
  const record = this;

  record.int = $interval(function () {
    if ($scope.$parent.recorder.status.songTrue === true) {
      console.log($scope.$parent.recorder.status.songTrue);
      console.log($scope.$parent.recorder.songInfo);
      record.stopInterval()
    }
  }, 1000)


  record.stopInterval = function () {
    $interval.cancel(record.int);
  };
});
