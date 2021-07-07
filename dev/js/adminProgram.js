import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            carInfo: null,
            spotInfo: null,
            spotNum: 1,
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
        axios.get('../php/spot.php')
            .then(response => (this.spotInfo = response.data))
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {
        addSpot() {
            this.spotNum++;
        },
        subtractSpot() {
            if (this.spotNum > 1) {
                this.spotNum--;
            }
        }
    }
})