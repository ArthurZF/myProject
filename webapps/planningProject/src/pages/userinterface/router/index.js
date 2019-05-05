import Vue from 'vue'
import Router from 'vue-router'
import addthing from '../addthing/addthing'
import mydata from '../mydata/mydata'
Vue.use(Router)

export default new Router({
  routes: [
     {
       path: '/',
       redirect: 'mydata'
     },
    ,{
      path: '/addthing',
      name: "addthing",
      component: addthing,

    },
    {
      path: '/mydata',
      name: "mydata",
      component: mydata
    }
  ]
})