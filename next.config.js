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
  images: {
    loader: 'custom',
    imageSizes: [16, 64, 128, 256],
    deviceSizes: [320, 1080, 1920],
  },
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '75',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
  },
};

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: !prod,
});

module.exports = withBundleAnalyzer(withPWA(nextConfig));
