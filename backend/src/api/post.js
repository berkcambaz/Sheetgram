const { query } = require("../core/db");
const STATUS_CODE = require("../../../status_codes.json");

async function postPost(userId, content) {
  if (typeof userId !== "number" || userId < 0)
    return { err: STATUS_CODE.ERROR.POST_SHARE_FAIL }
  if (typeof content !== "string" || content.length === 0 || content.length > 256)
    return { err: STATUS_CODE.ERROR.POST_SHARE_FAIL }

  const sql = `
    INSERT INTO post (user_id, date, content, like_count)
    VALUES (?, UNIX_TIMESTAMP(), ?, 0)
  `;

  const res = await query(sql, [userId, content]);
  if (res.err) { return { err: STATUS_CODE.ERROR.POST_SHARE_FAIL } }
  else return { success: STATUS_CODE.SUCCESS.POST_POSTED }
}

module.exports = { postPost }