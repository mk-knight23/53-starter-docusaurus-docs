export default {
  title: 'Docusaurus Starter',
  tagline: 'Build modern documentation sites',
  url: 'https://example.com',
  baseUrl: '/',
  
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'zh'],
  },
  
  themes: ['@docusaurus/theme-search-algolia'],
  
  themeConfig: {
    navbar: {
      title: 'Docs',
      items: [
        {to: '/docs/intro', label: 'Docs', type: 'doc'},
        {to: '/blog', label: 'Blog'},
      ],
    },
    prism: {
      theme: {dark: 'dracula', light: 'github'},
      additionalLanguages: ['python', 'java', 'go'],
    },
  },
};
