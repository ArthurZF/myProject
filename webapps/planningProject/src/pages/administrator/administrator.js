import Vue from 'vue'
import Admin from './admin/admin.vue'
import router from './router'
import store from './store/store'
import {
  Menu,
  MenuItem,
  Table,
  TableColumn,
  Button,
  Form,
  FormItem,
  Input,
  Radio,
  RadioGroup,
  Loading,
  Notification
} from 'element-ui';
import {
  post
} from '@/components/post.js'
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Loading.directive);
Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;
new Vue({
    el: '#admin',
    router,
    store,
    components: {
      Admin
    },
    template: '<Admin/>'
})