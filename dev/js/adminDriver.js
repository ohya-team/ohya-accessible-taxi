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
        driverInfo: null,
        }
    },
    mounted() {
        axios.get('../php/driver.php')
            .then((res) => {
                this.driverInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
    },
})