// subtotaling based on group fields
var sumcols = [3,4,6]; // make subtotals for each of these columns
var l1groupcol = 0;
var l2groupcol = 2;
var data = [
    ["Y","ADBDFG","S",10,20,30,40,50,60,70,80,90],
    ["Y","ADBDFG","P",11,21,33,44,24,24,70,80,90],
    ["Y","DDDDDD","S",12,21,33,43,43,42,43,43,43],
    ["Y","DDDDDD","P",13,21,32,32,32,32,37,78,22],
    ["Y","GGGGGG","P",12,24,35,36,72,92,87,48,12],
    ["Y","HHHHHH","S",14,53,53,15,43,64,64,26,32],
    ["N","HHHHHH","P",15,32,43,14,21,32,32,32,32],
    ["N","KKKKKK","S",14,24,31,32,32,32,23,43,42],
    ["N","KKKKKK","P",17,32,43,24,21,32,43,14,20],
    ["N","QQQQQQ","S",18,31,43,14,24,34,24,34,20],
    ["N","WWWWWW","S",81,21,33,74,84,54,34,55,22],
];

var total = {};

data.forEach(function(row){
    if (total[row[l1groupcol]] === undefined) { // check level 1 property is defined
        total[row[l1groupcol]] = {};
    }
    if (total[row[l1groupcol]][row[l2groupcol]] === undefined) { // check level2 array is defined
        total[row[l1groupcol]][row[l2groupcol]] = [];
    }
    sumcols.forEach(function(col){
        if (total[row[l1groupcol]][row[l2groupcol]][col] === undefined) { // check element of l2 array is defined
            total[row[l1groupcol]][row[l2groupcol]][col] = row[col];
        } else {
            total[row[l1groupcol]][row[l2groupcol]][col] = total[row[l1groupcol]][row[l2groupcol]][col] + row[col];
            
        }
    });
    
});



console.log("N.P: ",total["N"]["P"]);
console.log("N.S: ",total["N"]["S"]);
console.log("Y.P: ",total["Y"]["P"]);
console.log("Y.S: ",total["Y"]["S"]);



$(document).ready(function() {
    $('#example').DataTable( {
        dom: "t",
        order: [
            [0,"desc"],
            [1,"asc"],
            [2,"desc"],
        ],
        paging: false,
        data: data,
        columns: [
            { title: "Brand" },
            { title: "S/P" },
            { title: "1/2016" },
            { title: "2/2016" },
            { title: "3/2016" },
            { title: "4/2016" },
            { title: "5/2016" },
            { title: "6/2016" },
            { title: "7/2016" },
            { title: "8/2016" },
            { title: "9/2016" },
        ]
    } );
} );


