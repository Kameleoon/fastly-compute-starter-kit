/// <reference types="@fastly/js-compute" />
import { KameleoonClient } from "kameleoon-client-javascript";
import { getConfigDataFile } from "./helpers";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  // Fetch config file from Kameleoon CDN and cache it using Fastly for given number of seconds
  // Get the siteCode from Kameleoon Platform
  const configDataFile = await getConfigDataFile("<YOUR_SITE_CODE>", 600);
  const parsedConfigDataFile = JSON.parse(configDataFile);

  // Initialize the KameleoonClient
  const kameleoonClient = new KameleoonClient(
    // Get the siteCode from Kameleoon Platform
    "<YOUR_SITE_CODE>",
    // Add configurations if needed. For example {environment: production}
    {},
    /***
     * @param configDataFile - Fetched and cached configDataFile from cdn
     * @param fetchCallback - Fetch API which is used in our sdk to fetch data and perform a data tracking and it should be passed always along with configDataFile
     */
    { configDataFile: parsedConfigDataFile, fetchCallback: fetch }
  );

  // Use kameleoonClient instance to access SDK methods
  const variationKey = kameleoonClient.getFeatureVariationKey(
    "<YOUR_VISITOR_CODE>",
    "<YOUR_FEATURE_KEY>"
  );

  console.log(`The variationKey is ${variationKey}`);

  return new Response(
    "Welcome to Kameleoon Starter Kit, use 'fastly log-tail' command for results",
    { status: 200 }
  );
}
