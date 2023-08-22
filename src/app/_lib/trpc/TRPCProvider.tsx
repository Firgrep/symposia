"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import SuperJSON from "superjson";
import { env } from "process";

import { apiClientside } from "./trpcClientside";
import { getBaseUrl } from "@/utils/utils";

/**
 * Provider for tRPC calls for React client-side components. Makes use of Tanstack React Query for its operation.
 * @example This should be added to the app top-level /app/layout.tsx
 */
export default function TRPCProvider({ children }: {children: React.ReactNode }) {
    const baseUrl = `${getBaseUrl()}/api/trpc`;
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() =>
        apiClientside.createClient({
            links: [
                httpBatchLink({
                    url: baseUrl,
                }),
            ],
            transformer: SuperJSON,
        })
    );
    return(
        <apiClientside.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </apiClientside.Provider>
    )
}