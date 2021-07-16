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
            info: null,
            program: null,
        }
    },
    mounted() {
        axios.get('./php/spot.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        axios.get('./php/program.php')
            .then(response => (this.program = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
    computed: {
        mainSpotStatusOpen() {
            if (this.info != null) {
                return this.info.filter(item => item.SPOT_STATUS_S == '1')
            }
        },
        spotStatusOpen() {
            if (this.info != null) {
                return this.info.filter(item => item.SPOT_STATUS == '1')

            }
        },
        mainProgramStatusOpen() {
            if (this.program != null) {
                return this.program.filter(item => item.PROGRAM_STATUS_S_M == '1')
            }
        },
        programStatusOpen() {
            if (this.program != null) {
                return this.program.filter(item => item.PROGRAM_STATUS_S == '1')

            }
        }
    }
})