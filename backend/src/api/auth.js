const bcrypt = require("bcrypt");
const srandom = require("secure-random");

const { query } = require("../core/db");
const STATUS_CODE = require("../../../status_codes.json");
const { userById, userAuth } = require("./user");

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} token 
 * @param {boolean} returnUser Set to true if on success, you want the user object as well.
 * @returns {number} userId if returnUser is set to false.
 */
async function auth(api, token, returnUser) {
  if (!token) {
    api.res.send({ err: STATUS_CODE.ERROR.USER_AUTH_FAIL });
    return false;
  }

  const sql = `
    SELECT user_id FROM session WHERE token=?
  `;

  const res = await query(sql, [token]);
  if (res.err || res.results.length === 0) {
    api.res.clearCookie("token");
    api.res.send({ err: STATUS_CODE.ERROR.USER_AUTH_FAIL });
    return false;
  }

  const userId = res.results[0].user_id;

  if (returnUser) {
    const user = await userById(userId, ["id", "date", "name", "tag", "bio", "followers", "following"]);
    api.res.send(user);
  }

  return userId;
}

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} usertag 
 * @param {string} password 
 */
async function login(api, usertag, password) {
  if (typeof usertag !== "string" || usertag.length === 0 || usertag.length > 32) {
    api.res.send({ err: STATUS_CODE.ERROR.LOGIN_FAIL });
    return;
  }
  if (typeof password !== "string" || password.length === 0 || password.length > 32) {
    api.res.send({ err: STATUS_CODE.ERROR.LOGIN_FAIL });
    return;
  }

  const res = await userAuth(usertag, password);
  if (res.err) {
    api.res.send(res);
  }
  else {
    const user = await userById(res.id, ["id", "date", "name", "tag", "bio", "followers", "following"]);
    await createToken(api, user.id);
    api.res.send(user);
  }
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
    api.res.send({ err: STATUS_CODE.ERROR.SIGNUP_FAIL });
    return;
  }
  if (typeof email !== "string" || email.length === 0 || email.length > 320) {
    api.res.send({ err: STATUS_CODE.ERROR.SIGNUP_FAIL });
    return;
  }
  if (typeof password !== "string" || password.length === 0 || password.length > 32) {
    api.res.send({ err: STATUS_CODE.ERROR.SIGNUP_FAIL });
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
        api.res.send({ err: STATUS_CODE.ERROR.USERTAG_TAKEN });
        return;
      case "email":
        api.res.send({ err: STATUS_CODE.ERROR.EMAIL_TAKEN });
        return;
    }
  }
  else {
    const user = await userById(res.results.insertId, ["id", "date", "name", "tag", "bio", "followers", "following"])
    await createToken(api, user.id);
    api.res.send(user);
  }
}

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} token 
 */
async function logout(api, token) {
  if (!token) {
    api.res.send({ success: STATUS_CODE.SUCCESS.LOGGED_OUT });
    return;
  }

  const sql = `
    DELETE FROM session WHERE token=?
  `;

  const res = await query(sql, [token]);
  api.res.clearCookie("token");
  api.res.send({ success: STATUS_CODE.SUCCESS.LOGGED_OUT });
  return;
}

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {number} userId 
 */
async function createToken(api, userId) {
  const token = String.fromCharCode(...srandom(16, { type: "Uint8Array" }));

  const sql = `
    INSERT INTO session (user_id, token)
    VALUES (?, ?)
  `;

  const res = await query(sql, [userId, token]);
  if (!res.err) api.res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: true });
}

module.exports = { auth, login, signup, logout };