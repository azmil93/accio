angular.module('Accio_app')
.controller('ProfileCtrl', ['DataFactory', '$location', 'UserFactory', function(DataFactory, $location, UserFactory) {
  const profile = this;
  UserFactory.userAuth()
    .then(res => profile.username = res.username);
  profile.title = 'welcome';
  profile.getTracks = () => {
    DataFactory.getUserTracks().then((res) => {
      if (res.length >= 1) {
        profile.tracks = res;
      } else {
        profile.noTracks = true;
        profile.response = res.error;
      }
    });
  };
  profile.getTracks();

  profile.record = () => {
    $location.path('/');
  };

  profile.delete = (track) => {
    DataFactory.deleteTrack(track.pk)
    .then(profile.getTracks());
  };
}]);
