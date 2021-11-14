
var t1 = new Date();
data = parseNamabank(__dirname + "/data/Thông tin giao dịch (3).xlsx");
console.log("Total:", data.length);
console.log("Time parse:", ((new Date()).getTime() - t1.getTime())/1000, "s");
function parseNamabank(path){
    function transDate(d){
        var obj = d.split("/");
        var str = obj[2] + "-" + obj[1] + "-" + obj[0];
        return new Date(str);
    }
    function parseMoney(d){
        return parseInt(d.split(".").join(""));
    
    }
    var xlsx = require('node-xlsx');
    var obj = xlsx.parse(path); // parses a file    
    // console.log(obj[0])
    data = obj[0].data.filter(function(e){
        if(e.length != 6){
            return false;
        } else {
            try {
                if(e[0].length == 10){
                    return true;
                }
            } catch (e) {
                return false;
            }
        }
    })
    // console.log(data);
    dataDone = [];
    data.forEach(function(e){
        // console.log(e);
        dataDone.push({
            date: transDate(e[0]),
            code: e[1],
            amount: parseMoney(e[3]),
            content: e[2],
            bank: "NAB"
        })
    })
    return dataDone;
}