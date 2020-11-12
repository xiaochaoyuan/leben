const path = require('path');
module.exports = {
    // 设置基本路径,这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    // 输出文件目录(打包位置)
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    /**
     *     assetsDir: 'static',
    productionSourceMap: false,
    publicPath: './',
     * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md#
     **/
    chainWebpack: (config) => {
        // 设置svg
        // const svgRule = config.module.rule('svg')
        // svgRule.uses.clear()
        // svgRule
        //     .use('svg-sprite-loader')
        //     .loader('svg-sprite-loader')
        //     .options({
        //         symbolId: 'icons-[name]',
        //         include: ["./src/icons"]
        //     })


    },
    configureWebpack: (config) => {
        config.resolve = { // 配置解析别名
            extensions: ['.js', '.json', '.vue'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                'public': path.resolve(__dirname, './public'),
                'components': path.resolve(__dirname, './src/components'),
                'common': path.resolve(__dirname, './src/common'),
                'api': path.resolve(__dirname, './src/api'),
                'views': path.resolve(__dirname, './src/views'),
                'data': path.resolve(__dirname, './src/data'),
                'utils': path.resolve(__dirname, './src/utils'),
                'vue': 'vue/dist/vue.js'
            }
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: false,//修改sass问题
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            scss: {
                prependData: `@import "~@/styles/main.scss";`
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: true
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    // parallel: require('os').cpus().length > 1,
    /**
     *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
     */
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: true, // 编译完成是否打开网页
        host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
        port: 8080, // 访问端口
        https: false, // 编译失败时刷新页面
        hot: true, // 开启热加载
        hotOnly: false,
        proxy: null, // 设置代理
        proxy: {
            '/api': {
                // target: 'http://property.mgtx-tech-dev.mgtx.com.cn/admin',
                target: 'http://lotus.mgtx-tech-dev.mgtx.com.cn',//设置主域名
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        overlay: { // 全屏模式下是否显示脚本错误DRFC
            warnings: true,
            errors: true
        },

        before: app => {
        }
    },
    /**
     * 第三方插件配置
     */
    pluginOptions: {}
}