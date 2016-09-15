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
