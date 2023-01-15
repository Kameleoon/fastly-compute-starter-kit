import { CacheOverride } from "fastly:cache-override";

const BACKEND_CDN = "kameleooncdn";

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