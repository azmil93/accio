angular.module('Accio_app')
.controller('RecordCtrl', function($interval, $http) {
  const record = this;
  record.int = $interval(function () {
    if(record.recorded) {
      console.log(record.recorded);
      var file = new FormData();
      file.append('audio/wav', record.recorded, 'output.wav');
      $http({
        method: "POST",
        url: 'http://localhost:8000/recognize/',
        data: file}).then(function (res) {
          console.log(res.data);
        });
      record.stopInterval()
    }
  }, 1000)
  record.stopInterval = function () {
    $interval.cancel(record.int);
  };
})
