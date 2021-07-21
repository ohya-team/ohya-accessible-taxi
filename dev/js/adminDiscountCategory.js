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
            carType:['黃車','灰車','黑車']
        }
    },
    mounted(){
        axios.get('../php/adminDiscountCategory.php')
            .then((res)=>{
                this.discountInfos = res.data;
                console.log(res.data)
            })
            .catch( (error) => console.log(error));
    },
    computed:{
        detailInfo() {
            if (this.discountInfos.DISCOUNT_INFO !== 0 ) {
                return this.discountInfos
            }
        },
    },
})