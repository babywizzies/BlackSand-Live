/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    domains : ['heroesofcumberland.com']
  },
  rewrites: async () => [
    {
      source: "/public/games.html",
      destination: "/pages/api/mygames.js",
    },
  ],
};

module.exports = nextConfig;

