import Vue from "vue";
import axios from "axios";
/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
    el:"#app",
    data(){
        return{
            info:null,
            targetId:null,
        }

    },
    mounted(){
        axios.get('../php/adminReport.php')
        .then(response => (this.info = response.data))
        .catch(function (error) { // 請求失敗處理
            console.log(error);
        });

    },
    computed:{


    },
    methods:{

        changeStatus(e){
            if(e.target.value == 0 || e.target.value == 1){
                document.getElementById("artStatus").value = 0
            }else {
                document.getElementById("artStatus").value =1 
            }

            console.log(  document.getElementById("artStatus").value )

            axios.post('../php/adminReportStatus.php', {
                rep_no: e.target.id.split('_')[1],
                rep_status: e.target.value,
                art_no: document.getElementById("artNo").value,
                art_status: document.getElementById("artStatus").value


            })
                .then(function (response) {
                console.log(response);;
                })
                .catch(function (error) {
                    alert('更改失敗');
                })
            

        }   



    }

})