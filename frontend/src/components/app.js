import { lucid } from "../libs/lucid";

import { Component_SubView_PostCreate } from "./views/subview_postcreate";

import { COMPONENT_ICON } from "./common/icon_factory";

import { getViewComponent, getViewIcon } from "../core/component_utility";
import { superpage } from "../libs/superpage";
import { storeUser } from "../stores/store_user";

export const Component_App = lucid.component({
  attributes: function () { return { route: undefined, args: undefined, menu: false, backCallback: 0 }; },
  methods: {
    getRouteName: function () { return this.attributes.route === undefined ? "" : this.attributes.route.name },
    showPostCreate: function () {
      lucid.render(this.refs["content"], Component_SubView_PostCreate, "app");
    },
    getBottomBarClass: function () {
      if (this.attributes.route)
        return this.attributes.route.properties.hideBottomBar ? "hidden" : "";
    }
  },
  render: function () {
    return `
      <div>
        <div class="app__top" lucid-ref="top">
          <div class="app__top__title">{{methods.getRouteName}}</div>
        </div>
        <div class="app__content" lucid-ref="content"></div>
        <div class="app__bottom {{methods.getBottomBarClass}}" lucid-ref="bottom"></div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["top"], COMPONENT_ICON.ARROW_LEFT, "app", {
        class: "app__top__icon--left hidden",
        onclick: () => { if (this.attributes.backCallback) this.attributes.backCallback(); }
      });
      lucid.render(this.refs["top"], COMPONENT_ICON.PENCIL, "app", {
        class: "app__top__icon--right hidden",
        onclick: () => { this.methods.showPostCreate() }
      });

      lucid.render(this.refs["bottom"], COMPONENT_ICON.HOME, "app", {
        class: "app__bottom__icon",
        onclick: () => { superpage.to("/home"); }
      });

      lucid.render(this.refs["bottom"], COMPONENT_ICON.BOOKMARKS, "app", {
        class: "app__bottom__icon",
        onclick: () => { superpage.to("/bookmarks"); }
      });

      lucid.render(this.refs["bottom"], COMPONENT_ICON.USER, "app", {
        class: "app__bottom__icon",
        onclick: () => { superpage.to("/user/" + storeUser.state.main.usertag); }
      });

      lucid.render(this.refs["bottom"], COMPONENT_ICON.SETTINGS, "app", {
        class: "app__bottom__icon",
        onclick: () => { superpage.to("/settings"); }
      });
    }
  },
  watch: {
    /**
     * 
     * @param {import("../constants/routes").Route} oldRoute 
     * @param {import("../constants/routes").Route} newRoute 
     */
    route: function (oldRoute, newRoute) {
      if (newRoute.properties.showPencil) lucid.instance(COMPONENT_ICON.PENCIL, "app").attribute("class", "app__top__icon--right");
      else lucid.instance(COMPONENT_ICON.PENCIL, "app").attribute("class", "app__top__icon--right hidden");

      this.setState(this.state);

      if (oldRoute && oldRoute.name) {
        lucid.remove(getViewComponent(oldRoute.name), 0);
        const oldIcon = getViewIcon(oldRoute.name);
        if (oldIcon) lucid.instance(oldIcon, "app").attribute("class", "app__bottom__icon");
      }

      lucid.render(this.refs["content"], getViewComponent(newRoute.name), 0, { args: this.attributes.args });
      const newIcon = getViewIcon(newRoute.name);
      if (newIcon) lucid.instance(newIcon, "app").attribute("class", "app__bottom__icon enabled");
    },
    backCallback: function () {
      lucid.instance(COMPONENT_ICON.ARROW_LEFT, "app")
        .attribute("class", "app__top__icon--left " + this.attributes.backCallback ? "" : "disabled");
    }
  }
});

fetch(window.location.origin + "/api", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "SIGNUP", data: {
      usertag: "berkcambazzzzzz", email: "berkcambaz12321@gmail.commmmmm", password: "123456fark7"
    }
  })
})
  .then(res => res.json())
  .then(data => { console.log(data); })