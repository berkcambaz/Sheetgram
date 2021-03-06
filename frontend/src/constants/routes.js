/**
 * @typedef Route
 * @property {string} path 
 * @property {string} name 
 * @property {RouteProperties} properties
 */

/**
 * @typedef RouteProperties
 * @property {boolean} showPencil
 * @property {boolean} hideBottomBar
 * @property {boolean} forGuests
 */

/**
 * 
 * @param {string} path 
 * @param {string} name 
 * @param {RouteProperties} properties 
 * @returns {Route}
 */
function route(path, name, properties) {
  if (properties === undefined) properties = {};
  return { path, name, properties };
}

export const ROUTES = {
  LOGIN: route("/login", "Log in", { hideBottomBar: true, forGuests: true }),
  SIGNUP: route("/signup", "Sign up", { hideBottomBar: true, forGuests: true }),
  HOME: route("/home", "Home", { showPencil: true }),
  USER: route("/user/([a-z0-9_]+)", "Profile", { showPencil: true }),
  BOOKMARKS: route("/bookmarks", "Bookmarks", { showPencil: true }),
  SETTINGS: route("/settings", "Settings"),
  ABOUT: route("/about", "About"),
  ACCOUNTS: route("/accounts", "Accounts"),
}