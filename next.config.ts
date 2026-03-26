import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Google Fonts via globals.css @import
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "brodskydivorcelaw.com" }],
        destination: "https://www.brodskydivorcelaw.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
