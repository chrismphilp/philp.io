// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const matter = require('gray-matter');

const ARTICLES_PATH = path.join(process.cwd(), 'articles');

const articleEntries = fs
  .readdirSync(ARTICLES_PATH)
  .filter((filePath) => /\.mdx?$/.test(filePath))
  .map((filePath) => {
    const fullPath = path.join(ARTICLES_PATH, filePath);
    const source = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(source);

    return {
      draft: Boolean(data.draft),
      lastModified: new Date(data.date).toISOString(),
      pathname: `/articles/${filePath.replace(/\.mdx?$/, '')}`,
    };
  });

const articleEntriesByPath = new Map(
  articleEntries.map((entry) => [entry.pathname, entry.lastModified]),
);

const excludedDraftPaths = articleEntries
  .filter((entry) => entry.draft)
  .map((entry) => entry.pathname);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://philp.io',
  outDir: 'out',
  generateRobotsTxt: false,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/quotes', ...excludedDraftPaths],
  transform: async (_, pathname) => ({
    changefreq: pathname === '/' ? 'daily' : pathname.startsWith('/articles/') ? 'monthly' : 'weekly',
    lastmod: articleEntriesByPath.get(pathname) ?? new Date().toISOString(),
    loc: pathname,
    priority:
      pathname === '/' ? 1 : pathname === '/tech' || pathname === '/misc' ? 0.8 : 0.7,
  }),
};
