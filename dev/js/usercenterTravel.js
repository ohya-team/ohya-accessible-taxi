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
        axios.get('./php/usercenterTravel.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 請求失敗處理
                console.log(error);
            });
    },
})