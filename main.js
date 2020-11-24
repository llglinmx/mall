import Vue from 'vue'
import App from './App'

import {
	request
} from './static/js/ajax.js'
import components from 'static/js/components.js'

import store from './store/index.js' //引入vuex

Vue.prototype.$components = components

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	 store
})
app.$mount()

