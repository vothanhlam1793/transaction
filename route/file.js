var fs = require("fs");
module.exports = app => {
    var router = require("express").Router();
    router.get("/list", function(req, res){
        var path = require('path');
        const directoryPath = path.join(__dirname, '/../data');
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(file); 
            });
            res.render("list", {
                files: files
            });
        });
    });
    var kConfig = ["fromRow", "toRow", "headRow", "brandName", "productNameColumn", "productPriceColumn"];
    router.get("/read/:name/:page", function(req, res){
        console.log("TEST", req.params)
        const fs = require("fs");
        var path = require('path');
        path = __dirname + "/../data/" + req.params.name;
        var xlsx = require('node-xlsx');
        var obj = xlsx.parse(path); // parses a file  
        console.log(req.originalUrl);
        if(req.params.page == undefined){
            req.params.page = 0;
        }
        let jsonData = require('../config/setup.json');
        var config = {}
        console.log(obj[req.params.page].name);
        jsonData.forEach(function(e){
            if((e.nameFile == req.params.name) && (e.nameSheet == obj[req.params.page].name)){
                config = e.config;
            }
        })
        console.log("CONF", config);
        kConfig.forEach(function(key){
            if(config[key] == undefined){
                if(key == "headRow"){
                    config[key] = 0;
                } else {
                    config[key] = "";
                }
            }
        })
        console.log(config);
        res.render("show", {
            obj: obj,
            page: req.params.page,
            url: "/file/" + req.params.name,
            config: config,
            name: req.params.name
        });
    })
    app.use("/file", router);
}