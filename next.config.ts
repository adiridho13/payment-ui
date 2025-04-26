/** @type {import('next').NextConfig} */
const nextConfig = {
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
