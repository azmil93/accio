angular.module('Accio_app')
.controller('ProfileCtrl', function(DataFactory, $location) {
  const profile = this;
  profile.title = 'welcome';
  DataFactory.getUserTracks().then((res) => {
    if (res.length > 1) {
      profile.tracks = res
    } else {
      profile.noTracks = true;
      profile.response = res.error;
    }
  })
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
  }
})
