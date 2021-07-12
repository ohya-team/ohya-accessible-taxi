
import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            program: null,
            meminfo: false,
            memNum: 1,
        }
    },
    mounted() {
        axios.get('./php/member.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        axios.get('./php/program.php')
            .then(response => (this.program = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });       
    },
    methods: {
        toggleUser() {
            this.meminfo = !this.meminfo
        },
    }

})