/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        reactStrictMode: true,
        poweredByHeader: false,
        compress: true,
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [
            "sandbox.ipaymu.com"
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.example.com',
                pathname: '/account123/**'
            }
        ]
    }};

module.exports = nextConfig;
