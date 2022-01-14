import { lucid } from "../libs/lucid";

import { Component_SubView_Menu } from "./views/subview_menu";
import { Component_SubView_PostCreate } from "./views/subview_postcreate";

import { COMPONENT_ICON } from "./common/icon_factory";

import { getViewComponent } from "../core/component_utility";

export const Component_App = lucid.component({
  attributes: function () { return { route: undefined, args: undefined, hidden: false, menu: false }; },
  methods: {
    getRouteName: function () { return this.attributes.route === undefined ? "" : this.attributes.route.name },
    getClassHidden: function () { return this.attributes.hidden ? "hidden" : ""; },
    toggleMenu: function () {
      if (lucid.instance(Component_SubView_Menu, "app") === undefined)
        lucid.render(this.dom, Component_SubView_Menu, "app");
      else
        lucid.instance(Component_SubView_Menu, "app").attribute("class", "");
    },
    showPostCreate: function () {
      lucid.render(this.refs["content"], Component_SubView_PostCreate, "app");
    }
  },
  render: function () {
    return `
      <div>
        <div class="app__top" lucid-ref="top">
          <div class="app__top__title">{{methods.getRouteName}}</div>
        </div>
        <div class="app__content {{methods.getClassHidden}}" lucid-ref="content"></div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["top"], COMPONENT_ICON.LOGIN, "home", {
        class: "app__top__icon--left hidden"
      }, { first: true });

      lucid.render(this.refs["top"], COMPONENT_ICON.MENU, "home", {
        class: "app__top__icon--left hidden",
        onclick: () => { this.methods.toggleMenu() }
      }, { first: true });

      lucid.render(this.refs["top"], COMPONENT_ICON.PENCIL, "home", {
        class: "app__top__icon--right hidden",
        onclick: () => { this.methods.showPostCreate() }
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
      if (newRoute.properties.showLogin) lucid.instance(COMPONENT_ICON.LOGIN, "home").attribute("class", "app__top__icon--left");
      else lucid.instance(COMPONENT_ICON.LOGIN, "home").attribute("class", "app__top__icon--left hidden");

      if (newRoute.properties.hideMenu) lucid.instance(COMPONENT_ICON.MENU, "home").attribute("class", "app__top__icon--left hidden");
      else lucid.instance(COMPONENT_ICON.MENU, "home").attribute("class", "app__top__icon--left");

      if (newRoute.properties.showPencil) lucid.instance(COMPONENT_ICON.PENCIL, "home").attribute("class", "app__top__icon--right");
      else lucid.instance(COMPONENT_ICON.PENCIL, "home").attribute("class", "app__top__icon--right hidden");

      this.setState(this.state);

      if (oldRoute && oldRoute.name) lucid.remove(getViewComponent(oldRoute.name), 0);
      lucid.render(this.refs["content"], getViewComponent(newRoute.name), 0, { args: this.attributes.args });
    },
    hidden: function () {
      this.setState(this.state);
    }
  }
});