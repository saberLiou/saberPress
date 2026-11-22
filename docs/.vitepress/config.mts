import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'saberPress',
  description: 'A cheat sheet built in bullet points.',
  lang: 'zh-TW',
  base: '/saberPress/',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['api-examples.md', 'markdown-examples.md'],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],
    sidebar: [
      {
        text: 'General',
        items: [
          { text: 'Topics', link: '/' },
          { text: 'Software Development Tips', link: '/software-development-tips' },
        ],
        collapsed: false,
        base: '/general',
      },
      {
        text: 'Golang',
        items: [
          { text: 'Topics', link: '/' },
          { text: 'Special Syntaxes', link: '/special-syntaxes' },
        ],
        collapsed: true,
        base: '/golang',
      },
    ],
    search: {
      provider: 'local',
    },
    outline: {
      level: [2, 3],
    },
    footer: {
      message:
        'Released under the <a href="https://github.com/saberLiou/saberPress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2024-present saberLiou',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/saberLiou/saberPress' }],
  },
})
