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
        carInfo: null,
        }
    },
    mounted() {
        axios.get('../php/car.php')
            .then((res) => {
                this.carInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
    },
})