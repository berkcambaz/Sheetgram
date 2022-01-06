import { lucid } from "../libs/lucid";

import { getViewComponent, getViewIcon } from "../core/component_utility";

export const Component_App = lucid.component({
  attributes: function () { return { page: undefined, args: undefined }; },
  render: function () {
    return `
      <div>
        <div class="app__top" lucid-ref="top">
          <div class="app__top__title">Sheetgram</div>
        </div>
        <div class="app__content" lucid-ref="content"></div>
        <div class="app__bottom" lucid-ref="bottom"></div>
      </div>
    `;
  },
  watch: {
    page: function (oldPage, newPage) {
      if (oldPage) {
        lucid.remove(getViewComponent(oldPage), 0);
        //const oldViewIcon = getViewIcon(oldPage);
        //if (oldViewIcon) lucid.instance(oldViewIcon, "app").attribute("class", "app__bottom__icon");
      }
      lucid.render(this.refs["content"], getViewComponent(newPage), 0, { args: this.attributes.args });
      //const newViewIcon = getViewIcon(newPage);
      //if (newViewIcon) lucid.instance(newViewIcon, "app").attribute("class", "app__bottom__icon enabled");
    }
  }
});