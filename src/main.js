import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import VueResource from 'vue-resource'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import store from './store/store';
import router from './router';

Vue.use(BootstrapVue)
Vue.use(VueResource);

Vue.http.options.root = 'https://stock-trader-ff98d.firebaseio.com/';

Vue.filter('currency', (value) => {
  return value.toLocaleString() + '$';
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
