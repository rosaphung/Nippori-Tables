$(document).ready(function(){
    
    /* Attach events */
    eventListeners();
    /* End attach events */
    
    /* Create display */
    if(localStorage.getItem("tables")) {
        displayTables();
    }
    else {
        localStorage.setItem("tables", JSON.stringify(cleanTable()));
        displayTables();
    }
    /* End create display */
});

/*
 * Return the column requested.
 * @param {int} column
 * @returns {Array|Object|getColumn.tables}
 */
function getColumn(column) {
    var tables = JSON.parse(localStorage.getItem("tables"));
    // Handles 20s and 40s
    switch(column) {
        case 2:
            return tables[0];
        case 4:
            return tables[2];
    }
    return tables[column-1];
}

/*
 * Changes the column at the specified position and redisplays the table.
 * @param {int} column
 * @param {Array} array
 * @returns {undefined}
 */
function setColumn(column, array) {
    if(column <= 3 && column > 0) {
        var tables = JSON.parse(localStorage.getItem("tables"));
        tables[column-1] = array;
        localStorage.setItem("tables", JSON.stringify(tables));
    }
    else {
        alert("An error occured while setting the tables. Code: " + column);
    }
    // Redisplay the tables
    displayTables();
}

/*
 * Cleans the table view, if the param is true, clean the tables in storage too.
 * @param {boolean} clear
 */
function clearTables(clear) {
    var tables = JSON.parse(localStorage.getItem("tables"));
    var i;
    
    for(i = 0; i < tables[0].length; i++) {
        $("#row" + (i + 1)).empty();
    }
    
    if(clear) {
        // row    1 , 2, 3
        tables = [[],[],[]];
        for(i = 0; i < tables.length; i++) {
            var j;
            for(j = 0; j < 10; j++) {
                var table = {};
                var id = ((i + 1) * 10) + ((j + 1));
                switch(id) {
                    case 11:
                    case 21:
                    case 31:
                        table.id = id;
                        break;
                    default:
                        table.id = -1;
                }
                switch(id) {
                    case 23:
                        table.id = id - 1;
                        break;
                    case 25:
                        table.id = id - 2;
                        break;
                    case 27:
                        table.id = id - 3;
                        break;
                }
                tables[i].push(table);
            }
        }
        localStorage.setItem("tables", JSON.stringify(tables));
        displayTables();
    }
}


/*
 * Display the table.
 * @returns {undefined}
 */
function displayTables() {
    var tables = JSON.parse(localStorage.getItem("tables"));
    var i;
    clearTables(false);
    for(i = 0; i < tables.length; i++) {
        var j;
        for(j = 0; j < tables[i].length; j++) {
            var id = tables[i][j].id;
            if(id !== -1) {
                var td = '<td width="50" height="50" id="' + id + '">Table #' + id + '</td>';
                switch(id) {
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                        td = '<td width="50" height="50" id="2' + id + '">Table #' + id + '</td>';
                }
                $("#row" + (j + 1)).append(td);
            }
            else
                $("#row" + (j + 1)).append('<td width="50" height="50" class="empty"></td>');
        }
    }
    bindTDClick();
}


/*
 * Returns a clean selection of tables.
 * @returns {Array|cleanTable.tables}
 */
function cleanTable() {
    //  row       1 , 2, 3
    var tables = [[],[],[]];
    
    var i;
    for(i = 0; i < tables.length; i++) {
        var j;
        for(j = 0; j < 10; j++) {
            var table = {};
            var id = ((i + 1) * 10) + ((j + 1));
            switch(id) {
                case 19:
                case 20:
                case 22:
                case 24:
                case 26:
                case 28:
                case 29:
                case 30:
                    table.id = -1; // -1 for empty
                    break;
                default:
                    table.id = id;
            }
            switch(id) {
                case 23:
                    table.id = id - 1;
                    break;
                case 25:
                    table.id = id - 2;
                    break;
                case 27:
                    table.id = id - 3;
                    break;
            }
            tables[i].push(table);
        }
    }
    
    return tables;
}


/*
 * Binds the click function to tds
 */
