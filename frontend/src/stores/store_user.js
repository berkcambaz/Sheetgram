import { superpage } from "../libs/superpage";
import { Luckt } from "../libs/luckt";

import { api } from "../core/api";
import API_CODES from "../../../api_codes.json";

const API_CODE = API_CODES.API_CODE;

export const USER_ACTS = {
  AUTH: "AUTH",
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP"
}

export const USER_FUTURES = {
  AUTH: "AUTH",
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP"
}

export const USER_GETTERS = {
  GET_USER_BY_ID: "getuserbyid",
  GET_USER_BY_TAG: "getuserbytag",
}

export const storeUser = new Luckt({
  state: {
    main: undefined,
    users: []
  },
  acts: {
    [USER_ACTS.AUTH]: function (state, res) {
      console.log(res);
      if (!res.err) state.main = res;
    },
    [USER_ACTS.LOGIN]: function (state, res) {
      console.log(res);
      if (!res.err) {
        state.main = res;
        superpage.to("/home");
      }
    },
    [USER_ACTS.SIGNUP]: function (state, res) {
      console.log(res);
      if (!res.err) {
        state.main = res;
        superpage.to("/home");
      }
    }
  },
  futures: {
    [USER_FUTURES.AUTH]: async function (commit) {
      const res = await api(API_CODE.AUTH);
      commit(USER_ACTS.AUTH, res);
    },
    [USER_FUTURES.LOGIN]: async function (commit, usertag, password) {
      const res = await api(API_CODE.LOGIN, { usertag, password });
      commit(USER_ACTS.LOGIN, res);
    },
    [USER_FUTURES.SIGNUP]: async function (commit, usertag, email, password) {
      const res = await api(API_CODE.SIGNUP, { usertag, email, password });
      commit(USER_ACTS.SIGNUP, res);
    }
  },
  getters: {
    [USER_GETTERS.GET_USER_BY_ID]: (state) => (userId) => {
      if (state.main.id === userId) return state.main;
      return state.users.find((user) => user.id === userId);
    },
    [USER_GETTERS.GET_USER_BY_TAG]: (state) => (usertag) => {
      if (state.main.usertag === usertag) return state.main;
      return state.users.find((user) => user.usertag === usertag);
    }
  }
});