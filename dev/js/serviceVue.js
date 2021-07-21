import Vue from "vue";
import axios from "axios";
/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
    el: "#app",

    methods: {
      showCar(e){
        console.log(e.target);
        console.log('inn');
      },
      showDriver(e){
        console.log(e.target);
        console.log('innn');
      }
    },

    computed: {
      showService(){
        console.log(this.innerText);
        console.log('in');        
        return{
          display: 'block',
        }

      },
    },

    data() {
        return {
        serviceInfo: [],
        carInfo: [],
        driverInfo:[]

        }
    },
    mounted() {
        axios.get('./php/service.php')
            .then((res) => {
                this.serviceInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
        axios.get('./php/car.php')
            .then((res) => {
                this.carInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
        axios.get('./php/driver.php')
            .then((res) => {
                this.driverInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
    },        

})