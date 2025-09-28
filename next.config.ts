/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    output:'standalone',
    images: {
        domains: [
            "images.tokopedia.net",
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
