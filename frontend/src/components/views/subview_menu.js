import { lucid } from "../../libs/lucid";
import { superpage } from "../../libs/superpage";

import { COMPONENT_ICON } from "../common/icon_factory";

import { storeUser } from "../../stores/store_user";

import { clampNumber } from "../../core/utility";

export const Component_SubView_Menu = lucid.component({
  attributes: function () { return { class: "", user: storeUser.state.main } },
  methods: {
    transitionend: function (ev) {
      if (this.attributes.class === "transition__slide--left") lucid.remove(this.id, this.key);
    },
    toggleTransition: function (oldClass) {
      switch (oldClass) {
        case "transition__slide--right": this.attributes.class = "transition__slide--left"; break;
        case "transition__slide--left": this.attributes.class = "transition__slide--right"; break;
      }
      this.setState(this);
    },
    getFollowerCount: function () {
      return clampNumber(this.attributes.user.followers);
    },
    getFollowingCount: function () {
      return clampNumber(this.attributes.user.following);
    },
    onkeydown: function (ev) {
      if (ev.code === "Enter") this.methods.search();
    },
    search: function (ev) {
      superpage.to("/user/" + this.refs["searchbar"].value);
      this.methods.toggleTransition(this.attributes.class);
    },
    home: function (ev) {
      superpage.to("/home");
      this.methods.toggleTransition(this.attributes.class);
    },
    profile: function (ev) {
      superpage.to("/user/" + this.attributes.user.usertag);
      this.methods.toggleTransition(this.attributes.class);
    },
    bookmarks: function (ev) {
      superpage.to("/bookmarks");
      this.methods.toggleTransition(this.attributes.class);
    },
    settings: function (ev) {
      superpage.to("/settings");
      this.methods.toggleTransition(this.attributes.class);
    },
    about: function (ev) {
      superpage.to("/about");
      this.methods.toggleTransition(this.attributes.class);
    },
    accounts: function (ev) {
      superpage.to("/accounts");
      this.methods.toggleTransition(this.attributes.class);
    },
    logout: function () {
      // TODO: Log out
      superpage.to("/login");
      this.methods.toggleTransition(this.attributes.class);
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
              <input class="menu__search" lucid-ref="searchbar" type="text" placeholder="Search..." spellcheck="false" autocomplete="false" onkeydown="{{methods.onkeydown}}">
            </div>
          </div>
          <div class="menu__section">
            <div class="menu__item" lucid-ref="home" onclick="{{methods.home}}"><div>Home</div></div>
            <div class="menu__item" lucid-ref="profile" onclick="{{methods.profile}}"><div>Profile</div></div>
            <div class="menu__item" lucid-ref="bookmarks" onclick="{{methods.bookmarks}}"><div>Bookmarks</div></div>
          </div>
          <div class="menu__section">
            <div class="menu__item" lucid-ref="settings" onclick="{{methods.settings}}"><div>Settings</div></div>
            <div class="menu__item" lucid-ref="about" onclick="{{methods.about}}"><div>About</div></div>
          </div>
          <div class="menu__section">
            <div class="menu__item" lucid-ref="accounts" onclick="{{methods.accounts}}"><div>Accounts</div></div>
            <div class="menu__item" lucid-ref="logout" onclick="{{methods.logout}}"><div>Log out</div></div>
          </div>
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["search"], COMPONENT_ICON.SEARCH, "menu", {
        onclick: (ev) => { this.methods.search(ev); }
      }, { first: true });
      lucid.render(this.refs["home"], COMPONENT_ICON.HOME, "menu", undefined, { first: true });
      lucid.render(this.refs["profile"], COMPONENT_ICON.USER, "menu", undefined, { first: true });
      lucid.render(this.refs["bookmarks"], COMPONENT_ICON.BOOKMARKS, "menu", undefined, { first: true });
      lucid.render(this.refs["settings"], COMPONENT_ICON.SETTINGS, "menu", undefined, { first: true });
      lucid.render(this.refs["about"], COMPONENT_ICON.INFO, "menu", undefined, { first: true });
      lucid.render(this.refs["accounts"], COMPONENT_ICON.USERS, "menu", undefined, { first: true });
      lucid.render(this.refs["logout"], COMPONENT_ICON.LOGOUT, "menu", undefined, { first: true });

      setTimeout(() => {
        this.attributes.class = "transition__slide--right";
        this.setState(this);
      }, 1);
    }
  },
  watch: {
    class: function (oldClass, newClass) {
      this.methods.toggleTransition(oldClass);
    }
  }
});