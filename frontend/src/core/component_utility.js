import { Component_View_Bookmarks } from "../components/views/view_bookmarks";
import { Component_View_Home } from "../components/views/view_home";
import { Component_View_User } from "../components/views/view_user";

import { ROUTES } from "../constants/routes";

export function getViewComponent(view) {
  switch (view) {
    case ROUTES.HOME.name: return Component_View_Home;
    case ROUTES.USER.name: return Component_View_User;
    case ROUTES.BOOKMARKS.name: return Component_View_Bookmarks;
    default: return undefined;
  }
}