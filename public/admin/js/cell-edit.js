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
                    { "value": "Processing Order", "display": "Processing Order" },
                    { "value": "Manufacturing Paint", "display": "Manufacturing Paint" },
                    { "value": "Delivering", "display": "Delivering" },
                    { "value": "Completed", "display": "Completed" }
                ]
            }
             // Nothing specified for column 3 so it will default to text
            
        ]
    });

});

function myCallbackFunction (updatedCell, updatedRow, oldValue) {
    var ref = firebase.database().ref().child('orders');
    console.log("The new value for the cell is: " + updatedCell.data());
    console.log("The old value for that cell was: " + oldValue);
    console.log("The values for each cell in that row are: " + updatedRow.data());
}

function destroyTable() {
    if ($.fn.DataTable.isDataTable('#myAdvancedTable')) {
        table.destroy();
        table.MakeCellsEditable("destroy");
    }
}