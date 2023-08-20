"use client";

import React, { FC } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

interface ProviderProps {
  children: React.ReactNode;
}

if (process.env.NODE_ENV === "production") disableReactDevTools();

const queryClient = new QueryClient();

const ReactQueryProvider: FC<ProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
