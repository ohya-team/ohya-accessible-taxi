import Vue from "vue";
import axios from "axios";

/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;

let vm = new Vue({
    el: '#app',
    data: {
        timingTable:[],
    },
    mounted() {
        axios.get('../php/bookingTiming.php').then(res => this.timingTable = res.data).catch(error => console.log(error));
    },
});