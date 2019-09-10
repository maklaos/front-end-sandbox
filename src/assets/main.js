window.Vue = require('vue');
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import axios from 'axios';
Vue.prototype.$axios = axios;
import './scss/main.scss';
import routes from './routes.js';

const router = new VueRouter({mode: 'history', routes});
new Vue({router}).$mount('#app');
