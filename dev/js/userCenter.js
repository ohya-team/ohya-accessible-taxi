import Vue from "vue";
import axios from "axios";
/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
    el: "#app",
    methods: {
      fileChange(e){
        let file = e.target.files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(file);
        readFile.addEventListener('load',(e) => this.image = e.target.result);
      },
    },
    data() {
        return {
        memInfo: null,
        targetPageId: null,
        image: '',
        file: '',
        }
    },
    mounted() {
        axios.post('./php/member.php')
            .then((res) => {
                this.memInfo = res.data;
                this.image = res.data[0].MEM_PIC;
                this.file = res.data[0].MEM_PIC;
            })
            .catch( (error) => console.log(error));
    },
})
