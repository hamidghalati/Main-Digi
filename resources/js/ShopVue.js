window.Vue = require('vue');

Vue.component('pagination', require('shetabit-laravel-vue-pagination'));
import axios from 'axios';
import VueAxios from "vue-axios";
import Counter from "./components/Counter";
import OfferTime from "./components/OfferTime";
import ShoppingCart from "./components/ShoppingCart";
import AddressList from "./components/AddressList";
import GiftCart from "./components/GiftCart";
import DiscountBox from "./components/DiscountBox";
import ProductBox from "./components/ProductBox";
import CompareProductList from "./components/CompareProductList";
import CommentList from "./components/CommentList";
import VueChart from "./components/VueChart";
import HeaderCart from "./components/HeaderCart";
import OtherPrice from "./components/OtherPrice";




Vue.use(VueAxios,axios);
Vue.prototype.$siteUrl='http://127.0.0.1:8000/';


const app = new Vue({
    el: '#app',
    components:{
        Counter,
        OfferTime,
        ShoppingCart,
        AddressList,
        GiftCart,
        DiscountBox,
        ProductBox,
        CompareProductList,
        CommentList,
        VueChart,
        HeaderCart,
        OtherPrice

    }
});
