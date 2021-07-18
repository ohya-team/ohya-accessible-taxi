import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            memInfo: null,
            targetPageId: null,
            payType:'信用卡',
            payTypeList:['信用卡','ATM']
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
            this.get_href()
    },
    computed: {
        order() {
            if (this.info != null) {
                return this.info.filter(item => item.ORDER_NO == this.targetPageId)
            }
        }
    },
    methods: {
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = targetPageId;
        }
    }
})