// Initialize Firebase

(function() {
  var config = {
    apiKey: "AIzaSyAAc3bIDjN1BBAajWvD7aIG2sz0z8UadHM",
    authDomain: "berlin-83c24.firebaseapp.com",
    databaseURL: "https://berlin-83c24.firebaseio.com",
    projectId: "berlin-83c24",
    storageBucket: "berlin-83c24.appspot.com",
    messagingSenderId: "301683329371"
  };
  firebase.initializeApp(config);

  angular
    .module("app", ['firebase'])
    .controller("myCtrl", function($firebaseObject) {
      const rootRef = firebase.database().ref().child('angular');
      const ref = rootRef.child('object');
      this.object = $firebaseObject(ref);
  });

}());
  