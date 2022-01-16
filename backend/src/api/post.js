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

/**
 * 
 * @param {number} userId 
 * @param {number} lastId Can be -1 which indicates we want the fresh posts.
 * @returns 
 */
async function getPostsNormal(userId, lastId) {
  if (typeof userId !== "number" || userId < 0)
    return { err: STATUS_CODE.ERROR.GET_POST_NORMAL_FAIL }
  if (typeof lastId !== "number")
    return { err: STATUS_CODE.ERROR.GET_POST_NORMAL_FAIL }

  const sql = `
    SELECT user.id, user.date, user.name, user.tag, user.bio, user.followers, user.following, post.id, post.date, post.content, post.like_count
    FROM follow
    INNER JOIN post ON (post.user_id = follow.follower_id OR post.user_id = follow.following_id)
    INNER JOIN user ON (user.id = follow.following_id)
    WHERE follow.follower_id = ?
    ORDER BY post.id DESC
    LIMIT 10
  `;

  const res = await query(sql, [userId]);
  console.log(res);
  if (res.err) return { err: STATUS_CODE.ERROR.GET_POST_NORMAL_FAIL }
  else return res.results;
}

module.exports = { postPost, getPostsNormal }