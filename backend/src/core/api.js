const API_CODE = require("../../../api_codes.json").API_CODE;
const { auth, login, signup, logout } = require("../api/auth");
const { logicPostPost } = require("../api/logic");

class API {
  constructor() {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    this.handle = async function (req, res) {
      let type = req.body.type;
      let data = req.body.data;

      switch (type) {
        case API_CODE.AUTH:
          auth({ req, res }, req.cookies.token, true);
          return;
        case API_CODE.LOGIN:
          login({ req, res }, data.usertag, data.password);
          return;
        case API_CODE.SIGNUP:
          signup({ req, res }, data.usertag, data.email, data.password);
          return;
        case API_CODE.LOGOUT:
          logout({ req, res }, req.cookies.token);
          return;
      }

      console.log(type);
      console.log(data);

      const userId = await auth({ req, res }, req.cookies.token, false);
      if (typeof userId === "boolean" && !userId) return;

      switch (type) {
        case API_CODE.POST_POST:
          logicPostPost({ req, res }, userId, data.content);
          return;
      }
    }
  }
}

module.exports = new API();