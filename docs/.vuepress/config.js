module.exports = {
  title: "Full stack Web and Native Development",
  description: "Creating native and web apps using Vue, NativeScript and Laravel",
  themeConfig: {
    sidebar: [
      '/',
      {
        title: 'Frontend',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          '/frontend/introduction',
          '/frontend/interface',
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
        ]
      },
      {
        title: 'Backend',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          '/backend/introduction',
          '/backend/security',
          '/backend/media',
          '/backend/deployment',
          '/backend/testing',
          '/backend/database',
          '/backend/authentication',
          '/backend/models',
          '/backend/controllers',
          '/frontend/pushcommunication',
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
  }
}
