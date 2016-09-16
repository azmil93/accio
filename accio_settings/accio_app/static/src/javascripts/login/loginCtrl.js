angular.module('Accio_app')
.controller('LoginCtrl', ['DataFactory', '$location', 'UserFactory', '$window',
function(DataFactory, $location, UserFactory, $window) {
  const login = this;
  login.hello = "Accio";
  UserFactory.userAuth()
    .then(res => login.user = res);
  login.loginUser = () => {
    DataFactory.loginUser(login.user)
    .then((res) => {
      if (res[0]) {
        $window.location.reload();
      }
      else {
        alert('Login Failed');
      }
    });
  };

  login.register = () => {
    DataFactory.registerUser(login.createUser)
    .then((res) => {
      if (res[0]) {
        $window.location.reload();
      }
      else {
        alert('Login Failed');
      }
    });
  };

  login.logout = () => {
    DataFactory.logoutUser()
    .then((res) => {
      if (res.logout === true) {
        $window.location.reload();
      }
    });
  };
}]);
