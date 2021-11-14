const noteModel = require("../app/models/note.model");
const db = require("../app/models");
const Transaction = db.transactions;
const Note = db.notes;

const fileUpload = require('express-fileupload');
const fs = require("fs");
module.exports = app => {
    app.use(fileUpload());
    var router = require("express").Router();
    router.get("/", (req, res) => {
        Transaction.find({}).then(data => {
            res.render("transaction/show", {
                title: "Transactions",
                data: data
            })
        }).catch(e=>{
            res.render("transaction/show", {
                title: "Transactions",
                data: {
                    message: e.message || "Error cannot querry all"
                }
            })
        })
        
    })
    router.get("/create", (req, res)=>{
        res.render("transaction/create")
    })

    router.get("/create-excel", (req, res)=>{
        var path = require('path');
        const directoryPath = path.join(__dirname, '/../data');
        //passsing directoryPath and callback function
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
            res.render("transaction/create-excel", {
                files: files
            });
        });
    })

    router.get('/accuracy/:id', (req, res)=>{
        Transaction.findById(req.params.id).then(data => {
            Note.find({codeCheck: data.code}).then(notes=>{
                console.log("NOTE", notes);
                res.render("transaction/accuracy", {
                    title: "Accuracy",
                    data: data,
                    message: "",
                    notes: notes
                })
            })
        }).catch(e=>{
            res.render("transaction/accuracy", {
                title: "Accuracy",
                message: e.message || "Error cannot query transaction with " + req.params.id
            })
        })
    })
    router.get('/accuracy/code/:code', (req, res)=>{
        Transaction.find({
            code: req.params.code
        }).then(data => {
            // Kiem tra xem no co bang 1 khong newu khong bang 1 la sai
            if(data.length == 1){
                res.redirect("/view/transactions/accuracy/" + data[0].id);
            } else {
                res.send({
                    message: "Số lượng không phải duy nhất",
                    data: data
                })
            }
            res.send(data);
        }).catch(e=>{
            
        })
    })
    
    router.get("/bank", (req, res)=>{
        Transaction.find({}).distinct("bank", function(e, banks){
            res.render("transaction/banks", {
                title: "Các tài khoản",
                banks: banks
            })
        })
    })

    router.get("/bank/:name", (req, res)=>{
        Transaction.find({
            bank: req.params.name
        }).then(data => {
            res.render("transaction/bank", {
                title: "Giao dịch - " + req.params.name,
                data: data
            })
        }).catch(e => {

        });
    })

    router.post('/file_upload', function (req, res) {
        let sampleFile;
        let uploadPath;
    
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        sampleFile = req.files.file;
        uploadPath = __dirname + '/../data/' + sampleFile.name;
        sampleFile.mv(uploadPath, function(err) {
            if (err)
            return res.status(500).send(err);
            // data = acb.parse(uploadPath);
            res.send("Upload successful");
            // fs.unlinkSync(uploadPath);
        });
    })

    router.get("/parse", async (req, res)=>{
        let bank = require("./../extract/" + req.query.bank)
        let path = __dirname + "/../data/" + req.query.name            
        var data = bank.parse(path);
        // data[0].existed = false;
        for(var i = 0; i < data.length; i ++){
            rs = await Transaction.find({
                bank: data[i].bank,
                code: data[i].code
            });
            if(rs.length > 0){
                data[i].existed = true;
                data[i].counter = rs.length;
            } else {
                data[i].existed = false;
                data[i].counter = rs.length;
            }
        }
        res.render("transaction/parse-excel", {
            data: data
        });
    })

    router.get("/delete", (req, res)=>{
        Transaction.find(req.query).then(data=>{
            res.render("transaction/delete-transaction", {
                data: data
            })
        })
    })

    app.use("/view/transactions", router);
}