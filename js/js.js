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
    	$("#"+choice).after('<td width="50" height="50" id="21">Table #100</td>')
    	
    })
    
    $("#remove").click(function(){
    	var choice = $("#tables").val();
    	$("#"+choice).remove()
    })
    
});