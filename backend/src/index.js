const api = require("./core/api");

const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const app = express();

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../frontend/public")));

app.post("/api", function (req, res) {
  res.send(api.handle(req.body));
});

app.listen(process.env.PORT || 80);

console.log("Server has started...");