
(function() {

  var currentUserEmail = firebase.auth().currentUser;

  var dbOrders = firebase.database().ref().child('orders/');

  var reviewed = 0;

  var unreviewed = 0;

  var reviewedOrders = document.getElementById('reviewedOrders');

  var unreviewedOrders = document.getElementById('unreviewedOrders');

  if (reviewedOrders != null && unreviewedOrders != null) {
    reviewedOrders.innerText = reviewed;
    unreviewedOrders.innerText = unreviewed;
    dbOrders.on("child_added", snap => {
      // Showing unreviewed orders on index.html
      if (snap.child("reviewed").val() == false) {
        unreviewed += 1;
        unreviewedOrders.innerText = unreviewed;
      } else {
        reviewed += 1;
        reviewedOrders.innerText = reviewed;
      }
    });
  }

  var userOrders = [];

  var ordersTable = $('#user-orders').DataTable();

  var orderStatus;

  var modalClone = $("#DescModal").clone();

  ordersTable.on('click', 'tr', function () {
      $("#DescModal").replaceWith(modalClone.clone());
      $("#product_name").text(ordersTable.row(this).data()[2]);
      orderStatus = ordersTable.row(this).data()[4];
      if (orderStatus == "Processing Order") {
        $("#paymentReceived").addClass("success");
        $("#paymentReceivedTitle").text("Payment Received");
        $("#paymentReceivedDesc").text("Great! Your payment has been received by us.");
      }
      if (orderStatus == "Manufacturing Paint") {
        $("#paymentReceived").addClass("success");
        $("#paymentReceivedTitle").text("Payment Received");
        $("#paymentReceivedDesc").text("Great! Your payment has been received by us.");
        $("#orderProcessed").addClass("success");
        $("#orderProcessedTitle").text("Order Processed");
        $("#orderProcessedDesc").text("Your order has been fully processed and our factory is ready to start on your order.");
      }
      if (orderStatus == "Delivering") {
        $("#paymentReceived").addClass("success");
        $("#paymentReceivedTitle").text("Payment Received");
        $("#paymentReceivedDesc").text("Great! Your payment has been received by us.");
        $("#orderProcessed").addClass("success");
        $("#orderProcessedTitle").text("Order Processed");
        $("#orderProcessedDesc").text("Your order has been fully processed and our factory is ready to start on your order.");
        $("#paintManufactured").addClass("success");
        $("#paintManufacturedTitle").text("Paint Manufactured");
        $("#paintManufacturedDesc").text("Your product was successfully manufactured - all that is left is for us to bring it to you.");
      }
      if (orderStatus == "Completed") {
        $("#paymentReceived").addClass("success");
        $("#paymentReceivedTitle").text("Payment Received");
        $("#paymentReceivedDesc").text("Great! Your payment has been received by us.");
        $("#orderProcessed").addClass("success");
        $("#orderProcessedTitle").text("Order Processed");
        $("#orderProcessedDesc").text("Your order has been fully processed and our factory is ready to start on your order.");
        $("#paintManufactured").addClass("success");
        $("#paintManufacturedTitle").text("Paint Manufactured");
        $("#paintManufacturedDesc").text("Your product was successfully manufactured - all that is left is for us to bring it to you.");
        $("#orderDelivered").addClass("success");
        $("#orderDeliveredTitle").text("Order Delivered");
        $("#orderDeliveredDesc").text("The order was delivered and closed!");
      }
      $('#DescModal').modal("show");
    });

  angular
    .module("app", [])
    .controller("myCtrl", function($scope) {
      $scope.userOrders = [];
      // Getting orders involving user in order table
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          currentUserEmail = user.email;
          dbOrders.orderByChild("user").equalTo(currentUserEmail).on("child_added", snap => {
            // Getting unreviewed orders
            if (snap.child("reviewed").val() == false) {
              // Showing unreviewed orders on orders.html
              $scope.userOrders.push(snap.val());
              $scope.$digest();
              return;
            } else {
              var dataset = [snap.child("order_id").val(), snap.child("order_date").val(), snap.child("name").val(), snap.child("quantity").val(), snap.child("order_status").val()];
              ordersTable.rows.add([dataset]).draw();
              ordersTable.columns.adjust().draw();
            }
          });
        } else {
          console.log("USED SHOULD BE LOGGED IN BUT ISN'T");
        }
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

      // Confirmed order
      $scope.confirmOrder = function(id) {
        firebase.database().ref("orders/" + id).update({ reviewed: true });
        window.location.reload();
      }
    });



}());
  