window.Vue = require('vue');
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import axios from 'axios';
Vue.prototype.$axios = axios;
import './scss/main.scss';
import routes from './routes.js';

Vue.use(require('vue-resource'));
Vue.http.options.emulateJSON = true;
Vue.http.options.crossOrigin = true;

import test_component from './components/partials/test-component.vue';
Vue.component('test-component', test_component);

const router = new VueRouter({mode: 'history', routes});
new Vue({router}).$mount('#app');
