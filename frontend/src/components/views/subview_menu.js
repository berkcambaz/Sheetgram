import { lucid } from "../../libs/lucid";
import { superpage } from "../../libs/superpage";

import { Component_Icon_Search } from "../icons/icon_search";
import { Component_Icon_Bookmark } from "../icons/icon_bookmark";
import { Component_Icon_User } from "../icons/icon_user";
import { Component_Icon_Users } from "../icons/icon_users";
import { Component_Icon_Settings } from "../icons/icon_settings";
import { Component_Icon_Info } from "../icons/icon_info";
import { Component_Icon_Logout } from "../icons/icon_logout";

import { storeUser } from "../../stores/store_user";

import { clampNumber } from "../../core/utility";

export const Component_SubView_Menu = lucid.component({
  attributes: function () { return { class: "", user: storeUser.state.main } },
  methods: {
    transitionend: function (ev) {
      if (this.attributes.class === "transition__slide--left") lucid.remove(this.id, this.key);
    },
    getFollowerCount: function () {
      return clampNumber(this.attributes.user.followers);
    },
    getFollowingCount: function () {
      return clampNumber(this.attributes.user.following);
    },
    search: function (ev) {
      superpage.to("/user/" + this.refs["searchbar"].value);
    },
    profile: function (ev) {
      superpage.to("/user/" + this.attributes.user.usertag);
    },
    bookmarks: function (ev) {
      superpage.to("/bookmarks");
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
            <div class="menu__item" lucid-ref="search">
              <input class="menu__search" lucid-ref="searchbar" type="text" placeholder="Search..." spellcheck="false" autocomplete="false">
            </div>
          </div>
          <div class="menu__section">
            <div class="menu__item" lucid-ref="profile" onclick="{{methods.profile}}"><div>Profile</div></div>
            <div class="menu__item" lucid-ref="bookmarks" onclick="{{methods.bookmarks}}"><div>Bookmarks</div></div>
          </div>
          <div class="menu__section">
            <div class="menu__item" lucid-ref="settings"><div>Settings</div></div>
            <div class="menu__item" lucid-ref="about"><div>About</div></div>
          </div>
          <div class="menu__section">
            <div class="menu__item" lucid-ref="accounts"><div>Accounts</div></div>
            <div class="menu__item" lucid-ref="logout"><div>Log out</div></div>
          </div>
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["search"], Component_Icon_Search, "menu", {
        onclick: (ev) => { this.methods.search(ev); }
      }, { first: true });
      lucid.render(this.refs["profile"], Component_Icon_User, "menu", undefined, { first: true });
      lucid.render(this.refs["bookmarks"], Component_Icon_Bookmark, "menu", undefined, { first: true });
      lucid.render(this.refs["settings"], Component_Icon_Settings, "menu", undefined, { first: true });
      lucid.render(this.refs["about"], Component_Icon_Info, "menu", undefined, { first: true });
      lucid.render(this.refs["accounts"], Component_Icon_Users, "menu", undefined, { first: true });
      lucid.render(this.refs["logout"], Component_Icon_Logout, "menu", undefined, { first: true });

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