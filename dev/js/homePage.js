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
            artInfos: null,
        }
    },
    mounted() {
        axios.get('./php/forum.php')
            .then(response => (this.artInfos = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
    computed: {
        favoriteData() {
            if (this.artInfos != null) {
                let tempArt = [...this.artInfos];
                tempArt = tempArt.sort((a, b) => b.ART_CLICK - a.ART_CLICK)
                return tempArt;
            }
        },
    },
    filters: {
        ellipsis(value) {
            const len = 7;
            if (value.length > len) {
                return value.slice(0, len) + '...'
            } else {
                return value;
            }

        }
    },

})