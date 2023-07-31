"use client";

import { SafeUser } from "@/types";
import React, { FC, createContext, useContext, useState} from "react";

interface UserContextType {
  currentUser : SafeUser | null;
}

interface UserProviderProps {
  currentUser : SafeUser | null;
  children : React.ReactNode;
}

const UserContext = createContext<UserContextType>(null!);

const UserProvider : FC<UserProviderProps> = ({children, currentUser}) => {

  return (
    <UserContext.Provider value={{currentUser}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);

export default UserProvider;