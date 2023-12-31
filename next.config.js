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
        "ipfs.io",
        'images.unsplash.com',
        'http://drive.google.com/uc',
        "https://asystentai.infura-ipfs.io",
        "https://storage.googleapis.com"
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