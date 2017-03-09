$(document).ready(function() {
    Object.prototype.getOrCreate = function (prop) {
        if (this[prop] === undefined) {
            this[prop] = {};
        }
        return this[prop];
    };
    
    var table = $('#displayTable').DataTable({
        "columnDefs": [
            { "visible": true, "targets": 2 }
        ],
        "order": [[ 0, 'desc' ],[1,'asc'],[2,'desc']],
        "displayLength": 60,
        "dom": "tr",
        "ordering": false,
        "drawCallback": function ( settings ) {
            var api  = this.api();
            var rows = api.rows( {page:'all'} ).nodes();
            var previous_group = null;
            var l1col = 0; // level 1 grouping column
            var subtotalColumns = [5,6,7,9];
            // Remove the formatting to get integer data for summation
	    var intVal = function ( i ) {
                // if the number has a dollar, comma or dash in it, remov them
	        return typeof i === 'string' ?
		    i.replace(/[\$,\-]/g, '')*1 :
		    typeof i === 'number' ?
		    i : 0;
	    };

            total={};
            api.column(l1col, {page:'all'} ).data().each( function ( group, i ) {
                // get next group
                if (api.row(i+1).data() == undefined ) { // there is no next row
                    next_group = null;
                } else {
                    next_group = api.row(i+1).data()[l1col];
                }
                group_assoc=group.replace(' ',"_");
                var current_group = group;
                if ( next_group !== current_group ) {
                    // last row of l1 group
                    console.log("next_group: ",next_group,"current_group: ",current_group);

                    $(rows).eq( i ).after(
                        '<tr class="group-sales"><td class="text-left" colspan="1">Total Sales for: '+current_group+'</td><td class="text-right group-sales"></td></tr>\
                        <tr class="group-purchases"><td class="text-left" colspan="1">Total Purchases for: '+current_group+'</td><td class="text-right group-purchases"></td></tr>'
                    );

                    
                }
                var currentVal = intVal(api.column(5).data()[i]);

                total.getOrCreate(group_assoc)
                if(typeof total.group_assoc[group_assoc]  != 'undefined'){ // defined
                    total.group_assoc[group_assoc] = total.group_assoc[group_assoc] + currentVal;
                    if (api.column(2) == 'S') {total.group_assoc[group_assoc][sales] = total.group_assoc[group_assoc][sales] + intVal(api.column(5))};
                    if (api.column(2) == 'P') {total.group_assoc[group_assoc][purchases ]= total.group_assoc[group_assoc][purchases]+intVal(api.column(5))};
                    
                }else{
                    total.group_assoc[group_assoc] = currentVal; // not defined
                    if (api.column(2) == 'S') {total.group_assoc[group_assoc][sales] = intVal(api.column(5))};
                    if (api.column(2) == 'P') {total.group_assoc[group_assoc][purchases] = intVal(api.column(5))};
                }
            } );
            var grand_total_sales_row =  api.table().node().insertRow(-1);
            var grand_total_purchases_row =  api.table().node().insertRow(-1);
            var grand_total_sales = grand_total_sales_row.insertCell(-1);
            grand_total_sales.innerHTML = "test";
            console.log("Object: ", Object.keys(total.group_assoc));
            Object.keys(total.group_assoc).forEach(function(key) { 
                console.log("in for, key:", key, "total",total.group_assoc);
                console.log("total:", total);
                console.log("total.group_assoc:", total.group_assoc);
                console.log(total.group_assoc[key][sales]);
                $(".group-sales").html(total.group_assoc[key]);
                $(".group-purchases").html(total.group_assoc[key].purchases);
            });
        }
    } );
} );
