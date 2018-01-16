
(function() {

  var dbOrders = firebase.database().ref().child('orders/');

  var ordersTable = $('#orders').DataTable();

  dbOrders.on("child_added", snap => {
    var dataset = [snap.child("order_id").val(), snap.child("order_date").val(), snap.child("item_id").val(), snap.child("name").val(), snap.child("quantity").val(), snap.child("type").val(), snap.child("order_status").val()];
    ordersTable.rows.add([dataset]).draw();
  });



  angular
    .module("app", ['firebase'])
    .controller("myCtrl", function($scope) {
      $scope.addItem = function () {

        if ($scope.itemID == null || $scope.itemName == null || $scope.itemType == null || $scope.orderStatus == null || $scope.itemQuantity == null || $scope.orderDescription == null) {
          alert('All text fields must be filled out.');
          return;
        }

        var orderID = dbOrders.push().key;
        var data = {
          order_id: orderID,
          order_date: new Date().toJSON().slice(0,10),
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
      $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.orders.splice(x, 1);
      } 
    });



}());
  