/**
 * @typedef {object} StoreProperties
 * @property {any} state
 * @property {Object<string, ActFunction>} acts
 * @property {Object<string, FutureFunction>} futures
 * @property {Object<string, GetterFunction>} getters
 */

/**
 * @callback ActFunction
 * @param {any} state
 * @param {...any} args
 */

/**
 * @callback FutureFunction
 * @param {(act: string, payload: any) => void} commit
 * @param {...any} args
 */

/**
 * @callback GetterFunction
 * @param {any} state
 * @param {Object<string, () => any>} getters
 */

export class Luckt {
  /**
   * 
   * @param {StoreProperties} props 
   */
  constructor(props) {
    this.state = props.state;
    this.getters = {};

    const acts = props.acts;
    const futures = props.futures;

    const watchers = {};

    for (const key in props.getters)
      Object.defineProperty(this.getters, key, { get: () => props.getters[key](this.state, this.getters) });

    /**
     * 
     * @param {string} act 
     * @param  {...any} args 
     */
    this.commit = function (act, ...args) {
      acts[act](this.state, ...args);

      // Dispatch the watchers
      if (watchers[act])
        for (let i = 0; i < watchers[act].length; ++i)
          watchers[act][i]();
    }

    /**
     * 
     * @param {string} future 
     * @param  {...any} args 
     */
    this.promise = function (future, ...args) {
      futures[future](this.commit.bind(this), ...args);
    }

    /**
     * 
     * @param {string} act 
     * @param {() => void} callback 
     * @param {boolean} prepend 
     * @returns 
     */
    this.watch = (act, callback, prepend) => {
      if (!watchers[act]) watchers[act] = [];

      if (prepend) watchers[act].unshift(callback);
      else watchers[act].push(callback);

      return () => {
        const index = watchers[act].indexOf(callback);
        if (index !== -1) watchers[act].splice(index, 1);
      }
    }
  }
}