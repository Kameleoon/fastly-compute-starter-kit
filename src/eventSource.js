// -- Custom Implementation of Kameleoon Event Source
//    for Fastly Edge Function
export class FastlyEventSource {
  // - Fastly Edge Functions do not support Server Sent Events (SSE)
  //   If you see this error - make sure that your project (siteCode) doesn't have Real Time Updates
  //   option enabled on the Kameleoon Platform
  open() {
    throw new Error(
      "Real Time Updates are not supported in Fastly Edge Worker"
    );
  }

  close() {}
}
