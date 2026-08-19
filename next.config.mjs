/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // If deploying to a specific repository subpath on GitHub Pages, uncomment and set:
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  reactStrictMode: true,
};

export default nextConfig;
