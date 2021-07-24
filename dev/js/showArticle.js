import Vue from "vue";
import axios from "axios";
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
    el:"#app",
    data(){
        return {
            artInfos:null,
            targetPageId: null,
        }
    },
    mounted(){
        axios.get('../php/forum1.php')
            .then(response => (this.artInfos = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
            this.get_href()
            
    },
    computed:{
        detailInfo() {
            if (this.artInfos != null) {
                return this.artInfos.filter(item => item.ART_NO == this.targetPageId)
            }
        },
    },
    methods:{
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = targetPageId;
        },
    }
})