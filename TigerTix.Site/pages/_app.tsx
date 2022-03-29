import "../styles/globals.css";
import "../styles/index.css";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from "next/app";
import Head from "next/head";

// Overwrite base URL for Auth0 with Vercel URL if present (for deployed and preview branches)
// See https://github.com/auth0/nextjs-auth0/issues/383#issuecomment-1026071966
process.env.AUTH0_BASE_URL =
    process.env.AUTH0_BASE_URL || process.env.VERCEL_URL;
if (process.env.VERCEL_ENV === "production") {
    process.env.AUTH0_BASE_URL = "https://tigertix.bren.app";
}

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="application-name" content="TigerTix" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-title" content="TigerTix" />
                <meta name="description" content="Connecting you to the best events on Clemson's Campus!"/>
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="theme-color" content="#E29358" />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/icon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/icon-16x16.png"
                />
                <link rel="manifest" href="/manifest.json" />
                <link rel="shortcut icon" href="/favicon.ico" />
    
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://tigertix.bren.app" />
                <meta name="twitter:title" content="PWA App" />
                <meta
                    name="twitter:description"
                    content="Connecting you to the best events on Clemson's Campus!"
                />
                <meta
                    name="twitter:image"
                    content="https://tigertix.bren.app/icons/icon-192x192.png"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="PWA App" />
                <meta
                    property="og:description"
                    content="Connecting you to the best events on Clemson's Campus!"
                />
                <meta property="og:site_name" content="TigerTix" />
                <meta property="og:url" content="https://tigertix.bren.app" />
                <meta
                    property="og:image"
                    content="https://tigertix.bren.app/icons/icon-192x192x.png"
                />
            </Head>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </>
    );
}

export default App;
