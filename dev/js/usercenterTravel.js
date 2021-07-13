import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
        info: null,
        }
    },
    mounted() {
        this.get_href();
        axios.get('./php/insertTravelOrder.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
})