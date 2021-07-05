import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            programInfo:null,
            targetPageId: null,
        }
    },
    mounted() {
        this.get_href();
        axios.get('./php/spot.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
        });
        axios.get('./php/programInSpot.php')
            .then(response => (this.programInfo = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
        });
    },
    computed: {
        detailInfo(){
            if (this.info != null) {
                return this.info.filter(item => item.SPOT_NO == this.targetPageId)
            }
        },
        programDetailInfo(){
            if (this.programInfo != null) {
                return this.programInfo.filter(item => item.SPOT_NO == this.targetPageId)
            }
        }
    },
    methods: {
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = targetPageId;
        }
    }
})