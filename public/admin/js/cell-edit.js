var table;
$(document).ready(function () {
    table = $('#orders').DataTable();
    table.MakeCellsEditable({
        "onUpdate": myCallbackFunction,
        "inputCss":'my-input-class',
        "columns": [5],
        "allowNulls": {
            "columns": [5],
            "errorClass": 'error'
        },
        "confirmationButton": { // could also be true
            "confirmCss": 'my-confirm-class',
            "cancelCss": 'my-cancel-class'
        },
        "inputTypes": [
            {
                "column": 5, 
                "type": "list",
                "options":[
                    { "value": "Waiting for Payment", "display": "Waiting for Payment" },
                    { "value": "Processing Order", "display": "Processing Order" },
                    { "value": "Manufacturing Paint", "display": "Manufacturing Paint" },
                    { "value": "Delivering", "display": "Delivering" },
                    { "value": "Completed", "display": "Completed" }
                ]
            }
        ]
    });

});

function myCallbackFunction (updatedCell, updatedRow, oldValue) {
    
    var orderID = updatedRow.data()[0];
    firebase.database().ref().child('orders/' + orderID).update({ order_status: updatedCell.data() });
    console.log("The new value for the cell is: " + updatedCell.data());
    console.log("The old value for that cell was: " + oldValue);
    console.log("The values for each cell in that row are: " + updatedRow.data()[0]);
}

function destroyTable() {
    if ($.fn.DataTable.isDataTable('#myAdvancedTable')) {
        table.destroy();
        table.MakeCellsEditable("destroy");
    }
}