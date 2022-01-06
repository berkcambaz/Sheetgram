import { lucid } from "../../libs/lucid";

import { Component_Post } from "../common/post/post";

import { storePost, POST_GETTERS } from "../../stores/post";
import { storeUser, USER_GETTERS } from "../../stores/user";

export const View_Home = lucid.component({
  render: function () {
    return `<div></div>`;
  },
  hooks: {
    connected: function () {
      const posts = storePost.getters[POST_GETTERS.NORMAL];
      for (let i = 0; i < 10; ++i) {
        lucid.render(this.dom, Component_Post, posts[1].postId,
          {
            post: posts[1],
            user: storeUser.getters[USER_GETTERS.GET_USER_BY_ID](posts[1].userId)
          }
        );
      }
    }
  }
});