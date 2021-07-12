import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el:"#app",
    data(){
        return {
            artInfos:null,
        }
    },
    mounted(){
        axios.get('../php/forum.php')
            .then((res)=>{
                this.artInfos = res.data;
                console.log(res.data)
            })
            .catch( (error) => console.log(error));
    }
})