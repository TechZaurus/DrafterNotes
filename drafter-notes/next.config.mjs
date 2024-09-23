/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.freepik.com',
            port: '',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8000',
          },
        ],
      },
};

export default nextConfig;
