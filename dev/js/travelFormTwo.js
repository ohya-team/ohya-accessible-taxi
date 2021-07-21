let storage = window.sessionStorage;
import Vue from "vue";
import axios from "axios";

/*模式設定*/
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
let vue = new Vue({
  el: "#app",
  data() {
    return {
      info: null,
      meminfo: false,
      first_name: storage.getItem('first_name'),
      last_name: storage.getItem('last_name'),
      email: storage.getItem('email'),
      phone: storage.getItem('phone'),
      dep_time: storage.getItem('dep_time'),
      address: storage.getItem('address'),
      pickup_place: storage.getItem('pickup_place'),
      program: storage.getItem('program'),
      people_num: storage.getItem('people_num'),
      remarks: storage.getItem('remarks'),
      discount: storage.getItem('discount'),
      programList: null,
      showPopUpBox: false,
    }
  },
  mounted() {
    axios.get('./php/member.php')
      .then(response => (this.info = response.data))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
    axios.get('./php/program.php')
      .then(response => (this.programList = response.data))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });

  },
  computed: {
    thisProgram() {
      if (this.programList != null) {
        return this.programList.filter(item => item.PROGRAM_NO == this.program)
      }
    }
  },

  methods: {
    submitTravelForm() {
      let self = this;
      axios.post('./php/insertTravelOrder.php', {
        mem_no: this.info[0].MEM_NO,
        first_name: this.first_name,
        program: this.program,
        last_name: this.last_name,
        dep_time: this.dep_time,
        ord_add: this.address,
        pickup_place: this.pickup_place,
        people_num: this.people_num,
        phone: this.phone,
        email: this.email,
        discount: this.discount,
        remarks: this.remarks,
      })
        .then(function (response) {
          self.showPopUpBox = true;
          sessionStorage.clear();
        })
        .catch(function (error) {
          alert('留言失敗');
        })
    },
    closePopUpBox() {
      document.getElementById("slotmachine-pop-up").classList.remove('slot-hide');
      this.showPopUpBox = false;
    }
  }
})
