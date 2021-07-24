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
            targetPageId: null,
            search: '',
            statusOn: false,
            mainStatusOn: false,
        }
    },
    mounted() {
        this.get_href();
        axios.get('../php/spot.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
    computed: {
        detailInfo() {
            if (this.info != null) {
                return this.info.filter(item => item.SPOT_NO == this.targetPageId)
            }
        },
        listInfo() {
            if (this.info != null) {
                let listInfo = [...this.info]
                if (this.search != '') {
                    listInfo = listInfo.filter(item => item.SPOT_NAME.includes(this.search))
                }
                if (this.statusOn == true) {
                    listInfo = listInfo.filter(item => item.SPOT_STATUS == 1)
                }
                if (this.mainStatusOn == true) {
                    listInfo = listInfo.filter(item => item.SPOT_STATUS_S == 1)
                }
                return listInfo
            }
        }
    },
    methods: {
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = parseInt(targetPageId);
        },
        undisalbled() {
            let spot_no = document.getElementById('spot_no');
            spot_no.disabled = false;
        },
        deleteSpot(e) {
            let deleteThisData = (confirm('確定要刪除此筆資料?'))
            if (deleteThisData == true) {
                document.getElementById(`delete${e.target.id}`).submit();
            }
        },
        keywordHighlight(val) {
            return val.replace(new RegExp(this.search, 'g'), `<span style="color:#59c3e1">${this.search}</span>`)
        },
        statusAll() {
            this.statusOn = false;
            this.mainStatusOn = false
        },
        changeStatus() {
            this.statusOn = true;
            this.mainStatusOn = false
        },
        changeMainStatus() {
            this.mainStatusOn = true
            this.statusOn = false;
        }
    },
})