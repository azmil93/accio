var requiresAuth = ['$location', 'UserFactory', ($location, UserFactory) => new Promise((resolve, reject) => {
  UserFactory.userAuth().then((res) => {
    if (res.user) {
      resolve();
    } else {
      reject();
      $location.path('/');
    }
  });
})];
angular.module('Accio_app')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/profile', {
      templateUrl: 'static/src/javascripts/profile/profile.html',
      controller: 'ProfileCtrl',
      controllerAs: 'profile',
      resolve: {requiresAuth}
    })
    .when('/', {
      templateUrl: 'static/src/javascripts/record/record.html',
      controller: 'RecordCtrl',
      controllerAs: 'record',
    });
}]);
