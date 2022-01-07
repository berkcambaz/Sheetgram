const path = require('path')

const express = require("express");
const app = express();

//app.use(express.static("../../frontend/public"));
console.log("test");
app.use('/static', express.static(path.join(__dirname, '../../frontend/public')))

app.listen(process.env.PORT || 80);