const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './dev/js/scripts.js',
        bannerSlider: './dev/js/bannerSlider.js',
        booking: './dev/js/booking.js',
        forum: './dev/js/forum.js',
        service: './dev/js/service.js',
        travelForm: './dev/js/travelForm.js',
        spotList: './dev/js/spotList.js',
    },// 入口文件
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js'
    },              // 出口文件
    mode: 'development',
    plugins: [
        //全域載入jq
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        })
    ],// 對應的插件
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
}