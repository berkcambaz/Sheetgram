const { query } = require("../core/db");
const STATUS_CODE = require("../../../status_codes.json");
const { postPost } = require("./post");

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {number} userId 
 * @param {string} content 
 */
async function logicPostPost(api, userId, content) {
  const res = await postPost(userId, content);
  api.res.send(res)
}

module.exports = { logicPostPost }