// var t1 = new Date();
// data = parseAcb(__dirname + "/data/reports (2).xlsx");
// console.log("Total:", data.length);
// console.log("Time parse:", ((new Date()).getTime() - t1.getTime())/1000, "s");
// console.log(data[0]);
function parseAcb(path){
    function excelDateToJSDate(excelDate) {
        var date = new Date(Math.round((excelDate - (25567 + 1 + 1)) * 86400 * 1000));
        var converted_date = date.toISOString().split('T')[0];
        return new Date(converted_date);
    }
    var xlsx = require('node-xlsx');
    var obj = xlsx.parse(path); // parses a file    
    data = obj[0].data.filter(function(e){
        if(e.length != 5){
            return false;
        } else {
            if(typeof e[0] == "number"){
                return true;
            }
            return false;
        }
    })
    // console.log(data);
    dataDone = [];
    data.forEach(function(e){
        // console.log(e);
        dataDone.push({
            date: excelDateToJSDate(e[0]),
            code: e[1],
            amount: e[4],
            content: e[2],
            bank: "ACB"
        })
    })
    return dataDone;
}

module.exports.parse = parseAcb;