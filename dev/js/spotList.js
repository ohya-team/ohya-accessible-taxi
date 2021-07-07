import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            type: '所有景點',
            perPage: 12,
            typeList: ['所有景點', '風景區', '商圈', '藝文區'],
            targetPageId: null,            
        }
    },
    mounted() {
        axios.get('./php/spot.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        this.get_href();
    },
    computed: {
        filterData() {
            if (this.type === '所有景點') {
                return this.info
            } else {
                return this.info.filter(item => item.SPOT_CAT == this.type)
            }
        },
        totalPage(){
          return  parseInt(this.filterData.length / this.perPage)+1 ;
        }
    },
    methods: {
        changeList(item) {
            this.type = item;
        },
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            console.log(targetPageId);
            this.targetPageId = parseInt(targetPageId);
        }        
    }
})