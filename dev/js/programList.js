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
            targetPageId:1,
            priceSort: '價格',
            personSort: '人數',
        }
    },
    mounted() {
        axios.get('./php/programList.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        this.get_href();
    },
    computed: {
        filterData() {
            if (this.info != null) {
                if (this.type == '精選評分') {
                    console.log(this.info.sort((a, b) => b.PROGRAM_RATING - a.PROGRAM_RATING));
                    return this.info.sort((a, b) => b.PROGRAM_RATING - a.PROGRAM_RATING)
                }
                if (this.type == '價格由高到低') {
                    return this.info.sort((a, b) => b.PROGRAM_PRICE - a.PROGRAM_PRICE)
                }
                if (this.type == '價格由低到高') {
                    return this.info.sort((a, b) => a.PROGRAM_PRICE - b.PROGRAM_PRICE)
                }
                if (this.type == '人數由多到少') {
                    return this.info.sort((a, b) => b.CAR_MAXNUM - a.CAR_MAXNUM)
                }
                if (this.type == '人數由少到多') {
                    return this.info.sort((a, b) => a.CAR_MAXNUM - b.CAR_MAXNUM)
                }
            }
        },
        totalPage() {
            return parseInt(this.filterData.length / this.perPage) + 1;
        }
    },
    methods: {
        selectType(e) {
            this.type = e.target.innerText;
            this.priceSort = '價格';
            this.personSort = '人數';
        },
        selectPriceSort(e) {
            this.priceSort = e.target.innerText;
            this.type = e.target.innerText;
            this.personSort = '人數';
        },
        selectPersonSort(e) {
            this.personSort = e.target.innerText;
            this.type = e.target.innerText;
            this.priceSort = '價格';
        },
        changePage(item) {
            this.targetPageId = item;
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
})