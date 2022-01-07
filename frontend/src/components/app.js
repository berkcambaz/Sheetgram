import { lucid } from "../libs/lucid";

import { Component_SubView_Menu } from "./views/subview_menu";
import { Component_Icon_Menu } from "./icons/icon_menu";

import { getViewComponent } from "../core/component_utility";

export const Component_App = lucid.component({
  attributes: function () { return { page: undefined, args: undefined, menu: false }; },
  methods: {
    getPageName: function () { return this.attributes.page === undefined ? "" : this.attributes.page },
    toggleMenu: function () {
      if (lucid.instance(Component_SubView_Menu, "app") === undefined)
        lucid.render(this.dom, Component_SubView_Menu, "app");
      else
        lucid.instance(Component_SubView_Menu, "app").attribute("class", "");
    }
  },
  render: function () {
    return `
      <div>
        <div class="app__top" lucid-ref="top">
          <div class="app__top__title">{{methods.getPageName}}</div>
        </div>
        <div class="app__content" lucid-ref="content"></div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["top"], Component_Icon_Menu, "home", {
        class: "app__top__icon",
        onclick: () => { this.methods.toggleMenu() }
      }, { first: true });
    }
  },
  watch: {
    page: function (oldPage, newPage) {
      this.setState(this.state);

      if (oldPage) lucid.remove(getViewComponent(oldPage), 0);
      lucid.render(this.refs["content"], getViewComponent(newPage), 0, { args: this.attributes.args });
    }
  }
});