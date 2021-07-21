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
    },
    methods: {
        get_href() {debugger;
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = parseInt(targetPageId);
        },
        undisalbled() {
            let spot_no = document.getElementById('spot_no');
            spot_no.disabled = false;
        },
        deleteSpot(e) {
            e.preventDefault();
            window.confirm('確定要刪除此筆資料?')
            document.getElementById(`delete${e.target.id}`).submit();
        }
    },
})