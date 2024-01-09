let express = require('express');
let app = express();
let indexPath = __dirname + "/views/index.html";
let publicPath = __dirname + "/public";
let object = {"message": "Hello json"};

console.log("Hello World");

app.use("/public", express.static(publicPath));

app.get("/", function (req, res) {
    res.sendFile(indexPath);
});

app.get("/json", function (req, res) {
    res.json(object);
});






























module.exports = app;
