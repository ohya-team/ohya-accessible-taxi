import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            memInfo: null,
            trans: {
                0: '審核中',
                1: '未通過',
                2: '待付款',
                3: '已付款',
            }
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
        test() {
            if (this.info != null && this.memInfo != null) {
                return this.info.filter(item => item.MEM_NO == this.memInfo[0].MEM_NO)
            }
        }
    },
})