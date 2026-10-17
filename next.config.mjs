/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Old URLs keep working
  async redirects() {
    return [
      { source: "/learn", destination: "/docs", permanent: true },
      { source: "/learn/:path*", destination: "/docs", permanent: true },
      { source: "/secret-admin-portal", destination: "/admin", permanent: true },
    ];
  },
};

export default nextConfig;
