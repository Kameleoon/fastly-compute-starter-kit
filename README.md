# Kameleoon + Fastly Compute@Edge Starter Kit

> Starter Kit to run Kameleoon Experimentation and Feature Flags on [Fastly Compute@Edge service](https://www.fastly.com/products/edge-compute).

This Kameleoon Starter Kit for Fastly Compute@Edge uses and extends our [Kameleoon JS SDK](https://developers.kameleoon.com/javascript-sdk.html) to provide experimentation and feature flagging on the edge. Without this starter kit, the JS SDK cannot be used with Fasty. For more information on how to run Feature Flags and Experiments with our platform follow the steps outlined in our documentation [here](https://developers.kameleoon.com/javascript-sdk.html).

### External Network Calls via Fastly

Kameleoon Starter Kit uses fetch API which comes from Fastly Compute@Edge instead of standard network APIs. That's why JS SDK accepts this fetch API callback on client initialization to override the standard API. Note that, fetch API should be passed always along with `configDataFile` to the `KameleoonClient`.

### Configuration Data File

The `configDataFile` is a JSON representation of feature flags and experiments. It contains all the data needed to deliver and track your flag deliveries and experiments. This file is fetched outside of JS SDK in starter kit using Fastly Compute@Edge fetch API. Thus, it is cached on Fastly with custom `ttl` in seconds.

## How to use

### Before Get started

These steps should be completed before you get started:

1. Have an account in Fastly. If you don't have it please go to [fastly registration page](https://www.fastly.com/signup) and register. For additional information go Compute@Edge [documentation](https://developer.fastly.com/learning/compute).
2. Install [Fastly CLI](https://developer.fastly.com/learning/tools/cli).
3. Have an account in Kameleoon.

### Get started

1. Create a folder and inside this folder initialize Fastly Compute@Edge service using [Fastly CLI](https://developer.fastly.com/reference/cli).

```sh
fastly compute init --from https://github.com/Kameleoon/fastly-compute-starter-kit
```

2. Follow the steps, fill up service name, description and other information. Add your `service_id` to `fastly.toml` file. If you don't have an existing service, new service will be created.

3. Install modules

```sh
npm install
```

4. Build and deploy:

```sh
fastly compute publish
```

5. Monitor logs:

```sh
fastly log-tails
```

## Additional resources

- [Fastly Compute@Edge Documentation](https://docs.fastly.com/products/compute-at-edge)
- [JavaScript on Compute@Edge](https://developer.fastly.com/learning/compute/javascript)
- [Kameleoon JS SDK Documentation](https://developers.kameleoon.com/javascript-sdk.html)
