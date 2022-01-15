const { query } = require("../core/db");
const { joinAtrs } = require("../core/utility");
const ERROR = require("../../../error_codes.json").SERVER_ERROR;

async function userById(id, atrs) {
  if (typeof id !== "number" || id < 0);

  const sql = `
    SELECT ${joinAtrs(atrs)} FROM user WHERE id=?
  `;

  const res = await query(sql, [id]);
  return res;
}

async function userByTag(tag, atrs) {
  if (typeof tag !== "string" || tag.length === 0 || tag.length > 32);

  const sql = `
    SELECT ${joinAtrs(atrs)} FROM user WHERE tag=?
  `;

  const res = await query(sql, [tag]);
  return res;
}

async function userAuth(usertag, password) {
  if (typeof usertag !== "string" || usertag.length === 0 || usertag.length > 32);
  if (typeof password !== "string" || password.length === 0 || password.length > 32);

  const sql = `
    SELECT password FROM user WHERE tag=?
  `;

  const res = await query(sql, [usertag]);
}

module.exports = { userById, userByTag };