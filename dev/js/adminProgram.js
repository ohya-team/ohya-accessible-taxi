import Vue from "vue";
import axios from "axios";
import { remove } from "animejs";
let vue = new Vue({
    el: "#app",
    data() {
        return {
            info: null,
            carInfo: null,
            spotInfo: null,
            spotNum: 1,
            targetPageId: null,
            spotInProgramInfo: null,
            newSpotNum: 0,
        }
    },
    mounted() {
        axios.get('../php/program.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        axios.get('../php/car.php')
            .then(response => (this.carInfo = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        axios.get('../php/spot.php')
            .then(response => (this.spotInfo = response.data))
            .catch(function (error) {
                console.log(error);
            });
        axios.get('../php/spotInProgram.php')
            .then(response => (this.spotInProgramInfo = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        this.get_href();
    },
    computed: {
        detailInfo() {
            if (this.info != null) {
                return this.info.filter(item => item.PROGRAM_NO == this.targetPageId)
            }
        },
        spotInThisProgramInfo() {
            if (this.spotInProgramInfo != null) {
                return this.spotInProgramInfo.filter(item => item.PROGRAM_NO == this.targetPageId)
            }
        }
    },
    methods: {
        addSpot() {
            this.spotNum++;
        },
        subtractSpot() {
            if (this.spotNum > 1) {
                this.spotNum--;
            }
        },
        deleteSpot(e) {
            console.log(e.target.parentNode);
            e.target.parentNode.parentNode.remove();
        },
        addNewSpot() {
            this.newSpotNum++;
        },
        subNewtractSpot() {
            if (this.newSpotNum > 0) {
                this.newSpotNum--;
            }
        },
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = parseInt(targetPageId);
        },
        undisalbled() {
            let program_no = document.getElementById('program_no');
            program_no.disabled = false;
        },
        deleteProgram(e) {
            e.preventDefault();
            window.confirm('確定要刪除此筆資料?')
            document.getElementById(`delete${e.target.id}`).submit();
        }
    },
})