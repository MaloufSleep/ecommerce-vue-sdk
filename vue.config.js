const path = require('path')

function addStyleResource(rule) {
    rule.use('style-resources').loader('style-resources-loader').options({
        patterns: [
            path.resolve(__dirname, './src/styles/main.scss')
        ]
    })
}

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, 'src/')
            }
        },
        performance: {
            hints: false
        },
        target: 'node',
    },
    chainWebpack(config){
        const types = ['vue-modules','vue','normal-modules','normal']
        types.forEach(type => {
            addStyleResource(config.module.rule('scss').oneOf(type))
        })
    }
}