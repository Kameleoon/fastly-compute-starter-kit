import 'abortcontroller-polyfill';
import { KameleoonClient } from "@kameleoon/nodejs-sdk";
import { FastlyEventSource } from "./eventSource";
import { FastlyRequester } from "./requester";
import { FastlyVisitorCodeManager } from "./visitorCodeManager";
import cookie from "cookie";

// Get your siteCode from Kameleoon Platform
const siteCode = "SITE_CODE";
const featureKey = "FEATURE_FLAG_KEY";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
    // Create a new Kameleoon client instance
    const kameleoonClient = new KameleoonClient({
        siteCode: siteCode,
        credentials: {
            clientId: 'my_client_id',
            clientSecret: 'my_client_secret',
        },
        externals: {
            visitorCodeManager: new FastlyVisitorCodeManager(),
            eventSource: new FastlyEventSource(),
            requester: new FastlyRequester(),
        },
    });

    // Parse cookies from the request for retrieving the visitor code
    const cookies = cookie.parse(event.request.headers.get("Cookie") || "");

    // Create a new Headers object to set the response headers and cookies
    let headers = new Headers();
    headers.set("Content-Type", "text/plain");

    // Fetch user id from the cookie if available to make sure that results are sticky.
    // and set the cookie if not available.
    const visitorCode = kameleoonClient.getVisitorCode({
        input: cookies,
        output: headers,
    });
    console.log(`Visitor code: ${visitorCode}`);

    // Initialize the client before using the methods
    await kameleoonClient.initialize();

    // Use kameleoonClient instance to access SDK methods
    // You can refer to our developers documentation to find out more about methods
    const variation = kameleoonClient.getVariation({
        visitorCode,
        featureKey,
        track: false,
    });
    console.log(`The variationKey is ${variation.key}`);

    return new Response(
        "Welcome to Kameleoon Starter Kit, use 'fastly log-tail' command for results",
        { status: 200, headers }
    );
}
