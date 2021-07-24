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
        signInfo: null,
        }
    },
    mounted() {
        axios.post('../php/signInCheck.php')
            .then((res) => {
                this.signInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
    },
})
