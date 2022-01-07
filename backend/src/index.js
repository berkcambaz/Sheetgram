const path = require("path")

const express = require("express");
const app = express();

app.use("/", express.static(path.join(__dirname, "../../frontend/public")));

app.post("/api", function (req, res) {

});

app.listen(process.env.PORT || 80);

console.log("Server has started...");