/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET || "415mission",
  },
};

module.exports = nextConfig;
