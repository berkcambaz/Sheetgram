import { lucid } from "./libs/lucid";
import { superpage } from "./libs/superpage";

import "./index.scss";

import { Component_App } from "./components/app";

import { ROUTES } from "./constants/routes";

/// REMOVE \\\
superpage.redirect("/", "/home");
/// REMOVE \\\

superpage.fallback(function () { console.log("Route was not found."); });

superpage.route(ROUTES.LOGIN.path, function () {
  lucid.instance(Component_App, 0).attribute("page", ROUTES.LOGIN.name);
});

superpage.route(ROUTES.SIGNUP.path, function () {
  lucid.instance(Component_App, 0).attribute("page", ROUTES.SIGNUP.name);
});

superpage.route(ROUTES.HOME.path, function () {
  lucid.instance(Component_App, 0).attribute("page", ROUTES.HOME.name);
});

superpage.route(ROUTES.USER.path, function (usertag) {
  lucid.instance(Component_App, 0).attribute("args", usertag);
  lucid.instance(Component_App, 0).attribute("page", ROUTES.USER.name);
});

superpage.route(ROUTES.BOOKMARKS.path, function () {
  lucid.instance(Component_App, 0).attribute("page", ROUTES.BOOKMARKS.name);
});

superpage.run("hash", function () {
  lucid.render(document.getElementById("app"), Component_App, 0);
});