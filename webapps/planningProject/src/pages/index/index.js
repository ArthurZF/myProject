// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './vue/index.vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Checkbox,
  Message
} from 'element-ui';
Vue.use(Button) 
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.prototype.$message = Message;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
})
