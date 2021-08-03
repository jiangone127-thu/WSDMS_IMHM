const globalPath = require('./src/config/index.js');
const multipageHelper = require('./multipage-helper');

var htmls = multipageHelper.getDevHtmlWebpackPluginList();
if (process.env.NODE_ENV === 'development') {
    console.log("--------------------development-------------------------------");
    htmls = multipageHelper.getDevHtmlWebpackPluginList()
} else {
    htmls = multipageHelper.getProdHtmlWebpackPluginList()
}
/**
 *
 *  配置前端代理，以及开发环境配置
 */
module.exports = {
    publicPath: globalPath.jsonPath,
    pages: htmls,
    /* pages : {
         index : {
             entry : ['node_modules/core-js' ,'src/main.ts']
         }
       },*/
    devServer: {
        port: "8888",
        open: true,
        proxy: {
            "/typhoon": {
                target: "http://192.168.20.197:8000/typhoon", // mis系统
                pathRewrite: {
                    "^/typhoon": "",
                },
            },
            '/sz/': {
                target: 'http://192.168.20.144:7070/',
                pathRewrite: {
                    '^/sz': '/sz',
                },
            },
            '/dizhen/': {
                target: 'http://192.168.20.165:8046/',
                pathRewrite: {
                    '^/dizhen': '',
                },
            },
            '/huopo/': {
                target: 'http://192.168.20.165:52297/',
                pathRewrite: {
                    '^/huopo': '',
                },
            },
            '/Building/': {
                target: 'http://192.168.20.165:8081/',
                pathRewrite: {
                    '^/Building': '',
                },
            },
            '/warnapi': {
                target: 'http://192.168.20.116:8868/', //http://192.168.20.161:9009', // "http://172.17.38.209:9009"
                pathRewrite: {
                  '^/warnapi': '/',
                },
            },
            '/flood/': {
                target: 'http://192.168.20.98:8081/',
                pathRewrite: {
                    '^/flood': '',
                },
            },
            '/traffic/': {
                target: 'http://192.168.20.98:5000/',
                pathRewrite: {
                    '^/traffic': '',
                },
            },
        }
    }
}
