import { lucid } from "../../libs/lucid";

import { Component_Post } from "../common/post/post";

export const View_Home = lucid.component({
  render: function () {
    return `<div></div>`;
  },
  hooks: {
    connected: function () {
      lucid.render(this.dom, Component_Post, 0);
    }
  }
});