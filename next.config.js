const { version } = require('./package.json');

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
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  transpilePackages: ['react-icons', 'next-image-export-optimizer'],
  images: {
    loader: 'custom',
    imageSizes: [16, 64, 128, 256, 384],
    deviceSizes: [320, 640, 1080, 1920, 2048],
  },
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: 75,
    nextImageExportOptimizer_storePicturesInWEBP: true,
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    nextImageExportOptimizer_generateAndUseBlurImages: true,
  },
};

// Merge MDX config with Next.js config
const mdx = withMDX(mdxConfig);

module.exports = {
  ...mdx,
  publicRuntimeConfig: {
    version,
  }
}
