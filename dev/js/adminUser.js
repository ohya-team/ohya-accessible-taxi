import Vue from "vue";
import axios from "axios";
/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
    el: "#app1",
    data() {
        return {
        adminInfo: null,
        }
    },
    mounted() {
        axios.post('../php/adminUser.php')
            .then((res) => {
                this.adminInfo = res.data;
            })
            .catch( (error) => console.log(error));
    },
})