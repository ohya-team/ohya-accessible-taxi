// let heart = document.querySelectorAll('.heart');
// heart.forEach(e => e.addEventListener('click', ()=>{
//     e.classList.toggle('active');
// }))
import Vue from "vue";
import axios from "axios";
import StarRating from 'vue-star-rating'
let vue = new Vue({
    el: "#app",
    components: {
        StarRating
    },
    data() {
        return {
            info: null,
        }
    },
    mounted() {
        axios.get('./php/programList.php')
            .then(response => (this.info = response.data))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
})