import Vue from "vue";
import axios from "axios";

let vm = new Vue({
    el: '#app',
    data: {
        checkTime:'確認時間',
        checkCar:'確認車種',
        checkDriver:'確認司機',
        checkForm:'訂單確認',
        leftDate:new Date().getMonth()+1+'/'+new Date().getDate(),
    },
    mounted() {
        
    },
});