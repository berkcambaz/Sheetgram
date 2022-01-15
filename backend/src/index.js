const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const app = express();

const api = require("./core/api");

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../frontend/public")));
app.post("/api", function (req, res) { api.handle(req, res); });

app.listen(process.env.PORT || 80, () => { console.log("Server has started..."); });