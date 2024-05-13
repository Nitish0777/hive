/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // remotePatterns: ['https://uploadthing.com/*', 'https://lh3.googleusercontent.com/*'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'uploadthing.com',
                port: '',
                //   pathname: '/account123/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                //   pathname: '/account123/**',
            },
        ],
    },
};

export default nextConfig;
