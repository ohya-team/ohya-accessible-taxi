// let heart = document.querySelectorAll('.heart');
// heart.forEach(e => e.addEventListener('click', ()=>{
//     e.classList.toggle('active');
// }))
import Vue from "vue";
import axios from "axios";
import StarRating from 'vue-star-rating'
let vue = new Vue({
    el: "#app",
    components: {
        StarRating
    },
    data() {
        return {
            info: null,
            type: '精選評分',
            perPage: 5,
            typeList: ['精選評分', '價格', '人數'],
            targetPageId: null,    
        }
    },
    mounted() {
        axios.get('./php/programList.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
    computed: {
        filterData() {
            if (this.info != null ) {
                return this.info.sort((a, b) => a.PROGRAM_PRICE - b.PROGRAM_PRICE);
            }else{
                return this.info.sort((a, b) => b.PROGRAM_PRICE - a.PROGRAM_PRICE);
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