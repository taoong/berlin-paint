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

  var dbOrders = firebase.database().ref().child('orders/');

  var ordersTable = $('#orders').DataTable();

  dbOrders.on("child_added", snap => {
    var dataset = [snap.child("item_id").val(), snap.child("name").val(), snap.child("type").val(), snap.child("order_status").val(), snap.child("completed").val()];
    ordersTable.rows.add([dataset]).draw();
  });

  angular
    .module("app", ['firebase'])
    .controller("myCtrl", function($scope) {
        $scope.addItem = function () {
            $scope.errortext = "";
            if ($scope.orders.indexOf($scope.addMe) == -1) {
                $scope.orders.push([$scope.orderID, $scope.orderName, $scope.orderType, $scope.orderStatus, $scope.orderCompleted]);
            } else {
                $scope.errortext = "The item is already in your shopping list.";
            }
        }
        $scope.removeItem = function (x) {
            $scope.errortext = "";
            $scope.orders.splice(x, 1);
        } 
    });

}());
  