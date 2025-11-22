const prod = process.env.NODE_ENV === 'production';
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
});

const mdxConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  transpilePackages: ['react-icons', 'next-image-export-optimizer'],
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

// Merge MDX config with Next.js config
const mdx = withMDX(mdxConfig);

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: !prod,
});

/** @type {import('next').NextConfig} */
const baseConfig = {
  ...withPWA(mdx),
};

module.exports = withBundleAnalyzer(baseConfig);
