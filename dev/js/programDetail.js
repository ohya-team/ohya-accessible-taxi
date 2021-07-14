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
            spotInfo: null,
            targetPageId: null,
            memInfo: null,
        }
    },
    mounted() {
        this.get_href();
        axios.get('./php/programList.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        axios.get('./php/spotInProgram.php')
            .then(response => (this.spotInfo = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        axios.get('./php/member.php')
            .then(response => (this.memInfo = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
    computed: {
        DetailInfo() {
            if (this.info != null) {
                return this.info.filter(item => item.PROGRAM_NO == this.targetPageId)
            }
        },
        spotDetailInfo() {
            if (this.spotInfo != null) {
                return this.spotInfo.filter(item => item.PROGRAM_NO == this.targetPageId)
            }
        },
    },
    methods: {
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = targetPageId;
        },
        order() {
            if (this.memInfo.length > 0) {
                location.href = './travelFormOne.html'
            } else {
                alert('請先登入再進行下單')
                location.href = './login.html'
            }
        }
    }
})