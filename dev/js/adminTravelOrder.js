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
        axios.get('./php/adminTravelOrder.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 請求失敗處理
                console.log(error);
            });
    },
    computed: {
        detailInfo() {
            if (this.info != null) {
                return this.info.filter(item => item.ORDER_NO == this.targetPageId)
            }
        },
    },
    methods: {
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = parseInt(targetPageId);
        },
        undisalbled() {
            let spot_no = document.getElementById('order_no');
            spot_no.disabled = false;
        },
    },    
})