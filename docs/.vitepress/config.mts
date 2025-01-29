import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'saberPress',
  description: 'A cheat sheet built in bullet points.',
  base: '/saberPress/',
  cleanUrls: true,
  lastUpdated: true,
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
          { text: 'Software Development Tips', link: '/software-development-tips' }
        ],
        collapsed: false,
        base: '/general'
      },
      {
        text: 'Golang',
        items: [
          { text: 'Topics', link: '/' },
          { text: 'Special Syntaxes', link: '/special-syntaxes' }
        ],
        collapsed: true,
        base: '/golang'
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/saberLiou/saberPress' }
    ]
  }
})
