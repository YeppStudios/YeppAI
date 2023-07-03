/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Add the eventsource polyfill for the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        eventsource: 'eventsource-polyfill',
      };
    }
    return config;
  },
  swcMinify: true,
    images: {
      domains: [
        "gateway.pinatas.cloud",
        'drive.google.com',
        'images.unsplash.com',
        "https://asystentai.infura-ipfs.io"
      ],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  };
module.exports = nextConfig;