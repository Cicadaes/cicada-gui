import Vue from 'vue'

import App from './App'

// new Vue({
//   components: { App },
//   template: '<App/>'
// }).$mount('#root')

/* eslint-disable no-new */
new Vue({
  ...App // TypeError: Cannot read property 'extend' of undefined--HotModuleReplacementPlugin
}).$mount('#root')
