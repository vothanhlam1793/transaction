const db = require("../models");
const Note = db.notes;
var nameController = "Note";
// Create and Save a new Tutorial

function createObj (data) {
    var objArray = ['bank', 'content', 'amount', 'date', 'partnerName', 'partnerCode', 'codeCheck'];
    var a = {};
    objArray.forEach(function(e){
        a[e] = data[e];
    });
    return a;
}
// Create and Save a new Tutorial
exports.create = (req, res) => {
    const note = new Note(createObj(req.body));
    note.save(note).then(data=>{
        if(req.body._url){
            res.redirect(req.body._url);
        } else {
            res.send(data);
        }
    }).catch(e=>{
        res.status(500).send({
            message: e.message || "Error cannot create " + nameController
        })
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    conditional = {};
    var objArray = ['bank', 'content', 'amount', 'date', 'partnerName', 'partnerCode', 'codeCheck'];
    objArray.forEach(function(e){
        if(req.query[e]){
            conditional[e] = req.query[e];
        }
    })
    Note.find(conditional).then(data=>{
        res.send(data);
    }).catch(e=>{
        res.status(500).send({
            message: e.message || "Error cannot querry all note"
        })
    })
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    Note.findById(req.params.id).then(data=>{
        res.send(data);
    }).catch(e=>{
        res.status(400).send({
            message: e.message || "Cannot query Note with id " + req.params.id
        })
    })
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Note.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data=>{
        if(data){
            res.send({
                message: "OK"
            });
        } else {
            res.status(400).send({
                message: "Cannot update " + id
            })
        }

    }).catch(e=>{
        res.status(400).send({
            message: e.message || "Cannot find and update " + id
        })
    })
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    console.log("DELETA");
    const id = req.params.id;
    Note.findById(id).then(data=>{
        if(data.protected){
            res.send({
                message: "Cannot delete Model PROTECTED"
            })
        } else {
            Note.findByIdAndRemove(id).then(data=>{
                if(!data){
                    res.status(400).send({
                        message: "Error - not remove"
                    })
                } else {
                    res.send({
                        message: "Ok - success"
                    })
                }
            }).catch(e=>{
                res.status(500).send({
                    message: "Cannot delete id " + id
                })
            })
        }
    })
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};