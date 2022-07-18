import VueAxios from "vue-axios";

window.Vue = require('vue');


// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
import IncredibleOffers from './components/IncredibleOffers';
import axios from 'axios';
Vue.use(VueAxios,axios);
Vue.prototype.$siteUrl='http://127.0.0.1:8000/';


const app = new Vue({
    el: '#app',
    components:{
        IncredibleOffers
    }
});
