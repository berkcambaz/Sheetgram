const { db, query } = require("../core/db");
const ERROR = require("../../../error_codes.json").SERVER_ERROR;
const { userById } = require("./user");

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} token 
 */
async function auth(api, token) {

}

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} usertag 
 * @param {string} password 
 */
async function login(api, usertag, password) {
  if (typeof usertag !== "string" || usertag.length === 0 || usertag.length > 32)
    return { err: ERROR.SIGNUP_FAIL };
  if (typeof password !== "string" || password.length === 0 || password.length > 32)
    return { err: ERROR.SIGNUP_FAIL };

  const sql = `
    SELECT FROM user WHERE tag=? AND password=?
  `;

  const res = await query(sql, [usertag, password]);
}

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} usertag 
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
async function signup(api, usertag, email, password) {
  if (typeof usertag !== "string" || usertag.length === 0 || usertag.length > 32)
    return { err: ERROR.SIGNUP_FAIL };
  if (typeof email !== "string" || email.length === 0 || email.length > 320)
    return { err: ERROR.SIGNUP_FAIL };
  if (typeof password !== "string" || password.length === 0 || password.length > 32)
    return { err: ERROR.SIGNUP_FAIL };

  const sql = `
    INSERT INTO user (date, name, tag, email, password, bio, followers, following)
    VALUES (UNIX_TIMESTAMP(), ?, ?, ?, ?, "", 0, 0)
  `;

  const res = query(sql, [usertag, usertag, email, password]);
  if (res.err) {
    switch (res.err.sqlMessage.split("'")[3]) {
      case "tag":
        api.res.send({ err: ERROR.USERTAG_TAKEN })
        break;
      case "email":
        api.res.send({ err: ERROR.EMAIL_TAKEN })
        break;
    }
  }
  else {
    const user = userById(api, res.results.insertId, ["id", "date", "name", "tag", "bio", "followers", "following"])
    api.res.send(user.results[0]);
  }
}

module.exports = { auth, login, signup };