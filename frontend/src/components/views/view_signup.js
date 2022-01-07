import { lucid } from "../../libs/lucid";
import { superpage } from "../../libs/superpage";

export const Component_View_Signup = lucid.component({
  methods: {
    signup: function () {
      // TODO: Implement
    },
    gotoLogin: function () {
      superpage.to("/login");
    }
  },
  render: function () {
    return `
      <div class="signup">
        <input class="signup input" type="text" placeholder="Username...">
        <input class="signup input" type="mail" placeholder="E-mail...">
        <input class="signup input" type="password" placeholder="Password...">
        <input class="signup input" type="password" placeholder="Confirm password...">
        <button class="signup button" onclick="{{methods.signup}}">Sign up</button>
        <div class="signup button--text" onclick="{{methods.gotoLogin}}">I already have an account</div>
      </div>
    `;
  }
});