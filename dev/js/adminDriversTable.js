import Vue from "vue";
import axios from "axios";

/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;

let vm =  new Vue({
    el: '#app',
    data: {
        driverName: '',
        driverPhone: '',
        driverTable: [],
    },
    mounted() {
        axios.get('../php/driver.php').then(res => this.driverTable = res.data).catch(error => console.log(error));
    },
    methods: {
        findName(){
            for(let i=0; i<this.driverTable.length; i++){
                //每一筆比對輸入的內容是否有吻合
                if(this.driverName == this.driverTable[i].DRIVER_NAME || this.driverPhone == this.driverTable[i].DRIVER_PHONE){
                    this.driverTable = [{
                        DRIVER_NO:this.driverTable[i].DRIVER_NO,
                        DRIVER_NAME:this.driverTable[i].DRIVER_NAME,
                        DRIVER_PHONE:this.driverTable[i].DRIVER_PHONE,
                    }]
                }
            }
            this.driverName = '';
            this.driverPhone = '';
        },
        showAll(){
            this.$mount('#app');//回到mounted前
        }
    },
})