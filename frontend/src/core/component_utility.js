import { View_Home } from "../components/views/home";

import { ROUTES } from "../constants/routes";

export function getViewComponent(view) {
  switch (view) {
    case ROUTES.HOME.name: return View_Home;
    default: return undefined;
  }
}

export function getViewIcon(view) {
  switch (view) {
    default: return undefined;
  }
}