import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // The weather station's WeeWX site, uploaded every 5 minutes by the weatherbot Pi
  // (github.com/redfive410/weatherbot). beforeFiles so the [...slug] route doesn't claim it;
  // the index rule comes first because Cloud Storage doesn't serve index.html for a folder.
  async rewrites() {
    const site = "https://storage.googleapis.com/tramalfadore-weewx/weewx";
    return {
      beforeFiles: [
        { source: "/weewx/", destination: `${site}/index.html` },
        { source: "/weewx/:path*", destination: `${site}/:path*` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
