import { lucid } from "../../libs/lucid";

import { Component_Icon_Bookmark } from "../icons/icon_bookmark";
import { Component_Icon_User } from "../icons/icon_user";

import { storeUser } from "../../stores/store_user";

import { clampNumber } from "../../core/utility";

export const Component_SubView_Menu = lucid.component({
  attributes: function () { return { class: "", user: storeUser.state.main } },
  methods: {
    transitionend: function () {
      if (this.attributes.class === "transition__slide--left") lucid.remove(this.id, this.key);
    },
    getFollowerCount: function () {
      return clampNumber(this.attributes.user.followers);
    },
    getFollowingCount: function () {
      return clampNumber(this.attributes.user.following);
    }
  },
  render: function () {
    return `
      <div class="menu">
        <div class="menu__container transition__slide {{attributes.class}}" ontransitionend="{{methods.transitionend}}">
          <div class="menu__section">
            <div class="menu__username">{{attributes.user.username}}</div>
            <div class="menu__usertag">@{{attributes.user.usertag}}</div>
            <div>
              <div class="menu__followers" title="{{attributes.user.followers}} followers">Followers {{methods.getFollowerCount}}</div>
              <div class="menu__following" title="{{attributes.user.following}} following">Following {{methods.getFollowingCount}}</div>
            </div>
          </div>
          <div class="menu__section">
            <div class="menu__item" lucid-ref="search">Search...</div>
          </div>
          <div class="menu__section">
            <div class="menu__item" lucid-ref="profile"><div>Profile</div></div>
            <div class="menu__item" lucid-ref="bookmarks"><div>Bookmarks</div></div>
          </div>
          <div class="menu__section">
            <div class="menu__item" lucid-ref="settings">Settings</div>
            <div class="menu__item" lucid-ref="about">About</div>
          </div>
          <div class="menu__section">
            <div class="menu__item" lucid-ref="accounts">Accounts</div>
            <div class="menu__item" lucid-ref="logout">Log out</div>
          </div>
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["profile"], Component_Icon_User, "menu", undefined, { first: true });
      lucid.render(this.refs["bookmarks"], Component_Icon_Bookmark, "menu", undefined, { first: true });

      setTimeout(() => {
        this.attributes.class = "transition__slide--right";
        this.setState();
      }, 1);
    }
  },
  watch: {
    class: function (oldClass, newClass) {
      switch (oldClass) {
        case "transition__slide--right": this.attributes.class = "transition__slide--left"; break;
        case "transition__slide--left": this.attributes.class = "transition__slide--right"; break;
      }
      this.setState();
    }
  }
});