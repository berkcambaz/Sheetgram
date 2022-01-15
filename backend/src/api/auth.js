const bcrypt = require("bcrypt");

const { db, query } = require("../core/db");
const ERROR = require("../../../error_codes.json").ERROR;
const { userById, userAuth } = require("./user");

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} token 
 */
async function auth(api, token) {
  if (!token) {
    api.res.send({ err: ERROR.USER_AUTH_FAIL });
    return;
  }

  const sql = `
    SELECT user_id FROM session WHERE token=?
  `;

  const res = await query(sql, [token]);
  if (res.err) {
    api.res.send({ err: ERROR.USER_AUTH_FAIL });
    api.res.clearCookie("token");
    return;
  }
  const userId = res.results[0].user_id;
  const user = await userById(userId, ["id", "date", "name", "tag", "bio", "followers", "following"]);
  api.res.send(user);
}

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} usertag 
 * @param {string} password 
 */
async function login(api, usertag, password) {
  if (typeof usertag !== "string" || usertag.length === 0 || usertag.length > 32) {
    api.res.send({ err: ERROR.LOGIN_FAIL });
    return;
  }
  if (typeof password !== "string" || password.length === 0 || password.length > 32) {
    api.res.send({ err: ERROR.LOGIN_FAIL });
    return;
  }

  const res = await userAuth(usertag, password);
  if (res.err) api.res.send(res);
  else api.res.send(await userById(res.id, ["id", "date", "name", "tag", "bio", "followers", "following"]))
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
  if (typeof usertag !== "string" || usertag.length === 0 || usertag.length > 32) {
    api.res.send({ err: ERROR.SIGNUP_FAIL });
    return;
  }
  if (typeof email !== "string" || email.length === 0 || email.length > 320) {
    api.res.send({ err: ERROR.SIGNUP_FAIL });
    return;
  }
  if (typeof password !== "string" || password.length === 0 || password.length > 32) {
    api.res.send({ err: ERROR.SIGNUP_FAIL });
    return;
  }

  const sql = `
    INSERT INTO user (date, name, tag, email, password, bio, followers, following)
    VALUES (UNIX_TIMESTAMP(), ?, ?, ?, ?, "", 0, 0)
  `;

  const res = await query(sql, [usertag, usertag, email, bcrypt.hashSync(password, 10)]);
  if (res.err) {
    switch (res.err.sqlMessage.split("'")[3]) {
      case "tag":
        api.res.send({ err: ERROR.USERTAG_TAKEN });
        return;
      case "email":
        api.res.send({ err: ERROR.EMAIL_TAKEN });
        return;
    }
  }
  else {
    const user = await userById(res.results.insertId, ["id", "date", "name", "tag", "bio", "followers", "following"])
    api.res.send(user);
  }
}

module.exports = { auth, login, signup };