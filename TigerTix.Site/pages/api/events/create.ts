import { withApiAuthRequired, getSession, getAccessToken } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next"
import type { Event } from "../../../services/events";

const PRODUCTION = "https://events.tigertix.bren.app/";
const DEVELOPMENT = "http://localhost:7291/";


async function createEvent(
    req: NextApiRequest,
    res: NextApiResponse<{}>
) {

    if (req.method != "POST") {
        res.status(400).json({
            "error": "invalid_method",
            "message": "Should be a POST request"
        });
    };

    if (!req.body) {
        res.status(400).json({
            "error": "invalid_request",
            "message": "Request body is missing"
        });
    };

    const session = getSession(req, res);
    if (!session) return;

    const { accessToken } = await getAccessToken(req, res, {
        scopes: ["create:events"]
    });
    const url = process.env.NODE_ENV === "production" ? PRODUCTION : DEVELOPMENT;

    return fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
    }).then(r => r.json());
}


export default withApiAuthRequired(createEvent);