

window.Vue = require('vue');

Vue.component('pagination', require('laravel-vue-pagination'));


import IncredibleOffers from './components/IncredibleOffers';
import axios from 'axios';
import VueAxios from "vue-axios";
Vue.use(VueAxios,axios);
Vue.prototype.$siteUrl='http://127.0.0.1:8000/';


const app = new Vue({
    el: '#app',
    components:{
        IncredibleOffers
    }
});
