/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';
const repoName = '/anchor-automotive-group';

const nextConfig = {
  // Only use static export when building in GitHub Actions for GitHub Pages
  ...(isGithubActions ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGithubActions && !isCustomDomain ? repoName : (process.env.NEXT_PUBLIC_BASE_PATH || ''),
  reactStrictMode: true,
};

export default nextConfig;
