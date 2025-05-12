import cookie from "cookie";

// -- Custom Implementation of Kameleoon Visitor Code Manager
//    for Fastly Edge Function
export class FastlyVisitorCodeManager {
  // - Get the visitor code from the Fastly cookies
  getData({ input, key }) {
    return input[key] || null;
  }

  // - Set the visitor code to the Fastly cookies
  setData({
    key,
    visitorCode,
    domain,
    maxAge,
    path,
    output,
  }) {
    const serializedCookie = cookie.serialize(key, visitorCode, {
      maxAge,
      path,
      domain: domain || undefined,
    });

    output.append("Set-Cookie", serializedCookie);
  }
}
