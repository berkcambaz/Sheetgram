import { Component_View_Login } from "../components/views/view_login";
import { Component_View_Signup } from "../components/views/view_signup";

import { Component_View_Home } from "../components/views/view_home";
import { Component_View_User } from "../components/views/view_user";
import { Component_View_Bookmarks } from "../components/views/view_bookmarks";
import { Component_View_Settings } from "../components/views/view_settings";
import { Component_View_About } from "../components/views/view_about";
import { Component_View_Accounts } from "../components/views/view_accounts";

import { ROUTES } from "../constants/routes";

export function getViewComponent(view) {
  switch (view) {
    case ROUTES.LOGIN.name: return Component_View_Login;
    case ROUTES.SIGNUP.name: return Component_View_Signup;
    case ROUTES.HOME.name: return Component_View_Home;
    case ROUTES.USER.name: return Component_View_User;
    case ROUTES.BOOKMARKS.name: return Component_View_Bookmarks;
    case ROUTES.SETTINGS.name: return Component_View_Settings;
    case ROUTES.ABOUT.name: return Component_View_About;
    case ROUTES.ACCOUNTS.name: return Component_View_Accounts;
    default: return undefined;
  }
}