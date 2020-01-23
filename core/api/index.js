
//Web
const express = require('express');
const app = express();
const path = require('path');

app.listen(4000, function () {
  console.log("Server started on port 4000");
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + './index.html'));
});

module.exports = app;