import { handleAuth } from "@auth0/nextjs-auth0";

// Overwrite base URL for Auth0 with Vercel URL if present (for deployed and preview branches)
// See https://github.com/auth0/nextjs-auth0/issues/383#issuecomment-1026071966
process.env.AUTH0_BASE_URL = process.env.AUTH0_BASE_URL || process.env.VERCEL_URL;
if (process.env.VERCEL_ENV === "production") {
    process.env.AUTH0_BASE_URL = "https://tigertix.bren.app";
};

export default handleAuth();