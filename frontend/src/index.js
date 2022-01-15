import { lucid } from "./libs/lucid";
import { superpage } from "./libs/superpage";

import "./index.scss";

import { Component_App } from "./components/app";

import { ROUTES } from "./constants/routes";

import { storeUser, USER_ACTS, USER_FUTURES } from "./stores/store_user";

/// REMOVE \\\
superpage.redirect("/", "/home");
/// REMOVE \\\

superpage.fallback(function () { console.log("Route was not found."); });

superpage.route(ROUTES.LOGIN.path, function () {
  lucid.instance(Component_App, 0).attribute("route", ROUTES.LOGIN);
});

superpage.route(ROUTES.SIGNUP.path, function () {
  lucid.instance(Component_App, 0).attribute("route", ROUTES.SIGNUP);
});

superpage.route(ROUTES.HOME.path, function () {
  lucid.instance(Component_App, 0).attribute("route", ROUTES.HOME);
});

superpage.route(ROUTES.USER.path, function (usertag) {
  lucid.instance(Component_App, 0).attribute("args", usertag);
  lucid.instance(Component_App, 0).attribute("route", ROUTES.USER);
});

superpage.route(ROUTES.BOOKMARKS.path, function () {
  lucid.instance(Component_App, 0).attribute("route", ROUTES.BOOKMARKS);
});

superpage.route(ROUTES.SETTINGS.path, function () {
  lucid.instance(Component_App, 0).attribute("route", ROUTES.SETTINGS);
});

superpage.route(ROUTES.ABOUT.path, function () {
  lucid.instance(Component_App, 0).attribute("route", ROUTES.ABOUT);
});

superpage.route(ROUTES.ACCOUNTS.path, function () {
  lucid.instance(Component_App, 0).attribute("route", ROUTES.ACCOUNTS);
});

const removeListener = storeUser.watch(USER_ACTS.AUTH, () => {
  superpage.run("hash", function () {
    if (!storeUser.state.main) superpage.to("/login");
    lucid.render(document.getElementById("app"), Component_App, 0);
  });

  removeListener();
});
storeUser.promise(USER_FUTURES.AUTH);