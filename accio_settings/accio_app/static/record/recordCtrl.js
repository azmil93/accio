angular.module('Accio_app')
.controller('RecordCtrl', function($interval, $http, DataFactory) {
  const record = this;
  record.int = $interval(function () {
    if(record.recorded) {
      console.log(record.recorded);
      var file = new FormData();
      file.append('audio/wav', record.recorded, 'output.wav');
      DataFactory.recognize(file).then(res => console.log(res));
      record.stopInterval()
    }
  }, 1000)
  record.stopInterval = function () {
    $interval.cancel(record.int);
  };
})
