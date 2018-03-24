import Vue from 'vue'

import App from './App'

// new Vue({
//   components: { App },
//   template: '<App/>'
// }).$mount('#root')

/* eslint-disable no-new */
new Vue({
    ...App
}).$mount('#root')
