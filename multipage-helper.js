/**
 * 多页面支持
 * @File:
 * @Description: 多页面支持
 * @author qingyi xuelongqy@foxmail.com
 * @date 2017/6/15 10:16
 * @version V1.0
 */

const fs = require('fs')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var moduleList // 缓存多页面模块列表
var moduleRootPath = './src/cityMaker' // 模块根目录(这个可以根据自己的需求命名)

/**
 * 获取js入口数组 实际上是ts
 */
exports.getEntries = function getEntries() {
    // 缓存js入口数组
    var entries = {
        index: ['node_modules/core-js', 'src/main.ts']
    }
    // 初始化模块列表
    this.getModuleList()
    // 变量模块列表

    moduleList.forEach(function (module) {
        if (module.moduleID !== '' && module.moduleJS !== '') {
            entries[module.moduleID] = ['node_modules/core-js', module.moduleJS]
        }
    })
    console.log('*********************************** entries ***********************************')
    console.log(entries)
    return entries
}

/**
 * 获取多页面模块列表
 * @returns {模块的信息集合}
 */
exports.getModuleList = function getModuleList() {
    // 判断是否为空，不为空则直接返回
    if (moduleList) {
        return moduleList
    } else { // 为空则读取列表
        moduleList = new Array()
      //  readDirSync(moduleRootPath, '')
        console.log('*********************************** moduleList ***********************************')
        console.log(moduleList)
        return moduleList
    }
}

/**
 * 获取dev的Html模板集合
 * @returns {dev的Html模板集合}
 */
exports.getDevHtmlWebpackPluginList = function getDevHtmlWebpackPluginList() {
    console.log('*********************************** devHtmlWebpackPluginList ***********************************')
    // 缓存dev的Html模板集合
    var devHtmlWebpackPluginList = [];
    var obj = {}
    // 获取多页面模块集合
    var moduleList = this.getModuleList()
    var entryList = this.getEntries()

    var conf = {
        entry: ['node_modules/core-js', 'src/main.ts'],
        filename: 'index.html',
        template: 'public/index.html',
        chunks: ['index'],
        inject: true
    }
    console.log(conf)
    // 添加HtmlWebpackPlugin对象
    devHtmlWebpackPluginList.push(new HtmlWebpackPlugin(conf))
    obj['index'] = conf
    // 遍历生成模块的HTML模板
    moduleList.forEach(function (mod) {
        // 生成配置
        var conf = {
            entry: entryList[mod.moduleID],
            filename: 'cityMaker/' + mod.moduleID + '.html',
            template: mod.moduleHTML,
            chunks: [mod.moduleID],
            inject: true
        }
        console.log(conf)
        // 添加HtmlWebpackPlugin对象
        devHtmlWebpackPluginList.push(new HtmlWebpackPlugin(conf))
        obj[mod.moduleID] = conf
    })
    // return devHtmlWebpackPluginList

    return obj
}

/**
 * 获取prod的Html模板集合
 * @returns {prod的Html模板集合}
 */
exports.getProdHtmlWebpackPluginList = function getProdHtmlWebpackPluginList() {
    console.log('*********************************** prodHtmlWebpackPluginList ***********************************')
    // 缓存dev的Html模板集合
    var prodHtmlWebpackPluginList = [];
    var obj = {}
    var conf = {
        entry: ['node_modules/core-js', 'src/main.ts'],
        filename: 'index.html',
        template: 'public/index.html',
        chunks: ['chunk-vendors', 'chunk-common', 'index'],
        /* minify: {
           removeComments: true,
           collapseWhitespace: true,
           removeAttributeQuotes: true
           // more options:
           // https://github.com/kangax/html-minifier#options-quick-reference
         },*/
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'none',
        inject: true,
        hash: true
    }
    console.log(conf)
    // 添加HtmlWebpackPlugin对象
    prodHtmlWebpackPluginList.push(new HtmlWebpackPlugin(conf))
    obj['index'] = conf
    // 获取多页面模块集合
    var moduleList = this.getModuleList()
    var entryList = this.getEntries()
    // 遍历生成模块的HTML模板
    moduleList.forEach(function (mod) {
        // 生成配置
        var conf = {
            entry: entryList[mod.moduleID],
            filename: mod.moduleID + '.html',
            template: mod.moduleHTML,
            chunksSortMode: 'none',
            inject: true,
            hash: true,
            chunks: ['chunk-vendors', 'chunk-common', mod.moduleID]
        }
        console.log(conf)
        // 添加HtmlWebpackPlugin对象
        prodHtmlWebpackPluginList.push(new HtmlWebpackPlugin(conf))
        obj[mod.moduleID] = conf
    })
    // return prodHtmlWebpackPluginList
    return obj
}

/**
 * 深度遍历目录，并整理多页面模块
 * @param path 需要变量的路径
 * @param moduleName 模块名称
 */
function readDirSync(path, moduleName) {
    debugger
    // 缓存模块对象
    var module = {moduleID: '', moduleHTML: '', moduleJS: ''}
    // 获取当前模块ID
    var moduleID = path.replace(moduleRootPath + '/', '')
    if (path == moduleRootPath) {
        moduleID = ''
    }
    module.moduleID = moduleID
    // 获取目录下所有文件及文件夹
    var pa = fs.readdirSync(path)
    pa.forEach(function (ele, index) {
        var info = fs.statSync(path + '/' + ele)
        if (info.isDirectory()) {

            readDirSync(path + '/' + ele, ele)
        } else {
            // 判断当前模块的html是否存在
            if (moduleName + '.html' == ele) {
                module.moduleHTML = path + '/' + ele
            }
            // 判断当前模块的js是否存在
            if (moduleName + '.ts' == ele) {
                module.moduleJS = path + '/' + ele
            }
            console.log(module)
            // 判断模块是否真实(可能只是个分级目录)
            if ((module.moduleID != '' && module.moduleHTML != '') || (module.moduleID != '' && module.moduleJS != '')) {
                moduleList.push(module)
            }
        }

    });
}
