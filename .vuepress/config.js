// .vuepress/config.js
module.exports = {
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
