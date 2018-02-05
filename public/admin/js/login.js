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
  const txtCompany = document.getElementById('txtCompany');
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
      $('#errorMessage').css("visibility", "visible");
      document.getElementById('errorMessage').innerHTML = "Error: " + e.message;
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
      $('#errorMessage').css("visibility", "visible");
      document.getElementById('errorMessage').innerHTML = "Error: " + e.message;
    });
  })

  // Add change to sign up event
  $("#changeToSignUp").on('click', function() {
    $('#loginTitle').text("Sign Up for a New Account");
    $('#txtCompany').css("display", "block");
    $('#btnLogin').css("display", "none");
    $('#btnSignup').css("display", "block");
    $('#signUpText').css("display", "none");
    $('#logInText').css("display", "block");
    $('#errorMessage').css("visibility", "hidden");
  })

  $("#changeToLogIn").on('click', function() {
    $('#loginTitle').text("Please Log In");
    $('#txtCompany').css("display", "none");
    $('#btnLogin').css("display", "block");
    $('#btnSignup').css("display", "none");
    $('#signUpText').css("display", "block");
    $('#logInText').css("display", "none");
    $('#errorMessage').css("visibility", "hidden");
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
            company_name: txtCompany.value,
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
  