import { lucid } from "../../libs/lucid";
import { superpage } from "../../libs/superpage";

import { COMPONENT_ICON } from "../common/icon_factory";

export const Component_View_Settings = lucid.component({
  methods: {
    logout: function () {
      superpage.to("/login");
    }
  },
  render: function () {
    return `
      <div class="settings">
        <div class="settings__section">
          <div class="settings__item" lucid-ref="account"><div>Account</div></div>
          <div class="settings__item" lucid-ref="manage_accounts"><div>Manage accounts</div></div>
        </div>
        <div class="settings__section">
          <div class="settings__item" lucid-ref="about"><div>About</div></div>
        </div>
        <div class="settings__section">
          <div class="settings__item" lucid-ref="logout" onclick="{{methods.logout}}"><div>Log out</div></div>
        </div>
      </div>
    `;
  },
  hooks: {
    connected: function () {
      lucid.render(this.refs["account"], COMPONENT_ICON.USER, 0, undefined, { first: true });
      lucid.render(this.refs["manage_accounts"], COMPONENT_ICON.USERS, 0, undefined, { first: true });
      lucid.render(this.refs["about"], COMPONENT_ICON.INFO, 0, undefined, { first: true });
      lucid.render(this.refs["logout"], COMPONENT_ICON.LOGOUT, 0, undefined, { first: true });
    }
  }
});