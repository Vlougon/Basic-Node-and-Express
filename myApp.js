require('dotenv').config();
const bodyParser = require('body-parser');

let express = require('express');
let app = express();
let indexPath = __dirname + "/views/index.html";
let publicPath = __dirname + "/public";
let object = { "message": "Hello json" };

console.log("Hello World");

// MIDDLEWARE
app.use("/public", express.static(publicPath));
app.use(function (req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.sendFile(indexPath);
});

app.get("/json", function (req, res) {
    let messageStyle = process.env.MESSAGE_STYLE;

    if (messageStyle === "uppercase") {
        object.message = object.message.toUpperCase();
    }

    res.json(object);
});

app.get("/now", function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.json({ time: req.time });
});

app.get("/:word/echo", function (req, res) {
    const word = req.params.word;
    res.json({ echo: word });
});

app.route("/name").get(function (req, res) {
    const firstName = req.query.first;
    const lastName = req.query.last;

    res.json({ name: firstName + " " + lastName });

}).post(function (req, res) {
    const firstName = req.body.first;
    const lastName = req.body.last;

    res.json({ name: firstName + " " + lastName });
});











module.exports = app;