function bindTDClick() {
    // Removes previous binds
    $("td").unbind('click');
    // Selecting a table
    $("td").click(function(){
       var table = $(this);
       if(table.attr('class') !== 'empty'){
            if(table.attr('selected') !== 'selected') {
                table.attr('style', 'border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.5), inset 5px 5px 8px rgba(0,0,0,0.5);');
                table.attr('selected', 'true');
            }
            else {
                table.removeAttr('style');
                table.removeAttr('selected');
            }
       }
    });
}


/*
 * Return the last table of the column's id.
 * @param {Array|lastTableOfColumnId.column}}
 * @returns {id} column
 */
function lastTableOfColumnId(column) {
    var i;
    for(i = column.length-1; i >= 0; i--) {
        if(column[i].id !== -1)
            return column[i].id;
    }
    return -1;
}


/*
 * Attach events to buttons.
 */
function eventListeners() {
    $("#add").click(function(){
    	var choice;
        var count = 0;
        var isSecondColumn = false;
    	$("td").each(function(){
            if($(this).attr("selected") === "selected") {
                choice = $(this).attr("id");
                count++;
                if(Number(choice) > 200){
                    isSecondColumn = true;
                }
            }
    	});
    	if(count > 1){
    		alert("You cannot select more than one table to add after.");
    		return;
    	}
    	if(isSecondColumn){
    		alert("Can't add in the second column.");
    		return;
    	}
        
        var column = Number(choice.charAt(0));
        var row = Number(choice.charAt(1));
        // Handles 20s and 40s
        if(column === 2 || column === 4) {
            row+=10;
            column--;
        }
        
        var tables = getColumn(column); 
        
        // Determines last row of column
        var rowOfLastTableOfColumn = String(lastTableOfColumnId(tables));
        // Handles 20s and 40s
        if(rowOfLastTableOfColumn.charAt(0) === 2 || rowOfLastTableOfColumn.charAt(0) === 4)
            rowOfLastTableOfColumn = Number(rowOfLastTableOfColumn).charAt(1) + 10;
        else
            rowOfLastTableOfColumn = Number(rowOfLastTableOfColumn).charAt(1);
        // Add new table into array
        tables.splice(row, 0, {id: Number(choice)+1});
        
        // Shifts the id of each table after the one added.
        var i;
        for(i = row + 1; i <= rowOfLastTableOfColumn; i++) {
            if(tables[i].id !== -1)
                tables[i].id++;
        }
        
        setColumn(column, tables);
    });
    
    $("#remove").click(function(){
    	var choice;
        var choiceList = [];
        
    	var isSecondColumn = false;
    	$("td").each(function(){
    		if($(this).attr("selected") === "selected") {
    			choice = $(this).attr("id");
    			if(Number(choice) > 200){
    				isSecondColumn = true;
    			}
                        else {
                            choiceList.push(choice);
                        }
    		}
    	});
    	if(isSecondColumn){
    		alert("Second column cannot be deleted.");
    		return;
    	}
        
        // Reverses the array in order to handle deletion
        choiceList.reverse();
        
        var i;
        for(i = 0; i < choiceList.length; i++) {
            var column = Number(choiceList[i].charAt(0));
            var row = Number(choiceList[i].charAt(1));
            
            // Handles 20s and 40s
            if(column === 2 || column === 4) {
                row+=10;
                column--;
            }
            var tables = getColumn(column); 
            
            // Determines the last row of the column
            var rowOfLastTableOfColumn = String(lastTableOfColumnId(tables));
            // Handles 20s and 40s
            if(rowOfLastTableOfColumn.charAt(0) === "2" || rowOfLastTableOfColumn.charAt(0) === "4")
                rowOfLastTableOfColumn = Number(String(rowOfLastTableOfColumn).charAt(1)) + 10;
            else
                rowOfLastTableOfColumn = Number(String(rowOfLastTableOfColumn).charAt(1));
            
            // Remove that table
            tables.splice(row - 1, 1);
            // Add an empty at the end
            tables.push({id: -1});

            // Shifts the id of each table after the one deleted.
            var j;
            for(j = row - 1; j < rowOfLastTableOfColumn; j++) {
                if(tables[j].id !== -1)
                    tables[j].id--;
            }
            
            setColumn(column, tables);
        }
    });
    
    $("#clear").click(function(){
        clearTables(true);
    });
    
    $("#reset").click(function(){
       localStorage.clear();
       location.reload();
    });
}