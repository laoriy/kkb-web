import React from "react";

export const defaultUser = {
    userName: "111",
  };

export const UserContext = React.createContext(defaultUser);

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer