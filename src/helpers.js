import { CacheOverride } from "fastly:cache-override";

const BACKEND_CDN = "kameleooncdn";
const BACKEND_DATA = "kameleoondata";

export async function getConfigDataFile(siteCode, ttl) {
  const dataFileRequest = new Request(
    `https://client-config.kameleoon.com/mobile?siteCode=${siteCode}`
  );

  const cacheOverride = new CacheOverride("override", {
    ttl: ttl,
    swr: 60,
  });

  const fetchedDataFile = await fetch(dataFileRequest, {
    backend: BACKEND_CDN,
    cacheOverride,
  });

  return await fetchedDataFile.text();
}

export function requestDispatcher(url, params) {
  const eventRequest = new Request(url, params);

  return fetch(eventRequest, {
    backend: BACKEND_DATA,
  });
}
