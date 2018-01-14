// Initialize Firebase

(function() {

  // Add logout event
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    window.location.replace("../../index.html");
  }) 

}());
  