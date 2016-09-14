angular.module('Accio_app')
.controller('ProfileCtrl', function(DataFactory, $location, $cookies) {
  const profile = this;
  profile.title = 'welcome';
  console.log($cookies.getAll())
  profile.getTracks = () => {
    DataFactory.getUserTracks().then((res) => {
      if (res.length > 1) {
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
})
