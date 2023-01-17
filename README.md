# Kameleoon + Fastly Compute@Edge Starter Kit

Starter Kit to run Kameleoon Experimentation and Feature Flags on Fastly Compute@Edge service.

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
