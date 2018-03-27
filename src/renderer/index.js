import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'

Vue.use(VueRouter)

const routes = [
  { path: '/foo', component: { template: '<div>foo</div>' } },
  { path: '/bar.html', component: { template: '<div>bar</div>' } }
]
const router = new VueRouter({
  // mode: 'history', // Cannot GET /bar.html when reload(Hot Replace) `template: '<div>bar1</div>'`
  routes // equal routes: routes
})

// new Vue({
//   components: { App },
//   template: '<App/>'
// }).$mount('#root')

/* eslint-disable no-new */
new Vue({
  components: { App }, // TypeError: Cannot read property 'extend' of undefined--HotModuleReplacementPlugin
  template: '<App/>',
  router
}).$mount('#root')
