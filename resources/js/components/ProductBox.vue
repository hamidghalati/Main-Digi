<template>

    <div>
        <div id="product_list_info_div">
            <div class="product_list_box">

                <div class="header">
                    <ul class="list-inline">
                        <li><i class="fa fa-sort-amount-asc icon-sort"></i>مرتب سازی بر اساس :</li>
                        <li :class="sort==21 ? 'active'  : ''" v-on:click="set_sort(21)">
                            <a><span>پر بازدیدترین</span></a>
                        </li>
                        <li :class="sort==22 ? 'active'  : ''" v-on:click="set_sort(22)"><a><span>محبوب ترین</span></a>
                        </li>
                        <li :class="sort==23 ? 'active'  : ''" v-on:click="set_sort(23)"><a><span>جدیدترین</span></a>
                        </li>
                        <li :class="sort==24 ? 'active'  : ''" v-on:click="set_sort(24)"><a><span>ارزان ترین</span></a>
                        </li>
                        <li :class="sort==25 ? 'active'  : ''" v-on:click="set_sort(25)"><a><span>گران ترین</span></a>
                        </li>
                    </ul>
                </div>

                <div class="search_product_div product_list">


                    <div class="product_div" v-for="product in this.productList.data">
                        <div class="image_div">

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

                            <div class="compare_tag" v-if="compare=='yes'">
                                <p v-on:click="add_compare_list(product)">
                                <span
                                    :class="[has_compare_list(product.id,'no') ? 'check_box active' : 'check_box']"></span>
                                    <span style="padding-right: 5px">مقایسه</span>
                                </p>
                            </div>

                            <div v-if="product.status==1 && product.get_first_product_price !=null" class="price">
                                <div class="discount_div">
                                    <div
                                        v-if="product.get_first_product_price.price1 != product.get_first_product_price.price2">
                                        <!--                            <img :src="$siteUrl+'files/images/discount.png'" alt="">-->
                                        <del>
                                            {{replaceNumber(number_format(product.get_first_product_price.price1))}} تومان
                                        </del>
                                        <span class="discount-badge">
                                %{{getDiscountValue(product.get_first_product_price.price1, product.get_first_product_price.price2)}}
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

                        <div class="shop_name" v-if="product.status==1">
                            فروشنده : حمیدرضا سمیعی نیا
                        </div>

                    </div>


                    <div v-if="this.productList.data==0 && get_result" class="not_found_product_message">
                        محصولی برای نمایش یافت نشد
                    </div>

                    <pagination align="center" :data="productList" @pagination-change-page="getProduct"></pagination>

                </div>
            </div>
        </div>


        <div class="compare_product_list" v-if="compare_list.length>0 && show_compare"
             v-on:mouseleave="show_compare=false">
            <ul>
                <li v-for="item in compare_list">
                    <img v-bind:src="$siteUrl+'files/thumb/'+item.pic" alt="">
                    <span>{{ item.title }}</span>
                    <span v-on:click="remove_product_compare_list(item.product_id)"><i
                        class="text-danger fa fa-close"></i></span>
                </li>
            </ul>

            <span v-on:click="empty_compare_list" class="empty_compare_list">انصراف</span>

        </div>

        <a v-bind:href="compare_link" id="compare_list" v-if="compare_list.length>0" v-on:mousemove="show_compare=true">
            <div>
                <span>مقایسه</span>
                <span>{{ replaceNumber(compare_list.length) }}</span>
                <span>کالا</span>
            </div>
        </a>


    </div>


</template>

<script>
import myMixin from "../myMixin";

export default {
    name: "ProductBox",
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
    props:['compare'],
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
        $(document).on({
            mouseenter:function () {
                $('.compare_tag p',this).show();
            },
            mouseleave:function () {
                $('.compare_tag p',this).hide();
            }
        },".product_div");


        // $(document).on('click','.product_status_filter',function () {
        //     app.remove_product_status(this);
        // });
        // $(document).on('click','.send_status_filter',function () {
        //     app.remove_send_status_filter(this);
        // });


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
        add_compare_list: function (product) {

            const result = this.has_compare_list(product.id, 'ok')
            if (result.status == 'ok') {
                this.$delete(this.compare_list, result.key);
            } else {

                if (this.compare_list.length < 4) {
                    this.set_compare_link(product.id);
                    this.compare_list.push({product_id: product.id, title: product.title, pic: product.image_url});
                }
            }


        },
        has_compare_list: function (product_id, object) {
            let result = false;
            for (let i = 0; i < this.compare_list.length; i++) {
                if (this.compare_list[i].product_id == product_id) {
                    if (object == 'ok') {
                        result = {
                            'status': 'ok',
                            'key': i
                        };
                    } else {
                        result = true;
                    }
                }
            }
            return result;
        },
        remove_product_compare_list: function (product_id) {
            const result = this.has_compare_list(product_id, 'ok')
            if (result.status == 'ok') {
                this.$delete(this.compare_list, result.key);
            }
            this.compare_link = this.compare_link.replace("/dkp-" + product_id, '');
        },
        set_compare_link: function (product_id) {
            if (this.compare_link == '') {
                this.compare_link = this.$siteUrl + "compare"
            }
            this.compare_link += "/dkp-" + product_id;
        },
        empty_compare_list:function () {
            this.compare_link='';
            this.compare_list=[];
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
