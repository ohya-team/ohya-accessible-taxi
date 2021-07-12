import Vue from "vue";
import axios from "axios";
let vue = new Vue({
    el: "#app1",
    data() {
        return {
        memInfo: null,
        memName: "訪客",
        }
    },
    mounted() {
        axios.post('../dist/php/member.php')
            .then((res) => {
                this.memInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));

    },
    // methods:{
    //     showName(e){
    //         this.memName = e.target.innerText;
    //     }
    // },
    // computed:{
    //     showName(){
    //         this.memName === this.memInfo.MEM_FIRSTNAME;
    //         if( this.memInfo.MEM_FIRSTNAME == null){
    //             return {
    //                 memName : "訪客"
    //             }
    //         }else{
    //             memName = this.memInfo.MEM_FIRSTNAME
    //         }
    //     },
        // hideBtn(){
        //     this.memName === this.memInfo.MEM_FIRSTNAME;
        //     if(this.memInfo.MEM_FIRSTNAME !== null){
        //        return {
        //            display : 'none'
        //        } ;
        //     }
        // }
    // },
})
