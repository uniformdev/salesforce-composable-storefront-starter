# Composable Storefront for Salesforce B2C Commerce powered by Uniform

## Demo

- Check out the pre-deployed demo [here](https://sfcsf-production.mobify-storefront.com/).
- Check out the personalized page based on the inbound campaign [here](https://sfcsf-production.mobify-storefront.com/?utm_campaign=2023).

## Requirements ⚠️
-   node 14 (required by the Storefront).
-   npm 6.14.4+

## Pre-requisites

1. Uniform project created, sign up for free [here](https://uniform.app/?signup=true&utm_source=sfcsf).
1. Install and configure the Salesforce B2C Commerce integration for your project as described [here](https://docs.uniform.app/integrations/commerce/salesforce-b2c-commerce/add-uniform-integration).
1. Salesforce B2C Commerce instance with connection details.
1. Managed Runtime access, login [here](https://runtime.commercecloud.com/login).

## About this repo
This repo consists of two parts:

1. Storefront: the retail web app under `./storefront`
     It is based on [Salesforce Progressive Web App (PWA) Kit](https://github.com/SalesforceCommerceCloud/pwa-kit), with Uniform additions enabling visual in-context editing, sourcing marketing content from a headless CMS and edge-side personalization.

2. Uniform Proxy found under `./uniform-proxy` is a Next.js app that proxies all requests to Uniform to perform composition enhancement using the following integrations:
    - Salesforce Commerce Cloud
    - Contentful
    - Cloudinary

## Initial Setup

1. `cd .\storefront` and create `.env` file based on `.env.example`. You will need two environment variables for your Uniform project.
    ```
    UNIFORM_API_KEY=
    UNIFORM_PROJECT_ID=
    ```

    ⚠️ You must ensure the Uniform API key has "Developer" role assigned, which grants full access, so you can write to your Uniform project.

1. Run the `npm run uniform:push` command from `.\storefront` folder.
    
    > This command will push required content from `.\storefront\content` into your Uniform project.

    ⚠️ At this moment, your project requires more components than are allowed on the free tier, but if you don't have a paid account, no problem, let us know at hi@uniform.dev and we will enable your team with the right trial.

## Running locally

1. Setup your Uniform proxy as described [here](./uniform-proxy/README.md#working-locally)

1.  Update the `host` value of the storefront proxy in this file `.\storefront\config\default.js` from the following default value:

    ```json
    {
        host: 'sfcsfproxy.uniform.app',
        path: 'uniform'
    }
    ```

    to your localhost:3001 and add `protocol: "http"` if you are not running on HTTPS.

    ```json
    {
        host: 'localhost:3001',
        path: 'uniform',
        protocol: "http",
    }
    ```

    > Learn more about proxying requests [here](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/proxying-requests.html).

1. `cd .\storefront`
1. `npm install` and try opening the site on http://localhost:3000
1. `npm start`
    > If the start command times out, make sure you are running Node.js version 14. It is known to not work on newer versions of Node.js. Run `node -v` if you are not sure.

## Deployment

1. First, deploy Uniform proxy as described [here](./uniform-proxy/README.md#deployment)

1. Make sure to update the `host` value [this line](/storefront/config/default.js#L73) from the default value to a different `host` of your deployed Uniform proxy, for example:

    ```json
    {
        host: 'your-deployed-proxy.vercel.app',
        path: 'uniform',
        protocol: "https",
    }
    ```

1. Add this proxy to Proxy Configs in Managed Runtime:
    - Path: `uniform`
    - Protocol: `https`
    - Host: `sfcsfproxy.uniform.app`

1. Then you can deploy the Storefront as described in [this documentation](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/pushing-and-deploying-bundles.html?q=push).