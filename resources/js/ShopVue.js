window.Vue = require('vue');

Vue.component('pagination', require('shetabit-laravel-vue-pagination'));
import axios from 'axios';
import VueAxios from "vue-axios";
import Counter from "./components/Counter";
import OfferTime from "./components/OfferTime";
import ShoppingCart from "./components/ShoppingCart";
import AddressList from "./components/AddressList";




Vue.use(VueAxios,axios);
Vue.prototype.$siteUrl='http://127.0.0.1:8000/';


const app = new Vue({
    el: '#app',
    components:{
        Counter,
        OfferTime,
        ShoppingCart,
        AddressList,

    }
});
