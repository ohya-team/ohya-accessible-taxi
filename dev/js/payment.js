import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            memInfo: null,
        }
    },
    mounted() {
        axios.get('./php/usercenterTravel.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 請求失敗處理
                console.log(error);
            });
        axios.get('./php/member.php')
            .then(response => (this.memInfo = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
    computed: {
        memberOrder() {
            if (this.info != null) {
                return this.info.filter(item => item.MEM_NO == this.memInfo[0].MEM_NO)
            }
        }
    }
})