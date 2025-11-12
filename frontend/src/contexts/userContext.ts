import React from "react";

let user_name: any = "me";
let all_users: any = "";

let updateCallback = (param: any) => {};

export const UserContext = React.createContext({
  getCurrUserName: () => {
    return user_name;
  },

  getAllUsers: () => {
    return all_users;
  },

  updateCurrUserName: (UserName: any) => {
    user_name = UserName;
    updateCallback({});
  },

  setUpdateUserCallback: (callback: any) => {
    updateCallback = callback;
  },
});
