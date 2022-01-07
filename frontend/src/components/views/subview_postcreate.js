import { lucid } from "../../libs/lucid";

export const Component_SubView_PostCreate = lucid.component({
  render: function () {
    return `
      <div class="post-create effect--blur">
        <div class="post-create__container">
          hello world
        </div>
      </div>
    `;
  }
});