import "../styles/globals.css";
import "../styles/index.css";
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';

// Overwrite base URL for Auth0 with Vercel URL if present (for deployed and preview branches)
// See https://github.com/auth0/nextjs-auth0/issues/383#issuecomment-1026071966
process.env.AUTH0_BASE_URL = process.env.AUTH0_BASE_URL || process.env.VERCEL_URL;
if (process.env.VERCEL_ENV === "production") {
    process.env.AUTH0_BASE_URL = "https://tigertix.bren.app";
};

// Allow self signed certificates IN DEVELOPMENT
if (process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
};


import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    )
    
}

export default MyApp;
