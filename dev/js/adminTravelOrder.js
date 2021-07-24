
import Vue from "vue";
import axios from "axios";
/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            targetId: null,
            statusList: ['審核中', '未通過', '待付款', '已付款']
        }
    },
    mounted() {
        this.get_href();
        this.getTravelInfo();
    },
    computed: {
        detailInfo() {
            if (this.info != null) {
                return this.info.filter(item => item.ORDER_NO == this.targetId)
            }
        }
    },
    methods: {
        getTravelInfo() {
            axios.get('../php/adminTravelOrder.php')
                .then(response => (this.info = response.data))
                .catch(function (error) { // 請求失敗處理
                    console.log(error);
                });
        },
        get_href() {
            let nowUrl = window.location.href;
            this.targetId = nowUrl.split('=')[1];
        },
        changeStatus(e) {
            let confirmThisChange = (window.confirm('確定要更改狀態?'))
            if (confirmThisChange == true) {
                axios.post('../php/adminTravelOrderStatus.php', {
                    orderNo: e.target.id.split('_')[1],
                    orderStatus: e.target.value,
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        alert('更改失敗');
                    })
            }
        }

    },
})