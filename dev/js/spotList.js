import axios from "axios";
import Vue from "vue";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            type: '所有景點',
            typeList: ['所有景點', '風景區', '商圈', '藝文區']
        }
    },
    mounted() {
        axios.get('./php/spot.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
    computed: {
        filterData() {
            if (this.type === '所有景點') {
                return this.info
            } else {             
                return this.info.filter(item => item.spot_cat == this.type)
            }
        }
    },
    methods: {
        changeList(item) {             
            this.type = item;
        }
    }
})