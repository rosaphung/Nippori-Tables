$(document).ready(function(){
    
    /* Attach events */
    bindClick();
    
    $("#add").click(function(){
    	var choice;
        var count=0;
        var isSecondColumn = false;
    	$("td").each(function(){
    		if($(this).attr("selected") === "selected") {
    			choice = $(this).attr("id");
    			count++;
    			console.log(count);
    			if(choice.charAt(0) === "2"){
    				isSecondColumn = true;
    			}
    		}
    	});
    	if(isSecondColumn){
    		alert("Can't add in the second column");
    		return;
    	}
    	if(count > 1){
    		alert("You cannot select more than one");
    		return;
    	}
        
        var row;
        // The row we're at.
        var addRow = Number(String(choice).charAt(1));
        // The column we're at.
        var addColumn = Number(String(choice).charAt(0));
        
        // Grab the element after our choice and the one after that
        var present = $("#row" + (addRow + 1) + " td:nth-child(" + addColumn + ")");
        var next = $("#row" + (addRow + 1 + 1) + " td:nth-child(" + addColumn + ")");
        
        // Start looping after our choice
        for(row = addRow + 1; row < 11; row++) {
            var tempNext = jQuery.extend(true, {}, next);
            // Don't touch empty ones
            if(present.attr('class') !== 'empty') {
                // Substitute next one with this one
                var tableNumber = String(addColumn) + String(row + 1)
                if((String(addColumn) + String(row + 1)).length === 3)
                    tableNumber = ((Number(tableNumber.charAt(0)) + Number(tableNumber.charAt(1))) * 10) + Number(tableNumber.charAt(2));
                present.attr('id', tableNumber);
                present.text("Table #" + tableNumber);
                next.replaceWith(present);
            }
            
            // Pass the present one to the next iteration
            present = jQuery.extend(true, {}, tempNext);
            // Grab the new next one
            next = $("#row" + (row + 1 + 1) + " td:nth-child(" + addColumn + ")");
        }
        
        // Place our new element
        var add ='<td width="50" height="50" id="' + (Number(choice) + 1) +'">Table #' + (Number(choice) + 1) +'</td>';
        // Determines if we have to add to column 1 or 3
        if(addColumn === 1)
            $("#row"+(addRow + 1)).prepend(add);
        else if(addColumn === 3)
            $("#row"+(addRow + 1)).append(add);
        // Bind the click event
        bindClick();
    });
    
    $("#remove").click(function(){
    	var choice;
    	var isSecondColumn = false;
    	$("td").each(function(){
    		if($(this).attr("selected") === "selected") {
    			choice = $(this).attr("id");
    			if(choice.charAt(0) === "2"){
    				isSecondColumn = true;
    			}
    		}
    	});
    	if(isSecondColumn){
    		alert("Second column cannot be deleted");
    		return;
    	}
        $("#"+choice).html("");
    	$("#"+choice).attr('class', 'empty');
        $("#"+choice).removeAttr('id');
        
    });
    /* End attach events */

});

/*
 * Binds the click function to tds
 */
function bindClick() {
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