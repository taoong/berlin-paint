
(function() {

  var currentUserEmail = firebase.auth().currentUser;

  // Getting orders involving user in order table
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        currentUserEmail = user.email;
        console.log(currentUserEmail);
        dbOrders.orderByChild("user").equalTo(currentUserEmail).on("child_added", snap => {
          console.log(snap.val());

          var dataset = [snap.child("order_id").val(), snap.child("order_date").val(), snap.child("name").val(), snap.child("quantity").val(), snap.child("order_status").val(), snap.child("reviewed").val()];
          ordersTable.rows.add([dataset]).draw();
        });
      } else {
        console.log("USED SHOULD BE LOGGED IN BUT ISN'T");
      }
    });

  var dbOrders = firebase.database().ref().child('orders/');

  var ordersTable = $('#user-orders').DataTable();

  

  

  angular
    .module("app", ['firebase'])
    .controller("myCtrl", function($scope) {
      // Getting emails for users when adding orders
      $scope.emails = [];
      var test = document.getElementById('test');
      var dbUsers = firebase.database().ref().child('users/');
      dbUsers.orderByChild("email").on("child_added", snap => {
        var email = snap.val().email;
        $scope.emails.push(email);
      });
      // Adding orders
      $scope.addItem = function () {
        // Checks if all blanks on the form have been filled out
        if ($scope.itemID == null || $scope.itemName == null || $scope.itemType == null || $scope.orderStatus == null || $scope.itemQuantity == null || $scope.user == null || $scope.orderDescription == null) {
          alert('All text fields must be filled out.');
          return;
        }
        // Adding the order to Firebase
        var orderID = dbOrders.push().key;
        var data = {
          order_id: orderID,
          order_date: new Date().toJSON().slice(0,10),
          user: $scope.user,
          item_id: $scope.itemID,
          name: $scope.itemName,
          quantity: $scope.itemQuantity,
          type: $scope.itemType,
          order_status: $scope.orderStatus,
          description: $scope.orderDescription,
          reviewed: false
        }
        var updates = {};
        updates['/orders/' + orderID] = data;
        firebase.database().ref().update(updates);
        alert('The order was added to the database.');
        window.location.reload();
      }
    });



}());
  