
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import store from './store'
import moment from 'moment'
window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component('app-component', require('./components/App.vue'));



Vue.filter('formatDate', function(value) {
	  if (value) {
	    return moment(String(value)).format('DD/MM/YYYY')
	  }
	})
	
Vue.filter('formatDateSave', function(value) {
	  if (value) {
	    return moment(String(value)).format('YYYY-MM-DD')
	  }
	})

const app = new Vue({
    el: '#app',
    store,
});
