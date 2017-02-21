var sumcols = [2,3,6]; // make subtotals for each of these columns
var l1groupcol = 0;
var l2groupcol = 1;
var data = [
    ["Y","S",10,20,30,40,50,60,70,80,90],
    ["Y","P",11,21,33,44,24,24,70,80,90],
    ["Y","S",12,21,33,43,43,42,43,43,43],
    ["Y","P",13,21,32,32,32,32,37,78,22],
    ["Y","P",12,24,35,36,72,92,87,48,12],
    ["Y","S",14,53,53,15,43,64,64,26,32],
    ["N","P",15,32,43,14,21,32,32,32,32],
    ["N","S",14,24,31,32,32,32,23,43,42],
    ["N","P",17,32,43,24,21,32,43,14,20],
    ["N","S",18,31,43,14,24,34,24,34,20],
    ["N","S",81,21,33,74,84,54,34,55,22],
];

var total = {};

data.forEach(function(row){
    if (total[row[l1groupcol]] === undefined) {
        total[row[l1groupcol]] = {};
    }
    if (total[row[l1groupcol]][row[l2groupcol]] === undefined) {
        total[row[l1groupcol]][row[l2groupcol]] = [];
    }
    sumcols.forEach(function(col){
        if (total[row[l1groupcol]][row[l2groupcol]][col] === undefined) {
            total[row[l1groupcol]][row[l2groupcol]][col] = row[col];
        } else {
            total[row[l1groupcol]][row[l2groupcol]][col] = total[row[l1groupcol]][row[l2groupcol]][col] + row[col];
            
        }
    });
    
});

console.log(total);



    

