import { lucid } from "../../libs/lucid";
import { superpage } from "../../libs/superpage";

import { storeUser, USER_FUTURES } from "../../stores/store_user";

export const Component_View_Signup = lucid.component({
  methods: {
    signup: function () {
      const usertag = this.refs["usertag"].value;
      const email = this.refs["email"].value;
      const password = this.refs["password"].value;
      storeUser.promise(USER_FUTURES.SIGNUP, usertag, email, password);
    },
    gotoLogin: function () {
      superpage.to("/login");
    }
  },
  render: function () {
    return `
      <div class="signup">
        <input class="signup input" lucid-ref="usertag" type="text" placeholder="Usertag...">
        <input class="signup input" lucid-ref="email" type="email" placeholder="E-mail...">
        <input class="signup input" lucid-ref="password" type="password" placeholder="Password...">
        <button class="signup button" onclick="{{methods.signup}}">Sign up</button>
        <div class="signup button--text" onclick="{{methods.gotoLogin}}">I already have an account</div>
      </div>
    `;
  }
});