angular.module('Accio_app')
.controller('RecordCtrl', function($interval, $http, DataFactory) {
  const record = this;

  record.int = $interval(function () {
    if(record.recorded) {
      var file = new FormData();
      file.append('audio/wav', record.recorded, 'output.wav');
      DataFactory.recognize(file)
        .then((res) => {
          try {
            if(res.status.code === 1001) {
              record.noResults = true
            }
          }
          catch(err) {
            record.results = res[0].fields;
            record.showInfo = true;
          }
        });
      record.showResults = true;
      record.stopInterval();
    }
  }, 1000);

  record.stopInterval = function () {
    $interval.cancel(record.int);
  };
})
