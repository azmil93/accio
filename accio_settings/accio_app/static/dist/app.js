'use strict';

angular.module('Accio_app', ['angularAudioRecorder', 'ngRoute']).config(['$interpolateProvider', '$httpProvider', 'recorderServiceProvider', '$sceDelegateProvider', function ($interpolateProvider, $httpProvider, recorderServiceProvider, $sceDelegateProvider) {
  'use strict';

  $interpolateProvider.startSymbol('[[').endSymbol(']]');
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  recorderServiceProvider.forceSwf(false).withMp3Conversion(false);
  $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://p.scdn.co/**']);
}]);
'use strict';

angular.module('Accio_app').factory('UserFactory', ['$http', function ($http) {
  var rootUrl = 'http://localhost:8000';
  return {
    userAuth: function userAuth() {
      return $http.get(rootUrl + '/userAuth/').then(function (res) {
        return res.data;
      });
    }
  };
}]).factory('DataFactory', ['$http', function ($http) {
  var rootUrl = 'http://localhost:8000';
  return {
    registerUser: function registerUser(userData) {
      return $http({
        url: rootUrl + '/register/',
        method: "POST",
        data: {
          'first_name': userData.first_name,
          'last_name': userData.last_name,
          'username': userData.username,
          'email': userData.email,
          'password': userData.password
        }
      }).then(function (res) {
        return res.data;
      });
    },
    loginUser: function loginUser(userData) {
      return $http({
        url: rootUrl + '/login/',
        method: "POST",
        data: {
          'username': userData.username,
          'password': userData.password
        }
      }).then(function (res) {
        return res.data;
      });
    },
    logoutUser: function logoutUser() {
      return $http.get(rootUrl + '/logout').then(function (res) {
        return res.data;
      });
    },
    getUserTracks: function getUserTracks() {
      return $http.get(rootUrl + '/getTracks/').then(function (res) {
        return res.data;
      });
    },
    deleteTrack: function deleteTrack(id) {
      return $http.delete(rootUrl + '/' + id + '/').then(function (res) {
        return res.data;
      });
    },
    recognize: function recognize(blob) {
      return $http({
        method: "POST",
        url: 'http://localhost:8000/recognize/',
        data: blob }).then(function (res) {
        return res.data;
      });
    },
    updateUser: function updateUser(id) {
      return $http.patch(rootUrl + '/update/', { trackId: id }).then(function (res) {
        return res.data;
      });
    }
  };
}]);
'use strict';

var requiresAuth = ['$location', 'UserFactory', function ($location, UserFactory) {
  return new Promise(function (resolve, reject) {
    UserFactory.userAuth().then(function (res) {
      if (res.user) {
        resolve();
      } else {
        reject();
        $location.path('/');
      }
    });
  });
}];
angular.module('Accio_app').config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'static/src/javascripts/profile/profile.html',
    controller: 'ProfileCtrl',
    controllerAs: 'profile',
    resolve: { requiresAuth: requiresAuth }
  }).when('/', {
    templateUrl: 'static/src/javascripts/record/record.html',
    controller: 'RecordCtrl',
    controllerAs: 'record'
  });
}]);
'use strict';

angular.module('Accio_app').controller('ProfileCtrl', ['DataFactory', '$location', 'UserFactory', function (DataFactory, $location, UserFactory) {
  var profile = this;
  UserFactory.userAuth().then(function (res) {
    return profile.username = res.username;
  });
  profile.title = 'welcome';
  profile.getTracks = function () {
    DataFactory.getUserTracks().then(function (res) {
      if (res.length >= 1) {
        profile.tracks = res;
      } else {
        profile.noTracks = true;
        profile.response = res.error;
      }
    });
  };
  profile.getTracks();

  profile.record = function () {
    $location.path('/');
  };

  profile.delete = function (track) {
    DataFactory.deleteTrack(track.pk).then(profile.getTracks());
  };
}]);
'use strict';

angular.module('Accio_app').controller('LoginCtrl', ['DataFactory', '$location', 'UserFactory', '$window', function (DataFactory, $location, UserFactory, $window) {
  var login = this;
  login.hello = "Accio";
  UserFactory.userAuth().then(function (res) {
    return login.user = res;
  });
  login.loginUser = function () {
    DataFactory.loginUser(login.user).then(function (res) {
      if (res[0]) {
        $window.location.reload();
      } else {
        alert('Login Failed');
      }
    });
  };

  login.register = function () {
    DataFactory.registerUser(login.createUser).then(function (res) {
      if (res[0]) {
        $window.location.reload();
      } else {
        alert('Login Failed');
      }
    });
  };

  login.logout = function () {
    DataFactory.logoutUser().then(function (res) {
      if (res.logout === true) {
        $window.location.reload();
      }
    });
  };
}]);
'use strict';

angular.module('Accio_app').controller('RecordCtrl', ['$interval', '$http', 'DataFactory', '$location', function ($interval, $http, DataFactory, $location) {
  var record = this;

  record.int = $interval(function () {
    if (record.recorded) {
      var file = new FormData();
      file.append('audio/wav', record.recorded, 'output.wav');
      DataFactory.recognize(file).then(function (res) {
        try {
          if (res.status.code === 1001) {
            record.noResults = true;
          }
        } catch (err) {
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

  record.register = function () {
    DataFactory.registerUser(record.createUser).then(function (res) {
      DataFactory.updateUser(record.results.pk).then(function (res) {
        return $location.path('/profile');
      });
    });
  };
}]);