const webpack=require("webpack");
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
const WEBPACK_ENV         = process.env.WEBPACK_ENV || "dev";

//获取html-webpack-plugin参数的方法
const getHtmlConfig=function (name,title) {
    return {
        template:`./src/view/${name}.html`,
        filename:`./view/${name}.html`,
        title:title,
        inject:true,
        hash:true,
        chunks:["common",name]
    }
};

const config={
    entry:{
        //"common":["./src/page/common/index.js","webpack-dev-server/client?http://loaclhost:8088/"],
        "common":["./src/page/common/index.js"],
        "index":["./src/page/index/index.js"],
        "login":["./src/page/login/index.js"],
        "result":["./src/page/result/index.js"],
    },
    output:{
        path:"./dist",
        publicPath : "/dist",
        filename:"js/[name].js", //[name]入口的名字是什么打包出来的就什么

    },
    externals:{
        "jquery":"window.jQuery"
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                //loader:"style-loader!css-loader",
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader?limit=8192&name=images/[name].[ext]"
            },
            {
                test:/\.string$/,
                loader:"html-loader"
            }
        ]
    },
    resolve:{
        alias:{
            util:__dirname+ "/src/util",
            page:__dirname+ "/src/page",
            service:__dirname+ "/src/service",
            image:__dirname+ "/src/image",
            node_modules:__dirname+"/node_modules/"
        }
    },
    plugins:[
        //独立通用模块js、base.js
        new webpack.optimize.CommonsChunkPlugin({
            name:"common",
            filename:"js/base.js",
        }),
        //css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig("index","首页")),
        new HtmlWebpackPlugin(getHtmlConfig("login","用户登录")),
        new HtmlWebpackPlugin(getHtmlConfig("result","操作结果")),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports=config;