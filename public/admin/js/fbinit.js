
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

  // Check if user is valid
  firebase.auth().onAuthStateChanged(firebaseUser => {
      if (!firebaseUser) {
          alert("You are not authorized to view this page.");
          window.location.replace("login.html");
      } else {
          if ((window.location.href).split("pages/")[1].split("-")[0] == "admin") {
              currentUserEmail = firebaseUser.email;
              firebase.database().ref().child('users/').orderByChild("email").equalTo(currentUserEmail).on("child_added", snap => {
                  if (snap.child("admin").val() == false) {
                      alert("You are not authorized to view this page.");
                      window.location.replace("index.html");
                  }
              })
          }
          
      }
  })
  
}());
  