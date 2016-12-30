$(document).ready(function(){
    
    /* Attach events */
    bindClick();
    
    $("#add").click(function(){
    	var choice = $("#tables").val();
        
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
            console.log(tempNext);
            // Don't touch empty ones
            if(present.attr('class') !== 'empty') {
                // Substitute next one with this one
                var tableNumber = String(addColumn) + String(row + 1)
                if((String(addColumn) + String(row + 1)).length === 3)
                    tableNumber = ((Number(tableNumber.charAt(0)) + Number(tableNumber.charAt(1))) * 10) + Number(tableNumber.charAt(3));
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
        // Repopulate dropbox
        dropboxAdd();
    });
    
    $("#remove").click(function(){
    	var choice = $("#tables").val();
        $("#"+choice).html("");
    	$("#"+choice).attr('class', 'empty');
        $("#"+choice).removeAttr('id');
        
        // Repopulate dropbox
        dropboxAdd();
    });
    /* End attach events */
    
    dropboxAdd();
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
       console.log("click");
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
 * Populates the add dropbox
 */
function dropboxAdd() {
    var dropbox = [];
    
    // Clean dropbox first
    $("#tables").html("");
    
    $("td").each(function(){
        var column = String($(this).attr('id')).charAt(0);
        if(column !== "2") {
            if($(this).attr('id') !== undefined)
                dropbox.push($(this).attr('id'));
        }
    });
    
        
    var i;
    dropbox.sort();
    for(i = 0; i < dropbox.length; i++)
        $("#tables").append('<option value="' + dropbox[i] + '">' + dropbox[i] + '</option>');
}