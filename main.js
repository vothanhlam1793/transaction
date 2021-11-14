const express = require("express");
const cors = require("cors");
var logger = require('morgan')
const fs = require("fs");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(logger('dev'));
app.use(cors(corsOptions));
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs')
app.use(express.static('public'))


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
});

// simple route
app.get("/", (req, res) => {
    res.render("index", {
        title: "Tài chính - 0.1"
    });
});

require("./route/file")(app);
require("./route/view-transaction")(app);
require("./route/view-note")(app);
require("./app/routes/transaction.route")(app);
require("./app/routes/note.route")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});