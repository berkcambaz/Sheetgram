import { lucid } from "../../libs/lucid";
import { superpage } from "../../libs/superpage";

import { storeUser, USER_FUTURES } from "../../stores/store_user";

export const Component_View_Login = lucid.component({
  methods: {
    login: function () {
      const usertag = this.refs["usertag"].value;
      const password = this.refs["password"].value;
      storeUser.promise(USER_FUTURES.LOGIN, usertag, password);
    },
    gotoSignup: function () {
      superpage.to("/signup");
    }
  },
  render: function () {
    return `
      <div class="login">
        <input class="login input" lucid-ref="usertag" type="text" placeholder="Usertag...">
        <input class="login input" lucid-ref="password" type="password" placeholder="Password...">
        <button class="login button" onclick="{{methods.login}}">Log in</button>
        <div class="login button--text" onclick="{{methods.gotoSignup}}">I don't have an account</div>
      </div>
    `;
  }
});