import Vue from 'vue'
import Registered from './vue/registered.vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Loading
} from 'element-ui';
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.config.productionTip = false

new Vue({
  el: '#registered',
  // router,
  components: {
    Registered
  },
  template: '<Registered/>'
})
