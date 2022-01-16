const { query } = require("../core/db");
const API_CODE = require("../../../api_codes.json").API_CODE;
const STATUS_CODE = require("../../../status_codes.json");
const { postPost, getPostsNormal } = require("./post");

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

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} type
 * @param {number} userId
 * @param {number} lastId
 */
async function logicGetPosts(api, type, userId, lastId) {
  switch (type) {
    case API_CODE.GET_POST_NORMAL:
      api.res.send(await getPostsNormal(userId, -1));
      return;
    case API_CODE.GET_POST_BOOKMARK:
      return;
    case API_CODE.GET_POST_USER:
      return;
  }
}

module.exports = { logicPostPost, logicGetPosts }