const db = require("../core/db");
const ERROR = require("../../../error_codes.json").server_error;

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} token 
 */
function auth(api, token) {

}

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} usertag 
 * @param {string} password 
 */
function login(api, usertag, password) {

}

/**
 * 
 * @param {{req: import("express").Request, res: import("express").Response}} api 
 * @param {string} usertag 
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
function signup(api, usertag, email, password) {
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

  db.query(sql, [usertag, usertag, email, password], (err, results, fields) => {
    if (err) {
      switch (err.sqlMessage.split("'")[3]) {
        case "tag":
          api.res.send({ err: ERROR.USERTAG_TAKEN })
          break;
        case "email":
          api.res.send({ err: ERROR.EMAIL_TAKEN })
          break;
      }
    }
    else {
      api.res.send({ success: 1 });
    }
  });
}

module.exports = { auth, login, signup };