import Vue from "vue";
import axios from "axios";

let vm = new Vue({
    el: '#app',
    data: {
        timingTable:[],
    },
    mounted() {
        axios.get('../php/bookingTiming.php').then(res => this.timingTable = res.data).catch(error => console.log(error));
    },
});