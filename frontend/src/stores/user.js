import { Luckt } from "../libs/luckt";

export const USER_GETTERS = {
  GET_USER_BY_ID: "getuserbyid",
  GET_USER_BY_TAG: "getuserbytag",
}

export const storeUser = new Luckt({
  state: {
    main: {
      id: 0,
      usertag: "berkcambaz",
      username: "Berk Cambaz",
      bio: "CMON INGERLAND SCOR SOM FOKIN GOALS",
      date: new Date(),
      followers: 3169420,
      following: 3169420
    },
    users: [
      {
        id: 1,
        usertag: "dorkodu",
        username: "Doruk Dorkodu",
        bio: `vefa'151 · founder & chief @dorkodu · digital craftsman · software, #web3, artwork · high school kid · @doruksdraftbook · veritas vos liberabit`,
        date: new Date(),
        followers: 3169420,
        following: 3169420
      }
    ]
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