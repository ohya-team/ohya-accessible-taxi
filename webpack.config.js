const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        adminDriversTable:'./dev/js/adminDriversTable.js',
        adminDriverRoster:'./dev/js/adminDriverRoster.js',
        adminBookingTiming:'./dev/js/adminBookingTiming.js',
        adminBookingForm:'./dev/js/adminBookingForm.js',
        adminTravel: './dev/js/adminTravel.js',
        adminProgram: './dev/js/adminProgram.js',
        adminMember: './dev/js/adminMember.js',
        adminDiscountCategory: './dev/js/adminDiscountCategory.js',
        adminTravelOrder: './dev/js/adminTravelOrder.js',
        adminCar: './dev/js/adminCar.js',
        adminDriver: './dev/js/adminDriver.js',
        adminArticle: './dev/js/adminArticle.js',
        adminDiscount:'./dev/js/adminDiscount.js',
        bannerSlider: './dev/js/bannerSlider.js',
        booking: './dev/js/booking.js',
        booking2: './dev/js/booking2.js',
        forum: './dev/js/forum.js',
        service: './dev/js/service.js',
        travelForm: './dev/js/travelForm.js',
        spotList: './dev/js/spotList.js',
        spotDetail: './dev/js/spotDetail.js',
        programList: './dev/js/programList.js',
        programDetail: './dev/js/programDetail.js',
        travelFormTwo: './dev/js/travelFormTwo.js',
        forumDetail: './dev/js/forumDetail.js',
        jquerySliderPro: './dev/js/jquerySliderPro.js',
        bootstrapMin: '/dev/js/bootstrapMin.js',
        travelList: '/dev/js/travelList.js',
        metisMenuMin: '/dev/js/metisMenuMin.js',
        startmin: '/dev/js/startmin.js',
        slotmachine1:'./dev/js/slotmachine.js',
        slotmachine2:'./dev/js/jquery.slotmachine.js',
        login: './dev/js/login.js',
        uploadArticle:'./dev/js/uploadArticle.js',
        slotmachine3:'./dev/js/slotmachine3.js',
        userCenter: './dev/js/userCenter.js',
        usercenterTravel: './dev/js/usercenterTravel.js',
        usercenterBooking: './dev/js/usercenterBooking.js',
        member: './dev/js/member.js',
        payment: './dev/js/payment.js',
        uploadArticle1:'./dev/js/uploadArticle1.js',
        slotmachine_test:'./dev/js/slotmachine_test.js',
        uploadSuccess:'./dev/js/uploadSuccess.js',
        showArticle:'./dev/js/showArticle.js',
        usercenterForum:'./dev/js/usercenterForum.js',
        usercenterDiscount:'./dev/js/usercenterDiscount.js',
        editArticle:'./dev/js/editArticle.js',
        adminDiscount:'./dev/js/adminDiscount.js',
        adminMember: './dev/js/adminMember.js',
        adminDiscountCategory: './dev/js/adminDiscountCategory.js',
        adminArticleReport:'./dev/js/adminArticleReport.js',
    },// ????????????
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js'
    },              // ????????????
    mode: process.env.NODE_ENV,
    plugins: [
        //????????????jq
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        })
    ],// ???????????????
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
}