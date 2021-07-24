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
            artInfos: null,
            memInfos: null,
            type: '所有文章',
            order: '熱門',
            perPage: 12,
            typeList: ['所有文章', '包車旅遊', '一般預約', '優良司機', '精選車種'],
            orderList: ['熱門', '最新'],
            openTypeList: false,
            openOrder: false,
            targetPageId: 1, 
            art_no:"",
        }
    },
    mounted() {
        axios.get('./php/forum.php')
            .then(response => (this.artInfos = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
            axios.get('./php/member.php')
            .then(response => (this.memInfos = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        
        
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
            if(this.artInfos != null){
                let tempArt = [...this.artInfos];
                if(this.type === '所有文章'){
                    tempArt = tempArt//所有資料
                }
                if(this.type !== '所有文章'){
                    this.targetPageId = 1
                    tempArt = tempArt.filter(item => item.ART_CAT == this.type)
                }
                if(this.order === '熱門'){
                    tempArt = tempArt.sort((a,b) => b.ART_CLICK - a.ART_CLICK)
                }
                if(this.order === '最新'){
                    tempArt = tempArt.sort((a,b) => Date.parse(b.ART_UPDATED) - Date.parse(a.ART_UPDATED))
                }
                console.log(tempArt);
                return tempArt;

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
           
        }
    },
    methods: {
        dropdownTypeList() {
            let tempArt = [...this.artInfos];
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
        changePage(item){
            this.targetPageId = item;
            window.scrollTo({
                left:0,
                top:0,
                behavior: 'smooth'
            })
        },
        upload(){
            if(this.memInfos.length>0){
                location.href = './uploadArticle1.html'
            }else{
                alert('請先登入再發文')
                location.href = './login.html'
            }
        },
        uploadclick(e){
            this.art_no = e;
        }

    },
})








