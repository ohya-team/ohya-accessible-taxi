import Vue from "vue";
import axios from "axios";
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
    el:"#app",
    data(){
        return {
            discountInfos:null,
        }
    },
    mounted(){
        axios.get('../php/adminDiscount.php')
            .then((res)=>{
                this.discountInfos = res.data;
                console.log(res.data)
            })
            .catch( (error) => console.log(error));
    },
})