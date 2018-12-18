import Vue from 'vue';
import VueRouter from 'vue-router'


import CreditMSVPage from './pages/creditMSV.page'
Vue.use(VueRouter)


const routes = [
  { path: '/', component: CreditMSVPage },

]
const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
