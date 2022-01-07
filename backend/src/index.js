const express = require("express");
const app = express();

app.use(express.static("../../frontend/public"));

app.listen(process.env.PORT || 80);