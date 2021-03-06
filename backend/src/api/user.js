const bcrypt = require("bcrypt");

const { query } = require("../core/db");
const { joinAtrs } = require("../core/utility");
const STATUS_CODE = require("../../../status_codes.json");

async function userById(id, atrs) {
  if (typeof id !== "number" || id < 0)
    return { err: STATUS_CODE.ERROR.USER_BY_ID_FAIL };

  const sql = `
    SELECT ${joinAtrs(atrs)} FROM user WHERE id=?
  `;

  const res = await query(sql, [id]);
  if (res.err || res.results.length === 0) return { err: STATUS_CODE.ERROR.USER_BY_ID_FAIL };
  return res.results[0];
}

async function userByTag(tag, atrs) {
  if (typeof tag !== "string" || tag.length === 0 || tag.length > 32)
    return { err: STATUS_CODE.ERROR.USER_BY_TAG_FAIL }

  const sql = `
    SELECT ${joinAtrs(atrs)} FROM user WHERE tag=?
  `;

  const res = await query(sql, [tag]);
  if (res.err || res.results.length === 0) return { err: STATUS_CODE.ERROR.USER_BY_TAG_FAIL };
  return res.results[0];
}

async function userAuth(usertag, password) {
  if (typeof usertag !== "string" || usertag.length === 0 || usertag.length > 32)
    return { err: STATUS_CODE.ERROR.USER_AUTH_FAIL }
  if (typeof password !== "string" || password.length === 0 || password.length > 32)
    return { err: STATUS_CODE.ERROR.USER_AUTH_FAIL }

  const sql = `
    SELECT id, password FROM user WHERE tag=?
  `;

  const res = await query(sql, [usertag]);
  if (res.err || res.results.length === 0) return { err: STATUS_CODE.ERROR.USER_AUTH_FAIL };
  return bcrypt.compareSync(password, String.fromCharCode(...res.results[0].password)) ?
    { id: res.results[0].id } : { err: STATUS_CODE.ERROR.USER_AUTH_FAIL };
}

module.exports = { userById, userByTag, userAuth };