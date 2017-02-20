$(document).ready(function() {
    
    var table = $('#displayTable').DataTable({
        "columnDefs": [
            { "visible": true, "targets": 2 }
        ],
        "order": [[ 0, 'desc' ]],
        "displayLength": 25,
        "drawCallback": function ( settings ) {
            var api  = this.api();
            var rows = api.rows( {page:'all'} ).nodes();
            var last = null;
            
            // Remove the formatting to get integer data for summation
	    var intVal = function ( i ) {
	        return typeof i === 'string' ?
		    i.replace(/[\$,\-]/g, '')*1 :
		    typeof i === 'number' ?
		    i : 0;
	    };
            total=[];
            
            api.column(0, {page:'all'} ).data().each( function ( group, i ) {
                group_assoc=group.replace(' ',"_");
                console.log(total);
                var currentVal = intVal(api.column(4).data()[i]);
                console.log(api.column(4).data()[i]||0);
                console.log("currentVal:",currentVal);
                if(typeof total[group_assoc] != 'undefined'){
                    total[group_assoc]=total[group_assoc]+currentVal;
                }else{
                    total[group_assoc]=currentVal;
                }
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr class="group"><td class="text-left" colspan="4">'+group+'</td><td class="text-right '+group_assoc+'"></td></tr>'
                    );
                    
                    last = group;
                }
            } );
            for(var key in total) {
                $("."+key).html(total[key]);
            }
        }
    } );
    
    
} );
