import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el:"#app",
    data(){
        return {
            artInfos:null,
            targetPageId: null,
        }
    },
    mounted(){
        axios.get('../php/forum.php')
            .then((res)=>{
                this.artInfos = res.data;
                console.log(res.data)
            })
            .catch( (error) => console.log(error));
            this.get_href()
    },
    computed:{
        detailInfo() {
            if (this.artInfos != null) {
                return this.artInfos.filter(item => item.ART_NO == this.targetPageId)
            }
        },
    },
    methods:{
        get_href() {
            let nowUrl = window.location.href;
            let targetPageId = nowUrl.split("=")[1];
            this.targetPageId = targetPageId;
        },
    }
})