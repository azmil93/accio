angular.module('Accio_app')
.controller('LoginCtrl', function(DataFactory, $location) {
  const login = this;
  login.hello = "Accio";
  
  login.loginUser = () => {
    DataFactory.loginUser(login.user)
    .then((res) => {
      if (res[0]) {
        var id = res[0].pk;
        $location.path(`/profile/${id}`)
      }
      else {
        alert('Login Failed');
      }
    })
  };

  login.register = () => {
    DataFactory.registerUser(login.createUser)
    .then(res => console.log(res))
  };
});
