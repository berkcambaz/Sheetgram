import { lucid } from "../libs/lucid";

import { Component_SubView_Menu } from "./views/subview_menu";
import { Component_SubView_PostCreate } from "./views/subview_postcreate";
import { Component_Icon_Menu } from "./icons/icon_menu";
import { Component_Icon_Pencil } from "./icons/icon_pencil";

import { getViewComponent } from "../core/component_utility";

export const Component_App = lucid.component({
  attributes: function () { return { route: undefined, args: undefined, menu: false }; },
  methods: {
    getRouteName: function () { return this.attributes.route === undefined ? "" : this.attributes.route.name },
    toggleMenu: function () {
      if (lucid.instance(Component_SubView_Menu, "app") === undefined)
        lucid.render(this.dom, Component_SubView_Menu, "app");
      else
        lucid.instance(Component_SubView_Menu, "app").attribute("class", "");
    },
    showPostCreate: function () {
      lucid.render(this.dom, Component_SubView_PostCreate, "app");
    }
  },
  render: function () {
    return `
      <div>
        <div class="app__top" lucid-ref="top">
          <div class="app__top__title">{{methods.getRouteName}}</div>
        </div>
        <div class="app__content" lucid-ref="content"></div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["top"], Component_Icon_Menu, "home", {
        class: "app__top__icon--left",
        onclick: () => { this.methods.toggleMenu() }
      }, { first: true });

      lucid.render(this.refs["top"], Component_Icon_Pencil, "home", {
        class: "app__top__icon--right",
        onclick: () => { this.methods.showPostCreate() }
      });

      this.methods.showPostCreate();
    }
  },
  watch: {
    /**
     * 
     * @param {import("../constants/routes").Route} oldRoute 
     * @param {import("../constants/routes").Route} newRoute 
     */
    route: function (oldRoute, newRoute) {
      if (newRoute.properties.hideMenu) lucid.instance(Component_Icon_Menu, "home").attribute("class", "app__top__icon--left hidden");
      else lucid.instance(Component_Icon_Menu, "home").attribute("class", "app__top__icon--left");

      if (newRoute.properties.showPencil) lucid.instance(Component_Icon_Pencil, "home").attribute("class", "app__top__icon--right");
      else lucid.instance(Component_Icon_Pencil, "home").attribute("class", "app__top__icon--right hidden");

      this.setState(this.state);

      if (oldRoute && oldRoute.name) lucid.remove(getViewComponent(oldRoute.name), 0);
      lucid.render(this.refs["content"], getViewComponent(newRoute.name), 0, { args: this.attributes.args });
    }
  }
});