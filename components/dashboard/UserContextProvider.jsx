"use client";

import { createContext, useContext } from "react";

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export default function UserContextProvider({ user, children }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
