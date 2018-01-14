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

  // Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');

  var ref = firebase.database().ref();

  // Add login event
  btnLogin.addEventListener('click', e => {
    // Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => {
      console.log(e.message);
      document.getElementById('errorMessage').innerHTML = e.message;
    });
  })

  // Add signup event
  btnSignup.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => {
      document.getElementById('errorMessage').innerHTML = e.message;
    });
  })

  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      // Get authentication data
      var userID = firebaseUser.uid;
      ref.child('users').child(userID).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        // if first time logging in
        if (!exists) {
          var newUser = {
            user_id: userID,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
            dateCreated: new Date().toJSON().slice(0,10),
            admin: false
          };
          var updates = {};
          updates['users/' + userID] = newUser;
          firebase.database().ref().update(updates);
          alert('Your account was created successfully!');
        }
        ref.child('users').child(userID).once('value', function(snapshot) {
          if (snapshot.val().admin) {
            window.location.replace("admin-index.html");
          } else {
            window.location.replace("index.html");
          }
        }); 
      });
    } else {
        console.log('Not logged in');
    }
  })

}());
  