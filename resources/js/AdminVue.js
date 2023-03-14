

window.Vue = require('vue');


 Vue.component('Cleave', require('vue-cleave-component'));
Vue.config.productionTip = false

import IncredibleOffers from './components/IncredibleOffers';
import axios from 'axios';
import VueAxios from "vue-axios";
import Counter from "./components/Counter";
import OrderStep from "./components/OrderStep";



Vue.use(VueAxios,axios);
Vue.prototype.$siteUrl='http://127.0.0.1:8000/';


const app = new Vue({
    el: '#app',
    components:{
        IncredibleOffers,
        Counter,
        OrderStep


    }
});
