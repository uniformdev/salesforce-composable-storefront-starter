# Uniform Enhancer Proxy

Proxies all requests to Uniform to perform composition enhancement using the following integrations:
- Salesforce Commerce Cloud
- Contentful
- Cloudinary

Built on top of Next.js.

## Requirements

- Node 14+
- npm 6.14.4+

## Initial setup

⚠️ Before you get started, make sure you have executed `npm run uniform:push` commands from `.\storefront` folder, see Readme in there for details.

1. Add Uniform-specific env vars in `.env` file (see `.env.example`), it should contain your Uniform project's API key and Project Id:
    ```
    UNIFORM_API_KEY=
    UNIFORM_PROJECT_ID=
    ```

    > Read-only permissions are sufficient here.

1. Add the following environment variables with values specific to your Salesforce B2C Commerce instance:

    ```
    SALESFORCE_COMMERCE_CLOUD_CLIENT_ID=
    SALESFORCE_COMMERCE_CLOUD_CLIENT_SECRET=
    SALESFORCE_COMMERCE_CLOUD_ORG_ID=
    SALESFORCE_COMMERCE_CLOUD_SHORT_CODE=
    SALESFORCE_COMMERCE_CLOUD_SITE_ID=
    SALESFORCE_COMMERCE_CLOUD_EINSTEIN_ID=
    SALESFORCE_COMMERCE_CLOUD_EINSTEIN_SITE_ID=

    ```

1. Optional: if you'd like to activate Contentful as an additional content source, make sure to add the following env variables specific to Contentful: 
    ```
    CONTENTFUL_SPACE_ID=
    CONTENTFUL_ENVIRONMENT=
    CONTENTFUL_CDA_ACCESS_TOKEN=
    CONTENTFUL_CPA_ACCESS_TOKEN=
    ```

1. Run `npm install` to install all the dependencies.

## Working locally

1. `npm run dev`

1. Open the proxy on localhost:3001 and make sure the following paths render:
    - `http://localhost:3001/api/v2/manifest` -> must return a valid manifest JSON from your Uniform project
    - `http://localhost:3001/api/v1/canvas?slug=/` -> must return a valid composition JSON from your Uniform project's Home composition.

## Deployment

The proxy can be deployed to any place that runs Node.js, or Next.js, here are a couple of options:

### Vercel

1. Install Vercel CLI:

    ```bash
    npm i -g vercel
    ```
1. Run this command to deploy the proxy:

    ```bash
    vercel
    ```

> Make sure to add the environment variables to your Vercel site.

### Netlify

1. Install Netlify CLI:

    ```bash
    npm install netlify-cli -g
    ```

1. Run this command to deploy to the Netlify site.

    ```bash
    netlify deploy --build
    ```

    > Make sure to add the environment variables to your Netlify site.
    > You can run `netlify env:import .env` to import your the environment variables from your .env file to your Netlify site.

### Verify the deployment is successful

Open the proxy on localhost:3001 and make sure the following paths render:
- `https://your-deployed-proxy.oncdn/api/v2/manifest` -> must return a valid manifest JSON from your Uniform project
- `https://your-deployed-proxy.oncdn/api/v1/canvas?slug=/` -> must return a valid composition JSON from your Uniform project's Home composition.