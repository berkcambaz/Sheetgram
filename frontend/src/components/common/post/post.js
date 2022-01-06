import { lucid } from "../../../libs/lucid";

import { Component_Icon_Like } from "../../icons/like";
import { Component_Icon_Bookmark } from "../../icons/bookmark";

export const Component_Post = lucid.component({
  attributes: function () {
    return {
      user: {},
      post: {
        liked: false,
        bookmarked: false
      }
    }
  },
  methods: {
    getLikeClass: function () {
      return this.attributes.post.liked ? "post__icon enabled" : "post__icon";
    },
    getBookmarkClass: function () {
      return this.attributes.post.bookmarked ? "post__icon enabled" : "post__icon";
    },
    gotoProfile: function () {

    },
    like: function () {
      this.attributes.post.liked = !this.attributes.post.liked;
      lucid.instance(Component_Icon_Like, this.key).attribute("class", this.methods.getLikeClass());
      this.setState();
    },
    bookmark: function () {
      lucid.instance(Component_Icon_Bookmark, this.key).attribute("class", this.methods.getBookmarkClass());
      this.setState();
    }
  },
  render: function () {
    return `
      <div class="post">
        <div class="post__top">
          <span class="post__user-info">
            <span class="post__username">Berk Cambaz</span>
            <span class="post__usertag">@berkcambaz</span>
          </span>
          <span class="post__date">12h</span>
        </div>
        <div class="post__content">hello</div>
        <div class="post__bottom" lucid-ref="bottom">
          <span class="post__count">123</span>
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["bottom"], Component_Icon_Like, this.key, { class: this.methods.getLikeClass(), onclick: this.methods.like });
      lucid.render(this.refs["bottom"], Component_Icon_Bookmark, this.key, { class: this.methods.getBookmarkClass(), onclick: this.methods.bookmark });
    }
  }
});