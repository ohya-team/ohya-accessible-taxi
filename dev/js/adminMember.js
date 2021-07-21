import Vue from "vue";
import axios from "axios";
/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
    el: "#app",
    methods:{
        changeStatus(member) {
            let confirmThisChange = (confirm('確定要停權嗎?'))
            // console.log(member);
            // debugger;
            if ( member.MEM_STATUS == '1' ){
                member.MEM_STATUS = '0';
                document.getElementById('changeStatus').value = "復權";
            }else{
                member.MEM_STATUS = '1'
                document.getElementById('changeStatus').value = "停權";
            };
            if (confirmThisChange == true) {
                axios.post('../php/memberStatus.php', {
                    memNo: member.MEM_NO,
                    memStatus: member.MEM_STATUS,
                })
                    .then(function (res) {
                        console.log(res);
                    })
                    .catch(function (error) {
                        alert('更改失敗');
                    })
            }
        }
    },
    data() {
        return {
        memInfo: null,
        }
    },
    mounted() {
        axios.post('../php/adminMember.php')
            .then((res) => {
                this.memInfo = res.data;
                console.log(res.data);
            })
            .catch( (error) => console.log(error));
    },
})