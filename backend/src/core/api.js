class API {
  constructor() {
    this.handle = function (json) {
      console.log(json);

      return json;
    }
  }
}

module.exports = new API();