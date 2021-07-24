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
            info: null,
            carInfo: null,
            spotInfo: null,
            spotNum: 1,
            targetPageId: null,
            spotInProgramInfo: null,
            newSpotNum: 0,
            search: '',
            regularStatusOn: false,
            statusOn: false,
            mainStatusOn: false,
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
        },
        listInfo() {
            if (this.info != null) {
                if (this.info != null) {
                    let listInfo = [...this.info]
                    if (this.search != '') {
                        listInfo = listInfo.filter(item => item.PROGRAM_NAME.includes(this.search))
                    }
                    if (this.regularStatusOn == true) {
                        listInfo = listInfo.filter(item => item.PROGRAM_STATUS == 1)
                    }
                    if (this.statusOn == true) {
                        listInfo = listInfo.filter(item => item.PROGRAM_STATUS_S == 1)
                    }
                    if (this.mainStatusOn == true) {
                        listInfo = listInfo.filter(item => item.PROGRAM_STATUS_S_M == 1)
                    }
                    return listInfo
                }
            }
        }
    },
    methods: {
        statusAll() {
            this.regularStatusOn = false;
            this.statusOn = false;
            this.mainStatusOn = false;
        },
        changeRegularStatus() {
            this.regularStatusOn = true;
            this.statusOn = false;
            this.mainStatusOn = false;
        },
        changeStatus() {
            this.regularStatusOn = false;
            this.statusOn = true;
            this.mainStatusOn = false;
        },
        changeMainStatus() {
            this.mainStatusOn = true;
            this.regularStatusOn = false;
            this.statusOn = false;
        },
        keywordHighlight(val) {
            return val.replace(new RegExp(this.search, 'g'), `<span style="color:white;background:#59c3e1;border-radius:3px ;overflow:hidden">${this.search}</span>`)
        },
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
            let deleteThisData = (confirm('確定要刪除此筆資料?'))
            if (deleteThisData == true) {
                document.getElementById(`delete${e.target.id}`).submit();
            }
        }
    },
})