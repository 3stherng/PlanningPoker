import React, { ReactNode, useState } from "react";

export interface UserContextType {
  currUserName: string;
  allUsers: any;
  updateCurrUserName: (userName: any) => void;
  setUpdateUserCallback: (callback: any) => void;
}

export const UserContext = React.createContext<UserContextType>({
  currUserName: "",
  allUsers: "",
  updateCurrUserName: () => {},
  setUpdateUserCallback: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user_name, setUserName] = useState("");

  const updateCurrUserName = (userName: any) => {
    setUserName(userName);
  };

  const setUpdateUserCallback = (callback: any) => {
    // No-op: callback system removed to prevent infinite loops
  };

  const value: UserContextType = {
    currUserName: user_name,
    allUsers: "",
    updateCurrUserName,
    setUpdateUserCallback,
  };

  return React.createElement(
    UserContext.Provider,
    { value },
    children
  );
}
