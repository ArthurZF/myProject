import Vue from 'vue'
import Router from 'vue-router'
import addthing from '../addthing/addthing'
import mydata from '../mydata/mydata'
import periodic from '../addthing/periodic'
import acyclic from '../addthing/acyclic'
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      redirect: 'mydata'
    }, {
      path: '/addthing',
      name: "addthing",
      component: addthing,
      redirect: '/addthing/periodic',
      children: [{
        path: 'periodic',
        name: "periodic",
        component: periodic,
      }, {
        path: 'acyclic',
        name: "acyclic",
        component: acyclic,
      }]
    },
    {
      path: '/mydata',
      name: "mydata",
      component: mydata
    }
  ]
})
