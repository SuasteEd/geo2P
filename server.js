const express = require("express");
const path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "javascript")));
app.use(express.static(path.join(__dirname, "style")));
app.use(express.static(path.join(__dirname, "node_modules/ol")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "javascript")));
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/map.html"));
  });

app.listen(3001);