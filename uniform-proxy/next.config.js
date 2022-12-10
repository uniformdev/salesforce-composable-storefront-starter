/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    upstreamHost: process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app",
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET || "415mission",
  },
};

module.exports = nextConfig;
