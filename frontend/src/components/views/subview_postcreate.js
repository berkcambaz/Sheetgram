import { lucid } from "../../libs/lucid";

import { detectClick } from "../../core/utility";

export const Component_SubView_PostCreate = lucid.component({
  state: function () { return { removeListener: undefined } },
  render: function () {
    return `
      <div>
        <div class="effect--blur"></div>
        <div class="post-create" lucid-ref="post-create">
          hello world
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      setTimeout(() => {
        this.state.removeListener = detectClick(this.refs["post-create"],
          (ev) => {

          },
          (ev) => {
            this.state.removeListener();
            lucid.remove(Component_SubView_PostCreate, this.key);
          }
        );
      }, 1);
    }
  }
});