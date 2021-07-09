import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app",
    data() {
        return {
        carInfo: null,
        }
    },
    mounted() {
        axios.get('../php/car.php')
            .then((res) => {
                this.carInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
    },
})