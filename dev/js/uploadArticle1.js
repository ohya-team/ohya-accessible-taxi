

var x = new FileReader;
let uploadImg = document.getElementById("uploadImg")
document.forms[0].elements[0].onchange = function () {
    x.readAsDataURL(this.files[0]);
    document.querySelector(".upload-picture-btn").style.opacity = "0";
}
x.onloadend = function () {
    uploadImg.src = this.result
    uploadImg.style.opacity = "1"
    console.log(this.result);
}

import Vue from "vue";
import axios from "axios";
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
    el: "#app",
    data() {
        return {
            memInfos: null,
            word:500,
        }

    },
    created() {

    },
    mounted() {
        console.log(1);
        axios.get('./php/member.php')
            .then(response => (this.memInfos = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });

    },
    computed: {
        detailInfo() {
            if (this.memInfos != null) {
                return this.memInfos;
            }
        },

    },
    methods: {
        decsInput(){
            let texLength = this.desc.length;
            this.word = 500 - texLength;
        }
        
    }
})