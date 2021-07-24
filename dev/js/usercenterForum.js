import Vue from "vue";
import axios from "axios";

/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;

let vue = new Vue({
    el:"#app",
    data:{
        memInfos:null,
        info:null,

    },
    mounted() {
        axios.get('./php/forum.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
            axios.get('./php/member.php')
            .then(response => (this.memInfos = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        
        
    },
    computed:{
        detailInfo() {
            if (this.info != null && this.memInfos != null) {
                return this.info.filter(item => item.MEM_NO == this.memInfos[0].MEM_NO)
            }
        }
    },
    methods:{
        deleteForum(e){
            e.preventDefault();
            let r = window.confirm('確定要刪除這篇文章嗎?');
            if (r==true){
                document.getElementById(`delete${e.target.id}`).submit();    
            } 
        }
    }
})

