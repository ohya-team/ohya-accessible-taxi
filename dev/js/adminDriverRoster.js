import Vue from "vue";
import axios from "axios";

let vm =  new Vue({
    el: '#app',
    data: {
        whref: window.location.href.split('?driver_no=')[1],
        driverRoster: [],
    },
    mounted() {
        axios.get('../php/driverRoster.php')
        .then(res => this.driverRoster = res.data)
        .catch(error => console.log(error))

        if(this.driverRoster[0].DRIVER_NO==this.whref){
            alert(yes)
        }
    },

});