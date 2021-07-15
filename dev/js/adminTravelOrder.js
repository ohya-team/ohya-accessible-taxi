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
        this.getTravelInfo();
    },
    methods: {
        getTravelInfo() {
            axios.get('../php/adminTravelOrder.php')
                .then(response => (this.info = response.data))
                .catch(function (error) { // 請求失敗處理
                    console.log(error);
                });
        },
        changeStatus(e) {
            console.log(e.target.value);
            console.log(e.target.id);
            confirm('確定要更改狀態?')
            axios.post('../php/adminTravelOrderStatus.php', {
                orderNo: e.target.id,
                orderStatus: e.target.value,
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    alert('更改失敗');
                })
        }
    },
})