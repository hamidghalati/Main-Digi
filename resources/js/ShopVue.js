window.Vue = require('vue');

// Vue.component('pagination', require('laravel-vue-pagination'));
// import Paginate from 'vuejs-paginate'
// Vue.component('paginate', Paginate)

Vue.component('pagination', require('laravel-vue-semantic-ui-pagination'));


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
import MobileOtherPrice from "./components/MobileOtherPrice";
import MobileShoppingCart from "./components/MobileShoppingCart";
import MobileAddressList from "./components/MobileAddressList";
import MobileAddressForm from "./components/MobileAddressForm";
import MobileProductBox from "./components/MobileProductBox";
import MobileThemeCommentList from "./components/MobileThemeCommentList";
import ProfileAddress from "./components/ProfileAddress";
import QuestionList from "./components/QuestionList";
import LoginBox from "./components/LoginBox";
import FavoriteList from "./components/FavoriteList";





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
        OtherPrice,
        MobileOtherPrice,
        MobileShoppingCart,
        MobileAddressList,
        MobileAddressForm,
        MobileProductBox,
        MobileThemeCommentList,
        ProfileAddress,
        QuestionList,
        LoginBox,
        FavoriteList



    }
});
