import Vue from "vue";
import axios from "axios";
/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
    el: "#app",
    methods:{
        driverfileChange(e){
            let file = e.target.files[0];
            let readFile = new FileReader();
            readFile.readAsDataURL(file);
            readFile.addEventListener('load',(e) => this.driverImage = e.target.result);
            console.log(readFile);
          },
          taxifileChange(e){
            let file = e.target.files[0];
            let readFile = new FileReader();
            readFile.readAsDataURL(file);
            readFile.addEventListener('load',(e) => this.taxiImage = e.target.result);
            
            console.log(readFile);
          },
          get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = parseInt(targetPageId);
        },
    },
    computed: {
        detailInfo() {
            if (this.driverInfo != null) {
                return this.driverInfo.filter(driver => driver.DRIVER_NO == this.targetPageId)
            }
        },
    },

    data() {
        return {
        driverInfo: null,
        targetPageId: null,
        driverImage: '',
        driverFile: '',
        taxiImage: '',
        taxifile: '',

        }
    },
    mounted() {
        axios.post('../php/driver.php')
            .then((res) => {
                this.driverInfo = res.data;
                this.driverImage = '.'+res.data[0].DRIVER_PIC;
                this.driverFile = res.data[0].DRIVER_PIC;
                this.taxiImage = '.'+res.data[0].TAXI_PIC;
                this.taxifile = res.data[0].TAXI_PIC;
            })
            .catch( (error) => console.log(error));
    },
})