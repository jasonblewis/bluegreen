$(document).ready(function() {
    
    var table = $('#displayTable').DataTable({
        "columnDefs": [
            { "visible": true, "targets": 2 }
        ],
        "order": [[ 0, 'desc' ],[1,'asc'],[2,'desc']],
        "displayLength": 60,
        "drawCallback": function ( settings ) {
            var api  = this.api();
            var rows = api.rows( {page:'all'} ).nodes();
            var last = null;
            var first = null;
            var previous_group = null;
            // Remove the formatting to get integer data for summation
	    var intVal = function ( i ) {
                // if the number has a dollar, comma or dash in it, remov them
	        return typeof i === 'string' ?
		    i.replace(/[\$,\-]/g, '')*1 :
		    typeof i === 'number' ?
		    i : 0;
	    };

            total={};
            total.group_assoc = {};
            
            api.column(0, {page:'all'} ).data().each( function ( group, i ) {
                console.log(api.row(i).data()[0]);
                // get next group
                if (api.row(i+1).data() == undefined ) {
                    next_group = null;
                } else {
                    next_group = api.row(i+1).data()[0];
                }
                console.log("next_group",next_group);
                group_assoc=group.replace(' ',"_");
                var current_group = group;
                if ( next_group !== current_group ) {
                    console.log("next_group: ",next_group,"current_group: ",current_group);

                    $(rows).eq( i ).after(
                        '<tr class="group"><td class="text-left" colspan="5">Total for: '+current_group+'</td><td class="text-right '+group_assoc+'"></td></tr>'
                    );

                    
                }
                var currentVal = intVal(api.column(5).data()[i]);
                if(typeof total.group_assoc[group_assoc]  != 'undefined'){
                    total.group_assoc[group_assoc] = total.group_assoc[group_assoc] + currentVal;
                }else{
                    total.group_assoc[group_assoc] = currentVal;
                }
            } );
            console.log("Object: ", Object.keys(total.group_assoc));
            Object.keys(total.group_assoc).forEach(function(key) { 
                console.log("in for, key:", key, "total",total.group_assoc);
                $("."+key).html(total.group_assoc[key]);
            });
        }
    } );
} );
