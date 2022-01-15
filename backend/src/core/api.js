const { auth, login, signup } = require("../api/auth");

class API {
  constructor() {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    this.handle = function (req, res) {
      let output = {};
      let type = req.body.type;
      let data = req.body.data;

      switch (type) {
        case "login":
          output = login(data.usertag, data.password);
          break;
        case "signup":
          output = signup(data.usertag, data.email, data.password);
          break;
      }

      res.send(output);
    }
  }
}

module.exports = new API();