import { lucid } from "../../libs/lucid";

import { Component_Post } from "../common/post/post";

import { storePost, POST_GETTERS } from "../../stores/store_post";
import { storeUser, USER_GETTERS } from "../../stores/store_user";

export const Component_View_Bookmarks = lucid.component({
  render: function () {
    return `<div></div>`;
  },
  hooks: {
    connected: function () {
      const posts = storePost.getters[POST_GETTERS.BOOKMARKED];

      for (let i = 0; i < posts.length; ++i) {
        lucid.render(this.dom, Component_Post, posts[i].postId, {
          post: posts[i],
          user: storeUser.getters[USER_GETTERS.GET_USER_BY_ID](posts[i].userId)
        });
      }
    }
  }
});