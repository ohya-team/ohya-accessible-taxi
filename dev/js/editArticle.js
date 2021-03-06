

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
            word:500,
            wordLength:false,
        }
    },
    mounted(){
        axios.get('./php/forum.php')
            .then(response => (this.artInfos = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        this.get_href();
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
        fileSelected(e){
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.imageLoaded);
            reader.readAsDataURL(file);  
        },
        imageLoaded(e){
            document.getElementById("uploadImg").src =  e.target.result;
        },
        decsInput(){
            this.wordLength = true;
            let texLength = document.querySelector(".upload-txt").value.length;
            this.word = 500 - texLength;
        }


    }
})
