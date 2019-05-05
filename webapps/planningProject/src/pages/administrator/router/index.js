import Vue from 'vue'
import Router from 'vue-router'
import account from '../account/account'
import application from '../application/application'
import management from '../management/management'
import changeCount from '../management/changeCount/changeCount'
import changePassword from '../management/changePassword/changePassword'
import changePersonality from '../management/changePersonality/changePersonality'
Vue.use(Router)

export default new Router({
  routes: [
     {
       path: '/',
       redirect: 'account'
     },
    ,{
      path: '/account',
      name: "account",
      component: account,

    },
    {
      path: '/application',
      name: "application",
      component: application
    },
    {
      path: '/management',
      name: "management",
      component: management,
      redirect: '/management/changeCount',
      children:[{
        name:"changeCount",
        path: 'changeCount',
        component: changeCount,
      }, {
        name:"changePassword",
          path: 'changePassword',
          component: changePassword,
        }, {
          name:"changePersonality",
          path: 'changePersonality',
          component: changePersonality,
        }]
    }
  ]
})