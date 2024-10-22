/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        canvas: false,
      };
    }
    return config;
  },
  // Add this to handle any runtime errors
  onError: (error, _req, res) => {
    console.error('Server Error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  },
};

export default nextConfig;