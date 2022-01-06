import { lucid } from "../libs/lucid";

import { getViewComponent } from "../core/component_utility";

import { Component_Icon_Menu } from "./icons/icon_menu";
import { Component_Effect_Blur } from "./common/blur/blur";

export const Component_App = lucid.component({
  attributes: function () { return { page: undefined, args: undefined }; },
  methods: {
    getPageName: function () { return this.attributes.page === undefined ? "" : this.attributes.page },
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
        onclick: () => { }
      }, { first: true })

      lucid.render(this.refs["content"], Component_Effect_Blur, 0)
    }
  },
  watch: {
    page: function (oldPage, newPage) {
      this.setState();

      if (oldPage) lucid.remove(getViewComponent(oldPage), 0);
      lucid.render(this.refs["content"], getViewComponent(newPage), 0, { args: this.attributes.args });
    }
  }
});