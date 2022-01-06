class Superpage {
  constructor() {
    this.use = undefined;
    let routes = [];
    let redirects = {};
    let fallback = undefined;

    /**
     * 
     * @param {"hash" | "history"} use 
     * @param {() => void} callback 
     */
    this.run = function (use, callback) {
      this.use = use;

      if (callback) callback();

      // If router works with hash, add a hashchange listener
      if (this.use === "hash")
        window.addEventListener("hashchange", () => { this.to() });

      this.to();
    }

    /**
     * 
     * @param {string} [url] Target url, if no url is specified, depending on the use of the router, hash or pathname will be used.
     * @returns 
     */
    this.to = function (url) {
      switch (this.use) {
        case "hash":
          if (!url) {
            url = "/" + window.location.hash.substr(1);
          } else {
            window.location.hash = url.substr(1);
            return;
          }
          break;
        case "history":
          if (!url) {
            url = window.location.pathname;

            if (url.length > 1 && url.lastIndexOf("/") === url.length - 1)
              url = url.substr(0, url.length - 1);
          } else {
            window.history.replaceState(null, null, url);
          }
          break;
      }

      // If a redirect for the url is present, redirect to the new url
      const redirect = redirects[url];
      if (redirect) {
        if (this.use === "hash") {
          window.location.hash = redirect.substr(1);
          return;
        } else {
          url = redirect;
          window.history.replaceState(null, null, url);
        }
      }

      // Match the url with the routes
      let matched = false;
      for (let i = 0; i < routes.length; ++i) {
        const match = url.match(routes[i].pattern);
        if (match) {
          routes[i].callback(...match.slice(1));
          matched = true;
          return;
        }
      }

      // If there is no match, run the fallback function if exists
      if (!matched && fallback) {
        fallback();
      }
    }

    /**
     * 
     * @param {string} pattern 
     * @param {() => void} callback 
     */
    this.route = function (pattern, callback) {
      routes.push({
        pattern: new RegExp("^" + pattern + "$", "i"),
        callback: callback
      });
    }

    /**
     * 
     * @param {string} from 
     * @param {string} to 
     */
    this.redirect = function (from, to) {
      redirects[from] = to;
    }

    /**
     * 
     * @param {() => void} callback 
     */
    this.fallback = function (callback) {
      fallback = callback;
    }
  }
}

export const superpage = new Superpage();