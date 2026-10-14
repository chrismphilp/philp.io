const prod = process.env.NODE_ENV === 'production';

let withBundleAnalyzer;
try {
  const analyzer = require('@next/bundle-analyzer');
  withBundleAnalyzer = analyzer({ enabled: process.env.ANALYZE === 'true' });
} catch {
  withBundleAnalyzer = (config) => config;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  transpilePackages: ['react-icons', 'next-image-export-optimizer'],
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Next's supported browsers already provide the older language polyfills.
      config.resolve.alias[require.resolve('next/dist/build/polyfills/polyfill-module')] =
        require.resolve('./utils/browserPolyfills.js');
    }
    return config;
  },
  images: {
    loader: 'custom',
    imageSizes: [16, 64, 128, 256],
    deviceSizes: [320, 640, 768, 1080, 1440, 1920],
  },
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '90',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
  },
};

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: !prod,
  // Cache photos when viewed, rather than downloading the library on install.
  publicExcludes: [
    '!noprecache/**/*',
    '!blog/images/**/*',
    '!articles/images/**/*',
    '!**/nextImageExportOptimizer/**/*',
    '!**/next-image-export-optimizer-hashes.json',
    '!_headers', // Cloudflare deployment metadata is not a fetchable asset.
  ],
  workboxOptions: {
    // Keep the offline shell, but cache images, optional font subsets, and
    // browser-specific polyfills only when requested by a visitor.
    manifestTransforms: [
      async (manifest) => ({
        manifest: manifest.filter(
          ({ url }) =>
            // Next's static export omits this file; it would break SW installation.
            !url.endsWith('/dynamic-css-manifest.json') &&
            !/\.(?:png|jpe?g|gif|webp|avif|ico)$/i.test(url) &&
            !/\/polyfills-[^/]+\.js$/.test(url) &&
            (!url.endsWith('.woff2') || url.endsWith('.p.woff2')),
        ),
        warnings: [],
      }),
    ],
  },
});

module.exports = withBundleAnalyzer(withPWA(nextConfig));
