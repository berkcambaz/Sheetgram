import { lucid } from "../../../libs/lucid";
import { superpage } from "../../../libs/superpage";

import { COMPONENT_ICON } from "../icon_factory";

import { storePost, POST_ACTS } from "../../../stores/store_post";

import { clampDate, fullDate } from "../../../core/date_utility";
import { clampNumber } from "../../../core/utility";

export const Component_Post = lucid.component({
  attributes: function () {
    return { user: undefined, post: undefined }
  },
  methods: {
    getLongDate: function () {
      return fullDate(this.attributes.post.date);
    },
    getShortDate: function () {
      return clampDate(this.attributes.post.date);
    },
    getLikeCount: function () {
      return clampNumber(this.attributes.post.likeCount);
    },
    getLikeClass: function () {
      return this.attributes.post.liked ? "post__icon enabled" : "post__icon";
    },
    getBookmarkClass: function () {
      return this.attributes.post.bookmarked ? "post__icon enabled" : "post__icon";
    },
    gotoProfile: function (ev) {
      superpage.to("/user/" + this.attributes.user.usertag);
    },
    like: function () {
      storePost.commit(POST_ACTS.LIKE_POST, this.attributes.post);
      lucid.instance(COMPONENT_ICON.LIKE, this.key).attribute("class", this.methods.getLikeClass());
      this.setState(this);
    },
    bookmark: function () {
      storePost.commit(POST_ACTS.BOOKMARK_POST, this.attributes.post);
      lucid.instance(COMPONENT_ICON.BOOKMARK, this.key).attribute("class", this.methods.getBookmarkClass());
      this.setState(this);
    }
  },
  render: function () {
    return `
      <div class="post">
        <div class="post__top">
          <span class="post__user-info" onclick="{{methods.gotoProfile}}">
            <span class="post__username">{{attributes.user.username}}</span>
            <span class="post__usertag">@{{attributes.user.usertag}}</span>
          </span>
          <span class="post__date" title="{{methods.getLongDate}}">{{methods.getShortDate}}</span>
        </div>
        <div class="post__content">{{attributes.post.content}}</div>
        <div class="post__bottom" lucid-ref="bottom">
          <span class="post__count" title="{{attributes.post.likeCount}} likes">{{methods.getLikeCount}}</span>
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["bottom"], COMPONENT_ICON.LIKE, this.key, { class: this.methods.getLikeClass(), onclick: this.methods.like });
      lucid.render(this.refs["bottom"], COMPONENT_ICON.BOOKMARK, this.key, { class: this.methods.getBookmarkClass(), onclick: this.methods.bookmark });
    }
  }
});