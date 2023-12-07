"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient();
  //   const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
