import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            carInfo: null
        }
    },
    mounted() {
        axios.get('../php/program.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        axios.get('../php/car.php')
            .then(response => (this.carInfo = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
})