var myArgs = process.argv.slice(2);
let xlsx = require('json-as-xlsx')
let bank = require("./" + myArgs[0])
let path = __dirname + "/data/" + myArgs[1]

data = bank.parse(path);
console.log(data);
let settings = {
  fileName: 'MySpreadsheet', // Name of the spreadsheet
  extraLength: 3, // A bigger number means that columns will be wider
  writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
}
obj = [{
    sheet: myArgs[0],
    columns: [
        {label: "Date", value: "date"},
        {label: "Content", value: "content"},
        {label: "Amount", value: "amount"},
        {label: "Code", value: "code"},
        {label: "Bank", value: "bank"},
    ],
    content: data
}]
xlsx(obj, settings) // Will download the excel file