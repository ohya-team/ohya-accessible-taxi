import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            artInfos: null,
            type: '所有文章',
            order: '熱門',
            perPage: 12,
            typeList: ['所有文章', '包車旅遊', '一般預約', '優良司機', '精選車種'],
            orderList: ['熱門', '最新'],
            openTypeList: false,
            openOrder: false,
            targetPageId: 1, 
            


        }
    },
    mounted() {
        axios.get('./php/forum.php')
            .then(response => (this.artInfos = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        axios.get('./php/click.php')
        .then(response => (this.click = response.data))
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });

        
        this.get_href();
    },
    created() {
        document.addEventListener('click', (e) => {
            if (this.$refs.showPanel) {
                let isSelf = this.$refs.showPanel.contains(e.target);
                let isOrder = this.$refs.showOrder.contains(e.target);
                if (!isSelf) {
                    this.openTypeList = false
                };
                if (!isOrder) {
                    this.openOrder = false
                }
            }

        })


    },
    computed: {
        filterData() {
            if (this.type === '所有文章') {
                return this.artInfos//後台的所有資料
            } else {
                return this.artInfos.filter(item => item.ART_CAT == this.type)
            }
            if(this.order === '熱門'){
                return this.artInfos.sort(function(a,b){
                    return b.ART_CLICK-a.ART_CLICK
                })

            }
        },
        totalPage() {
            return parseInt(this.filterData.length / this.perPage) + 1;
        },


    },
    filters: {
        ellipsis(value) {
            const len = 27;
            if (value.length > len) {
                return value.slice(0, len) + '...'
            } else {
                return value;
            }
            return value
        }
    },
    methods: {
        dropdownTypeList() {
            this.openTypeList = true;
        },
        dropdownOrder() {
            this.openOrder = true;
        },
        changeOrder(e) {
            let order = document.getElementById("dropdown-order");
            this.order = e.target.innerHTML;
            this.openOrder = false;
            
        },
        changeTypeList(e) {
            let typeList = document.getElementById("dropdown-type-list");
            this.openTypeList = false;
            this.type =e.target.innerHTML;
        },
        addClick(){
            

        },
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            console.log(targetPageId);
            this.targetPageId = parseInt(targetPageId);
        
        },
        


    },
})








