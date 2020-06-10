module.exports = {
  title: "Web and Native Development",
  description: "Creating native and web apps using Vue, NativeScript and Laravel",
  themeConfig: {
    sidebar: [
      '/',
      {
        title: 'Frontend',
        collapsable: false, 
        children: [
          '/frontend/introduction',
          '/frontend/interface',
          '/frontend/routing',
          '/frontend/debug',
          '/frontend/stateandstorage',
          '/frontend/authentication',
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
        collapsable: false, 
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
