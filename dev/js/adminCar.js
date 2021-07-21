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
          console.log(e.target.files[0]);
          let readFile = new FileReader();
          readFile.readAsDataURL(file);
          readFile.addEventListener('load',(e) => this.image = e.target.result);
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
            if (this.carInfo != null) {
                return this.carInfo.filter(car => car.CAR_NO == this.targetPageId)
            }
        },
    },
    data() {
        return {
        carInfo: null,
        image: '',
        file: '',
        }
    },
    mounted() {
        axios.post('../php/car.php')
            .then((res) => {
                this.carInfo = res.data;
                this.image = '.'+res.data[0].CAR_PIC;
                this.file = res.data[0].CAR_PIC;
                console.log(res.data[0].CAR_PIC);
            })
            .catch( (error) => console.log(error));
    },
})