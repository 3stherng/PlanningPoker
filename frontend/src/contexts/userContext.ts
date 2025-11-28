import React, { ReactNode, useState, useEffect } from "react";

export interface UserContextType {
  currUserName: string;
  allUsers: any;
  updateCurrUserName: (userName: string) => void;
  setUpdateUserCallback: (callback: any) => void;
  logout: () => void;
}

export const UserContext = React.createContext<UserContextType>({
  currUserName: "",
  allUsers: "",
  updateCurrUserName: () => {},
  setUpdateUserCallback: () => {},
  logout: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user_name, setUserName] = useState<string>("");

  // Load cached user on mount
  useEffect(() => {
    const cachedUser = localStorage.getItem("currUser");
    if (cachedUser) {
      setUserName(cachedUser);
    }
  }, []);

  const updateCurrUserName = (userName: string) => {
    setUserName(userName);
    localStorage.setItem("currUser", userName);
  };

  const setUpdateUserCallback = (callback: any) => {
    // No-op
  };

  const logout = () => {
    setUserName("");
    localStorage.removeItem("currUser");
  };

  const value: UserContextType = {
    currUserName: user_name,
    allUsers: "",
    updateCurrUserName,
    setUpdateUserCallback,
    logout,
  };

  // ✅ In .ts files, return via React.createElement instead of JSX
  return React.createElement(UserContext.Provider, { value }, children);
}
