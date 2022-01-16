import { Luckt } from "../libs/luckt";

import { api } from "../core/api";
import API_CODES from "../../../api_codes.json";

const API_CODE = API_CODES.API_CODE;

export const POST_ACTS = {
  GET_POSTS: "getposts",

  POST_POST: "postpost",
  LIKE_POST: "likepost",
  BOOKMARK_POST: "bookmarkpost"
}

export const POST_FUTURES = {
  GET_POSTS: "getposts",

  POST_POST: "postpost",
  LIKE_POST: "likepost",
  BOOKMARK_POST: "bookmarkpost"
}

export const POST_GETTERS = {
  NORMAL: "normal",
  BOOKMARKED: "bookmarked",
  USER: "user"
}

export const storePost = new Luckt({
  state: {
    posts: []
  },
  acts: {
    [POST_ACTS.POST_POST]: function (state, res) {
      console.log(res);
      if (!res.err) {
        // Show the post
      }
    },
    [POST_ACTS.LIKE_POST]: function (state, post) {
      post.liked = !post.liked;
      if (post.liked) post.likeCount++;
      else post.likeCount--;
      // TODO: Send to server via sage
    },
    [POST_ACTS.BOOKMARK_POST]: function (state, post) {
      post.bookmarked = !post.bookmarked;
      // TODO: Send to server via sage
    },
  },
  futures: {
    [POST_FUTURES.POST_POST]: async function (commit, content) {
      const res = await api(API_CODE.POST_POST, { content });
      commit(POST_ACTS.POST_POST, res);
    }
  },
  getters: {
    [POST_GETTERS.NORMAL]: function (state) {
      return sortByDate(state.posts);
    },
    [POST_GETTERS.USER]: (state) => (userId) => {
      return sortByDate(filterByUserId(userId, state.posts));
    },
    [POST_GETTERS.BOOKMARKED]: function (state) {
      return sortByDate(filterByBookmarked(state.posts))
    },
  }
});

function filterByUserId(userId, posts) {
  return posts.filter(function (post) {
    return post.userId === userId;
  })
}

function filterByBookmarked(posts) {
  return posts.filter(function (post) {
    return post.bookmarked;
  })
}

function sortByDate(posts) {
  return posts.sort(function (a, b) {
    return b.date - a.date;
  })
}