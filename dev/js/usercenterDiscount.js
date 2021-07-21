import Vue from "vue";
import axios from "axios";

/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;

let vue = new Vue({
    el:"#app",
    data:{
        memInfo:null,
        info: null,

    },
    mounted(){
        axios.get('./php/member.php')
        .then(res => (this.memInfo = res.data))
        .catch(error => console.log(error))

        axios.get('./php/usercenterDiscount.php')
        .then(res => (this.info = res.data))
        .catch(error => console.log(error))
    },
    computed:{
        detailInfo() {
            if (this.info != null && this.memInfo != null) {
                return this.info.filter(item => item.MEM_NO == this.memInfo[0].MEM_NO)
            }
        }
    },

})