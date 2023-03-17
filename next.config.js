/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    transpilePackages: ["@reservoir0x/reservoir-kit-ui", "react-tooltip"],
  },
};

module.exports = nextConfig;
