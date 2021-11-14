
// var t1 = new Date();
// data = parseTechcombank(__dirname + "/data/351996471967039579.xls");
// console.log("Total:", data.length);
// console.log("Time parse:", ((new Date()).getTime() - t1.getTime())/1000, "s");
function parseTechcombank(path){
    function excelDateToJSDate(excelDate) {
        var date = new Date(Math.round((excelDate - (25567 + 1 + 1)) * 86400 * 1000));
        var converted_date = date.toISOString().split('T')[0];
        s = converted_date.split("-");
        // return s[2] + "/" + s[1] + "/" + s[0]; 
        return date;
    }
    function parseMoney(a, b){
        if(a==0){
            return b;
        } else {
            return a;
        }
    }
    var xlsx = require('node-xlsx');
    var obj = xlsx.parse(path); // parses a file    
    data = obj[0].data.filter(function(e){
        if(e.length != 6){
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
            code: e[2].split("\\").join(""),
            amount: parseMoney(e[3], e[4]),
            content: e[1],
            bank: "TCB"
        })
    })
    return dataDone;
}

module.exports.parse = parseTechcombank;