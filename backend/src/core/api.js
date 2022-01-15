const API_CODE = require("../../../api_codes.json").API_CODE;
const { auth, login, signup } = require("../api/auth");

class API {
  constructor() {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    this.handle = function (req, res) {
      let type = req.body.type;
      let data = req.body.data;

      switch (type) {
        case API_CODE.AUTH:
          auth({ req, res }, req.cookies.token);
          break;
        case API_CODE.LOGIN:
          login({ req, res }, data.usertag, data.password);
          break;
        case API_CODE.SIGNUP:
          signup({ req, res }, data.usertag, data.email, data.password);
          break;
        default:
          res.send({});
          break;
      }
    }
  }
}

module.exports = new API();