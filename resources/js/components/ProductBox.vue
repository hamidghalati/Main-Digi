<template>

    <div class="product_list_box">

        <div class="header">
            <ul class="list-inline">
                <li><i class="fa fa-sort-amount-asc icon-sort"></i>مرتب سازی بر اساس :</li>
                <li :class="sort==21 ? 'active'  : ''" v-on:click="set_sort(21)"><a><span>پر بازدیدترین</span></a></li>
                <li :class="sort==22 ? 'active'  : ''" v-on:click="set_sort(22)"><a><span>محبوب ترین</span></a></li>
                <li :class="sort==23 ? 'active'  : ''" v-on:click="set_sort(23)"><a><span>جدیدترین</span></a></li>
                <li :class="sort==24 ? 'active'  : ''" v-on:click="set_sort(24)"><a><span>ارزان ترین</span></a></li>
                <li :class="sort==25 ? 'active'  : ''" v-on:click="set_sort(25)"><a><span>گران ترین</span></a></li>
            </ul>
        </div>

        <div class="product_list">

            <div class="product_div" v-for="product in this.productList.data">
                <div class="image_div">

                    <ul class="color_box list-inline">
                        <li v-for="(color,key) in product.get_product_color" v-if="color.get_color != null && key<3">
                            <label for="" :style="{background:color.get_color.code}"></label>
                        </li>

                        <li v-if="product.get_product_color.length>3">
                            <span class="fa fa-plus"></span>
                        </li>
                    </ul>

                    <a v-bind:href="$siteUrl+'product/dkp-'+product.id+'/'+product.product_url">
                        <img v-bind:src="$siteUrl+'files/thumb/'+product.image_url" alt="">
                    </a>
                </div>

                <div class="info">
                    <a v-bind:href="$siteUrl+'product/dkp-'+product.id+'/'+product.product_url">
                        <p class="title">{{product.title}}</p>
                    </a>

                    <div v-if="product.status==1 && product.get_first_product_price !=null" class="price">
                        <div class="discount_div">
                            <div v-if="product.get_first_product_price.price1 != product.get_first_product_price.price2">
                                <!--                            <img :src="$siteUrl+'files/images/discount.png'" alt="">-->
                                <del>
                                    {{replaceNumber(number_format(product.get_first_product_price.price1))}} تومان
                                </del>
                                <span class="discount-badge">
                                %{{getDiscountValue(product.get_first_product_price.price1,product.get_first_product_price.price2)}}
                            </span>
                            </div>
                        </div>
                        <span>{{replaceNumber(number_format(product.get_first_product_price.price2))}} تومان </span>
                    </div>
                    <div v-else class="product_status">
                        <div>
                            <p class="line"></p>
                            <span>ناموجود</span>
                        </div>
                    </div>

                </div>

            </div>

            <div v-if="this.productList.data==0 && get_result" class="not_found_product_message">
                محصولی برای نمایش یافت نشد
            </div>

            <pagination align="center" :data="productList" @pagination-change-page="getProduct"></pagination>

        </div>
    </div>


</template>

<script>
import myMixin from "../myMixin";

export default {
    name: "ProductBox",
    data(){
        return{
            productList: {data:[]},
            request_url:'',
            noUiSlider:null,
            min_price:0,
            max_price:0,
            get_result:false,
            sort:21
        }
    },
    mixins:[myMixin],
    mounted() {
        // this.request_url=window.location.href.replace(this.$siteUrl,this.$siteUrl+'/getProduct/');
        const app=this;
        this.check_search_params();
        this.set_product_sort();
        $(document).on('click','#price_filter_btn',function () {
            app.setFilterPrice();
        });
        $(document).on('click','.product_cat_ul li',function () {
          app.set_filter_event(this);
        });
        this.getProduct();



    },
    methods:{
        getProduct:function (page=1) {
            $("#loading").show();
            this.request_url=window.location.href.replace(this.$siteUrl,this.$siteUrl+'/getProduct/');
            this.axios.get(this.get_request_url(this.request_url,page)).then(response=>{
                this.productList=response.data['product'];
               this.setRangeSlider(response.data.max_price);
                $("#loading").hide();
                this.get_result=true;
            });
        },




    }
}
</script>

<style scoped>

</style>






















// else {
//     this.noUiSlider.updateOptions({
//         start: [0, price],
//         range: {
//             'min': 0,
//             'max': price
//         },
//     });
// }
