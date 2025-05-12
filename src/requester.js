import { RequestType } from "@kameleoon/nodejs-sdk";
import { CacheOverride } from "fastly:cache-override";

// -- Custom Implementation of Kameleoon Requester
//    for Fastly Edge Function
export class FastlyRequester {
  async sendRequest({ url, parameters, requestType }) {
    if (requestType === RequestType.Configuration) {
      return await configurationRequest(url, parameters, 600)
    }
    return await requestDispatcher(url, parameters);
  }
}

const BACKEND_CDN = "kameleooncdn";
const BACKEND_DATA = "kameleoondata";

// Configuration request with cache override
function configurationRequest(url, params, ttl) {
  const request = new Request(url, params);

  const cacheOverride = new CacheOverride("override", {
    ttl: ttl,
    swr: 60,
  });

  return fetch(request, {
    backend: BACKEND_CDN,
    cacheOverride,
  });
}

// Other requests without cache override
function requestDispatcher(url, params) {
  const eventRequest = new Request(url, params);

  return fetch(eventRequest, {
    backend: BACKEND_DATA,
  });
}
