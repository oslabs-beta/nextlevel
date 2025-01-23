import pkg from '@next/bundle-analyzer';
const withBundleAnalyzer = pkg({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },  
  async rewrites() {
    return [
      {
        source: '/dashboard/api/:path*',  // matches requests made to the '/dashboard/api' path
        destination: 'https://www.nextlevel-dash.com/dashboard/api/:path*',  // forward to the external API server
      },
    ]
  },
  async headers() {
        return [
            {
                // matching all API routes
                source: "/dashboard/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Connection" },
                ]
            }
        ]
    },
  // This could help with resolving any URL paths to ensure they reach the correct destination.
  // Optional if rewrites are not working perfectly.
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/dashboard/api',
  },
};

export default withBundleAnalyzer(nextConfig);