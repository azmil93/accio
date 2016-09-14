var requiresAuth = ($location, UserFactory) => new Promise((resolve, reject) => {
  UserFactory.userAuth().then((res) => {
    if (res.user) {
      resolve();
    } else {
      reject();
      $location.path('/');
    }
  });
})



angular.module('Accio_app')
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'static/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
    .when('/profile', {
      templateUrl: 'static/profile/profile.html',
      controller: 'ProfileCtrl',
      controllerAs: 'profile',
      resolve: {requiresAuth}
    })
    .when('/record', {
      templateUrl: 'static/record/record.html',
    });
});
