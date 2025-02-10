/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  experimental: {
    serverlessTraceTarget: "vercel",
  },
  output: "standalone", // Production build ko optimize karta hai
  images: {
    domains: ["dummyimage.com"],
  },
  experimental: {
    serverlessTraceTarget: "vercel",
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      // In heavy modules ko bundle se exclude kar dein
      config.externals.push("ffmpeg-static");
      config.externals.push("sharp");
    }
    return config;
  },
};

export default nextConfig;
