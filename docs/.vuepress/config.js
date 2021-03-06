module.exports = {
  base: "/webdevbook/",
  title: "Web development: management, frontend and backend",
  description: "Creating native and web apps using Vue, NativeScript and Laravel",
  themeConfig: {
    sidebar: [
      '/',
      {
        title: 'Software projects',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          '/project/introduction',
          '/project/newproject',
          '/project/methodology',
          '/project/design',
        ]
      },
      {
        title: 'Frontend',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          '/frontend/introduction',
          '/frontend/reactive',
          '/frontend/interface',
          '/frontend/setup',
          '/frontend/debug',
          '/frontend/deployment',
          '/frontend/routing',
          '/frontend/stateandstorage',
          '/frontend/authentication',
          '/frontend/communication',
          '/frontend/models',
          '/frontend/testing',
          '/frontend/i18n',
          '/frontend/pushcommunication',
          '/frontend/camera',
          '/frontend/sharing',
          '/frontend/caching',
          '/frontend/last',
        ]
      },
      {
        title: 'Backend',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          '/backend/introduction',
          '/backend/architecture',
          '/backend/structure',
          '/backend/setup',
          '/backend/testing',
          '/backend/models',
          '/backend/database',
          '/backend/routing',
          '/backend/controllers',
          '/backend/authentication',
          '/backend/security',
          '/backend/deployment',
          '/backend/ssr',
          '/backend/media',
          '/backend/pushcommunication',
          '/backend/scraping',
          '/backend/last',
        ]
      }
    ]
  },
  chainWebpack: (config, isServer) => {
    config.module.rule('vue').uses.store.get('vue-loader').store.get('options').transformAssetUrls = {
      video: ['src', 'poster'],
      source: 'src',
      img: 'src',
      image: ['xlink:href', 'href'],
      a: 'href',
      Fig: 'src',
    };
  },
  plugins: [
    // you can use this plugin multiple times
    [
      'vuepress-plugin-container',
      {
        type: 'comment',
        defaultTitle: {
          '/': ''
        }
      },
    ],
  ],
}
