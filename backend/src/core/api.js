class API {
  constructor() {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    this.handle = function (req, res) {
      console.log(req.body);
      res.send(req.body);
    }
  }
}

module.exports = new API();