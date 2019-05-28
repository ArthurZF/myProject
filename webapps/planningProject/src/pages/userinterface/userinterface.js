import Vue from 'vue'
import interfaces from './interfaces/interfaces.vue'
import router from './router'
import {
  post
} from '@/components/post.js'
import {
  Menu,
  MenuItem,
  Table,
  TableColumn,
  Button,
  Input,
  Loading,
  Notification,
  Select,
  Option,
  Message
} from 'element-ui';
import store from './store/store'


Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Loading.directive);
Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$post = post
Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
new Vue({
  el: '#interfaces',
  router,
  store,
  components: {
    interfaces
  },
  data:{
    eventHub:new Vue()
  },
  template: '<interfaces/>'
})