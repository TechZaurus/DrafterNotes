"use client";

import { PropsWithChildren } from "react";

import ReduxProvider from "./ReduxProvider";

export default function Providers({ children }: PropsWithChildren<any>) {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    );
}