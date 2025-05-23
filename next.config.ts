/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',             // for all routes
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'ALLOWALL',         // or 'SAMEORIGIN' if your PHP is on the same domain
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "frame-ancestors 'self' http://localhost:80;",
                    },
                ],
            },
        ];
    },
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
    },
};

module.exports = nextConfig;
