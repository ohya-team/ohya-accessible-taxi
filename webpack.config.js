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
        spotDetail: './dev/js/spotDetail.js',
        adminTravel: './dev/js/adminTravel.js',
        programList: './dev/js/programList.js',
        programDetail: './dev/js/programDetail.js',
        travelFormTwo: './dev/js/travelFormTwo.js',
        forumDetail: './dev/js/forumDetail.js',
        jqueryMin: './dev/js/jqueryMin.js',
        jquerySliderPro: './dev/js/jquerySliderPro.js',
        bootstrapMin: '/dev/js/bootstrapMin.js',
        travelList: '/dev/js/travelList.js',
        metisMenuMin: '/dev/js/metisMenuMin.js',
        startmin: '/dev/js/startmin.js',
        slotmachine1:'./dev/js/slotmachine.js',
        slotmachine2:'./dev/js/jquery.slotmachine.js',
        login: './dev/js/login.js',
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