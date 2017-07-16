// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import $ from 'jquery'
import bootstrap from 'bootstrap'
import store from './vuex/store'

Vue.use(VueResource);
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true;
Vue.http.headers.common['Content-Type'] = 'application/json';
/* eslint-disable no-new */



new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})
