<template>

    <div>
        <div class="product_div" v-for="product in this.productList.data">
            <div class="image_div">

                <div class="product_offer_div">
                    <div v-if="check_has_off(product)">
                        <product-offers-time :time="check_has_off(product)"></product-offers-time>

                    </div>
                </div>

                <ul class="color_box list-inline">
                    <li v-for="(color,key) in product.get_product_color"
                        v-if="color.get_color != null && key<3">
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
                    <p class="title">{{ product.title }}</p>
                </a>



                <div v-if="product.status==1 && product.get_first_product_price !=null" class="price">
                    <div class="discount_div">
                        <div
                            v-if="product.get_first_product_price.price1 != product.get_first_product_price.price2">
                            <!--                            <img :src="$siteUrl+'files/images/discount.png'" alt="">-->
                            <del>
                                {{ replaceNumber(number_format(product.get_first_product_price.price1)) }} تومان
                            </del>
                            <span class="discount-badge">
                                %{{ getDiscountValue(product.get_first_product_price.price1, product.get_first_product_price.price2) }}
                            </span>
                        </div>
                    </div>
                    <span>{{ replaceNumber(number_format(product.get_first_product_price.price2)) }} تومان </span>
                </div>
                <div v-else class="product_status">
                    <div>
                        <p class="line"></p>
                        <span>ناموجود</span>
                    </div>
                </div>

            </div>

            <div class="shop_name" v-if="product.status==1">
                فروشنده : حمیدرضا سمیعی نیا
            </div>

        </div>


        <div v-if="this.productList.data==0 && get_result" class="not_found_product_message">
            محصولی برای نمایش یافت نشد
        </div>
    </div>

</template>

<script>
import myMixin from "../myMixin";
import ProductOffersTime from "./ProductOffersTime";

export default {
    name: "ProductBox",
    components: {ProductOffersTime},
    data() {
        return {
            productList: {data: []},
            request_url: '',
            noUiSlider: null,
            min_price: 0,
            max_price: 0,
            get_result: false,
            sort: 21,
            search_string: '',
            compare_list: [],
            show_compare: false,
            compare_link: ''
        }
    },
    props: ['compare'],
    mixins: [myMixin],
    mounted() {
        // this.request_url=window.location.href.replace(this.$siteUrl,this.$siteUrl+'/getProduct/');
        const app = this;
        this.check_search_params();
        this.set_product_sort();
        this.set_search_string();
        $(document).on('click', '#price_filter_btn', function () {
            app.setFilterPrice();
        });
        $(document).on('click', '.product_cat_ul li', function () {
            app.set_filter_event(this);
        });
        $(document).on('keyup', '#search_input', function (event) {
            app.search_product(event, this);
        });
        $(document).on('toggle', '#product_status', function (e, action) {
            app.set_product_status(e, action);

        });
        $(document).on('toggle', '#send_status', function (e, action) {
            app.set_send_status(e, action);
        });
        $(document).on('click', '.selected_filter_item', function () {
            app.remove_filter_item(this);
        });
        $(document).on('click', '#remove_all_filter', function () {
            app.remove_all_filter();
        });



        this.getProduct();


    },
    methods: {
        getProduct: function (page = 1) {
            $("#loading").show();
            this.request_url = window.location.href.replace(this.$siteUrl, this.$siteUrl + 'getProduct/');
            this.axios.get(this.get_request_url(this.request_url, page)).then(response => {
                this.productList = response.data['product'];
                this.setRangeSlider(response.data.max_price);
                $("#loading").hide();
                this.get_result = true;

                if (response.data['count'] != undefined) {
                    $("#product_count").text(this.replaceNumber(response.data['count']) + " کالا ")
                }

            });
        },

        check_has_off: function (product) {
            if (product.get_first_product_price != null) {
                const last_time = product.get_first_product_price.offers_last_time;
                const time = Math.floor(Date.now() / 1000);
                if (product.get_first_product_price.offers == 1 && (last_time - time) > 0) {
                    return (last_time - time);
                } else {
                    return false;
                }
            } else {
                return false;
            }

        },
        remove_all_filter:function () {
            let url=window.location.href;
            url=url.split('?')[0];
            this.setPageUrl(url);
            $('.selected_filter_item').remove();
            $("#filter_div").hide();
            $('.filter_box .list-inline li').find('.check_box').removeClass('active');
            if ($('#product_status .toggle-slide .toggle-on').hasClass('active'))
            {
                $('#product_status').click();
            }
            if ($('#send_status .toggle-slide .toggle-on').hasClass('active'))
            {
                $('#send_status').click();
            }
            if (this.noUiSlider)
            {
                this.noUiSlider.reset();
            }
            this.getProduct(1);
        }


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
