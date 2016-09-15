'use strict';
angular.module('Accio_app', ['angularAudioRecorder', 'ngRoute'])
  .config(['$interpolateProvider', '$httpProvider', 'recorderServiceProvider',
  function($interpolateProvider, $httpProvider, recorderServiceProvider){

    $interpolateProvider.startSymbol('[[').endSymbol(']]');

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    recorderServiceProvider
      .forceSwf(false)
      .withMp3Conversion(false);
  }]);

angular.module('Accio_app')
.factory('UserFactory', ['$http', ($http) => {
  const rootUrl = 'http://localhost:8000';
  return {
    userAuth: () => {
      return $http.get(`${rootUrl}/userAuth/`)
      .then((res) => {
          return res.data;
        })
    }
  }
}])
.factory('DataFactory', ['$http', ($http) => {
  const rootUrl = 'http://localhost:8000';
  return {
    registerUser: (userData) => {
      return $http({
    		url: `${rootUrl}/register/`,
	    	method: "POST",
	    	data: {
	    		'first_name': userData.first_name,
	    		'last_name': userData.last_name,
	    		'username': userData.username,
	    		'email': userData.email,
	    		'password': userData.password,
	    	}
    	}).then((res) => {
          return res.data;
        })
    },
    loginUser: (userData) => {
      return $http({
        url: `${rootUrl}/login/`,
        method: "POST",
        data: {
          'username': userData.username,
          'password': userData.password
        }
      }).then((res) => {
          return res.data;
        })
    },
    logoutUser: () => {
      return $http.get(`${rootUrl}/logout`)
        .then((res) => {
          return res.data;
        })
    },
    getUserTracks: () => {
      return $http.get(`${rootUrl}/getTracks/`)
        .then((res) => {
          return res.data;
        })
    },
    deleteTrack: (id) => {
      return $http.delete(`${rootUrl}/${id}/`)
        .then((res) => {
          return res.data;
        })
    },
    recognize: (blob) => {
      return $http({
        method: "POST",
        url: 'http://localhost:8000/recognize/',
        data: blob})
        .then(function (res) {
          return res.data;
        });
    },
    updateUser: (id) => {
      return $http.patch(`${rootUrl}/update/`, {trackId: id})
      .then((res) => {
        return res.data;
      })
    }
  }
}])

var requiresAuth = ['$location', 'UserFactory', ($location, UserFactory) => new Promise((resolve, reject) => {
  UserFactory.userAuth().then((res) => {
    if (res.user) {
      resolve();
    } else {
      reject();
      $location.path('/');
    }
  });
})]
angular.module('Accio_app')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'static/src/javascripts/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
    .when('/profile', {
      templateUrl: 'static/src/javascripts/profile/profile.html',
      controller: 'ProfileCtrl',
      controllerAs: 'profile',
      resolve: {requiresAuth}
    })
    .when('/record', {
      templateUrl: 'static/src/javascripts/record/record.html',
      controller: 'RecordCtrl',
      controllerAs: 'record',
    });
}]);

angular.module('Accio_app')
.controller('LoginCtrl', ['DataFactory', '$location', function(DataFactory, $location) {
  const login = this;
  login.hello = "Accio";

  login.loginUser = () => {
    DataFactory.loginUser(login.user)
    .then((res) => {
      if (res[0]) {
        $location.path(`/profile`)
      }
      else {
        alert('Login Failed');
      }
    })
  };

  login.register = () => {
    DataFactory.registerUser(login.createUser)
    .then((res) => {
      if (res[0]) {
        $location.path(`/profile`)
      }
      else {
        alert('Login Failed');
      }
    })
  };
}]);

angular.module('Accio_app')
.controller('ProfileCtrl', ['DataFactory', '$location', 'UserFactory', function(DataFactory, $location, UserFactory) {
  const profile = this;
  UserFactory.userAuth()
    .then(res => profile.username = res.username)
  profile.title = 'welcome';
  profile.getTracks = () => {
    DataFactory.getUserTracks().then((res) => {
      if (res.length >= 1) {
        profile.tracks = res
      } else {
        profile.noTracks = true;
        profile.response = res.error;
      }
    })
  };
  profile.getTracks();
  profile.record = () => {
    $location.path('/record')
  }
  profile.logout = () => {
    DataFactory.logoutUser()
    .then((res) => {
      if (res.logout === true) {
        $location.path('/')
      }
    })
  },
  profile.delete = (track) => {
    DataFactory.deleteTrack(track.pk)
    .then(profile.getTracks())
  }
}])

angular.module('Accio_app')
.controller('RecordCtrl', ['$interval', '$http', 'DataFactory', '$location',
function($interval, $http, DataFactory, $location) {
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
      DataFactory.updateUser(record.results.pk).then(res => $location.path('/profile'))
    });
  };
}])
