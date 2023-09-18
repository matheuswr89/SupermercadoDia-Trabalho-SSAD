/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["cdn.shopify.com"] },
  plugins: ["react-native-reanimated/plugin"],
};

module.exports = nextConfig;
