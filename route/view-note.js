const noteModel = require("../app/models/note.model");
const db = require("../app/models");
const Transaction = db.transactions;
const Note = db.notes;
module.exports = app => {
    var router = require("express").Router();
    router.get("/", (req, res) => {
        Note.find({}).then(data => {
            res.render("note/show", {
                title: "Notes",
                data: data
            })
        }).catch(e=>{
            res.render("note/show", {
                title: "Notes",
                data: {
                    message: e.message || "Error cannot querry all"
                }
            })
        })
        
    })

    app.use("/view/notes", router);
}