angular.module('Accio_app')
.controller('RecordCtrl', ['$interval', '$http', 'DataFactory', '$location', '$window',
function($interval, $http, DataFactory, $location, $window) {
  const record = this;

  record.int = $interval(function () {
    if(record.recorded) {
      var file = new FormData();
      file.append('audio/wav', record.recorded, 'output.wav');
      DataFactory.recognize(file)
        .then((res) => {
          try {
            if(res.status.code === 1001) {
              record.noResults = true;
            }
          }
          catch(err) {
            record.results = res[0];
            record.showInfo = true;
            if (record.results.fields.user === 0) {
              record.anonUser = true;
            }
          }
        });
      record.showResults = true;
      record.stopInterval();
    }
  }, 1000);

  record.stopInterval = function () {
    $interval.cancel(record.int);
  };

  record.register = () => {
    DataFactory.registerUser(record.createUser)
    .then((res) => {
      DataFactory.updateUser(record.results.pk).then((res) => {
        $window.location.reload();
        $location.path('/profile');
      });
    });
  };
}]);
