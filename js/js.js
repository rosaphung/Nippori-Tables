$(document).ready(function(){
    
    /* Selecting a table */
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
    
    $("#add").click(function(){
    	var choice = $("#tables").val();
        
        var row;
        // The row we're at.
        var addRow = Number(String(choice).charAt(1));
        // The column we're at.
        var addColumn = Number(String(choice).charAt(0));
        for(row = addRow + 1; row < 10; row++) {
            var present = $("#row" + row + ":nth-child(" + addColumn + ")");
            var next = $("#row"+( row + 1 ) +":nth-child(" + addColumn + ")");
            // This will fail if the row does not exist.
            console.log((String(addColumn)+String(row)));
            next.replaceWith(present);
        }
        $("#"+choice).replaceWith('<td width="50" height="50" id="' + (Number(choice) + 1) +'">Table #' + (Number(choice) + 1) +'</td>');
    });
    
    $("#remove").click(function(){
    	var choice = $("#tables").val();
    	$("#"+choice).remove();
    });
    
});