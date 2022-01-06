import { Luckt } from "../libs/luckt";

export const POST_ACTS = {
  POST_POST: "postpost",
  LIKE_POST: "likepost",
  BOOKMARK_POST: "bookmarkpost"
}

export const POST_FUTURES = {
  GET_POSTS: "getposts"
}

export const POST_GETTERS = {
  NORMAL: "normal",
  BOOKMARKED: "bookmarked",
  USER: "user"
}

export const storePost = new Luckt({
  state: {
    posts: [
      {
        userId: 0,
        postId: 0,
        date: new Date(),
        content: "Hello, world!",
        likeCount: 9631,
        liked: true,
        bookmarked: true
      },
      {
        userId: 1,
        postId: 1,
        date: new Date(),
        content: "bir otodidakt olarak, okul sistemiyle olan savaşımdan vazgeçiyorum. bundan sonra felsefe, ekonomi, bilgisayar bilimi, sanat gibi konular dışında anlamsız bir çaba göstermeyeceğim.",
        likeCount: 3169,
        liked: true,
        bookmarked: true
      }
    ]
  },
  acts: {
    [POST_ACTS.POST_POST]: function (state, content) {
      // TODO: Send to server via sage
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
    [POST_FUTURES.GET_POSTS]: function (commit) {
      // TODO: Send to server via sage
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