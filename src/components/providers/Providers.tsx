"use client";

import React, { FC } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Session } from "next-auth";

import MantineProviderRegistry from "./MantineProviderRegistry";
import ReactQueryProvider from "./ReactQueryProvider";
import UserProvider from "./UserProvider";
import { SafeUser } from "@/types";

interface ProviderProps {
  children: React.ReactNode;
  currentUser: SafeUser | null;
}

const Providers: FC<ProviderProps> = ({ children, currentUser }) => {

  return (
    <UserProvider currentUser={currentUser}>
      <Toaster position="top-right" reverseOrder={false} />
      <MantineProviderRegistry>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </MantineProviderRegistry>
    </UserProvider>
  );
};

export default Providers;
