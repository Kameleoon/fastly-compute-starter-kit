/// <reference types="@fastly/js-compute" />
import { getConfigDataFile } from "./helpers";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  // Fetch config file from Kameleoon CDN and cache it using Fastly for given number of seconds
  const configDataFile = await getConfigDataFile("<YOUR_SITE_CODE>", 600);
  const parsedConfigDataFile = JSON.parse(configDataFile);

  return new Response(
    "Welcome to Kameleoon Starter Kit, use 'fastly log-tail' command for results",
    { status: 200 }
  );
}
