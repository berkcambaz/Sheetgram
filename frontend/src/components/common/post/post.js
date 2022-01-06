import { lucid } from "../../../libs/lucid";

export const Component_Post = lucid.component({
  render: function () {
    return `
      <div class="post">
        <div class="post__top">
          <span class="post__user-info">
            <span class="post__username">Berk Cambaz</span>
            <span class="post__usertag">@berkcambaz</span>
          </span>
          <span class="post__date">12h</span>
        </div>
        <div class="post__content">hello</div>
        <div class="post__bottom">
          <span class="post__count">123</span>
        </div>
      </div>
    `;
  }
});