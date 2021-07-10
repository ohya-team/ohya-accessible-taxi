import Vue from "vue";
import axios from "axios";

let vm =  new Vue({
    el: '#app',
    data: {
       driverTable:[],
    },
    mounted() {
        //   axios.get('../php/driver.php').then(res => console.log(res.data));
          axios.get('../php/driver.php').then(res => this.driverTable = res.data);
      },
})