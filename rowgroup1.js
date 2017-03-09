$(document).ready(function() {
    
    var total = {};
    total.getOrCreate = function (prop) {
        if (this[prop] === undefined) {
            this[prop] = {};
        }
        return this[prop];
    };
  
    total.getOrCreate("sales").val = 10;
    total.getOrCreate("sales").val = total.getOrCreate("sales") + 25;

    console.log(total);
    
} );
