/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    // Subdomain khusus → tidak perlu basePath
    basePath: '',

    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,

    eslint: {
        ignoreDuringBuilds: true,
    },

    output: 'standalone',

    images: {
        domains: ['sandbox.ipaymu.com'],
        remotePatterns: [
            // contoh: jika nanti load gambar dari subdomain kamu sendiri
        ],
    },

    async rewrites() {
        if (!isProd) {
            return [
                {
                    source: '/api/:path*',
                    destination: 'http://localhost:3001/api/:path*',
                },
            ];
        }
        return [];
    },
};

module.exports = nextConfig;
