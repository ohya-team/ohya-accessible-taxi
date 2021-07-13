import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
        driverInfo: null,
        }
    },
    mounted() {
        axios.get('../php/driver.php')
            .then((res) => {
                this.driverInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
    },
})