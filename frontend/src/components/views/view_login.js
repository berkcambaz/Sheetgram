import { lucid } from "../../libs/lucid";
import { superpage } from "../../libs/superpage";

export const Component_View_Login = lucid.component({
  methods: {
    login: function () {
      // TODO: Implement
    },
    gotoSignup: function () {
      superpage.to("/signup");
    }
  },
  render: function () {
    return `
      <div class="login">
        <input class="login input" type="text" placeholder="Usertag...">
        <input class="login input" type="password" placeholder="Password...">
        <button class="login button" onclick="{{methods.login}}">Log in</button>
        <div class="login button--text" onclick="{{methods.gotoSignup}}">I don't have an account</div>
      </div>
    `;
  }
});