<template>

    <div>

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
                                        {{ replaceNumber(number_format(product.get_first_product_price.price1)) }} تومان
                                    </del>
                                    <span class="discount-badge">
                                %{{
                                            getDiscountValue(product.get_first_product_price.price1, product.get_first_product_price.price2)
                                        }}
                            </span>
                                </div>
                            </div>
                            <span>{{
                                    replaceNumber(number_format(product.get_first_product_price.price2))
                                }} تومان </span>
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

            <div class="col-12">
                <div class="row">
                    <div class="paginate_div">
                        <pagination :data="productList" @pagination-change-page="getProduct"></pagination>
                    </div>
                </div>
            </div>

        </div>


        <div class="compare_product_list" v-if="compare_list.length>0 && show_compare"
             v-on:mouseleave="show_compare=false">
            <ul>
                <li v-for="item in compare_list">
                    <img v-bind:src="$siteUrl+'files/thumb/'+item.pic" alt="">
                    <span style="width: 100%">{{ item.title }}</span>
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
        $(document).on({
            mouseenter: function () {
                $('.compare_tag p', this).show();
            },
            mouseleave: function () {
                $('.compare_tag p', this).hide();
            }
        }, ".product_div");

        this.check_search_params();
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
        empty_compare_list: function () {
            this.compare_link = '';
            this.compare_list = [];
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
        remove_all_filter: function () {
            let url = window.location.href;
            url = url.split('?')[0];
            this.setPageUrl(url);
            $('.selected_filter_item').remove();
            $("#filter_div").hide();
            $('.filter_box .list-inline li').find('.check_box').removeClass('active');
            if ($('#product_status .toggle-slide .toggle-on').hasClass('active')) {
                $('#product_status').click();
            }
            if ($('#send_status .toggle-slide .toggle-on').hasClass('active')) {
                $('#send_status').click();
            }
            if (this.noUiSlider) {
                this.noUiSlider.reset();
            }
            this.getProduct(1);
        },
        changed_url: function (url) {
            this.setPageUrl(url);
            this.getProduct(1);
        },
        add_active_filter: function (k, v) {
            if (k.length > 1) {
                let data="";
                let filter_key = k[0];
                if (k.length == 3) {

                    data = k[0] + "[" + k[1] + "_param_" + v;
                    data = "'"+data+"'";
                    filter_key = k[0] + "[" + k[1];

                } else {
                    data = k[0] + "_param_" + v;

                }
                $('li[data='+data+'] .check_box').addClass('active');
                $('li[data='+data+']').parent().parent().slideDown();
                if ($('li[data='+data+']').length == 1) {
                    this.add_filter_tag(data, filter_key, v);
                }
            } else {

                if (k == "has_product") {
                    this.set_enable_product_status_toggle();

                } else if (k == "has_ready_to_shipment") {
                    this.set_enable_status_toggle();
                }
            }
        },
        add_url_query_string: function (key, value) {
            let url = window.location.href;
            let check = url.split(key);
            const n = check.length - 1;
            const url_params = url.split('?');
            if (url_params[1] == undefined) {
                url = url + "?" + key + "[" + n + "]=" + value;
            } else {
                url = url + "&" + key + "[" + n + "]=" + value;
            }

            this.setPageUrl(url);
            this.getProduct(1);

        },
        remove_filter_tag:function (k,v) {
            $('.selected_filter_item[data-key="'+k+'"][data-value='+v+']').remove();
            if ($("selected_filter_box div").length==0){
                $("#filter_div").hide();
            }
        },
        setFilterPrice:function () {
            this.add_url_param('price[min]',this.min_price);
            this.add_url_param('price[max]',this.max_price);
            this.getProduct(1);
        },
        add_url_param:function (key,value) {
            let params=new window.URLSearchParams(window.location.search);
            let url=window.location.href;
            if (params.get(key)!=null)
            {
                let old_param=key+"="+encodeURIComponent(params.get(key));
                let new_param=key+"="+value;
                url=url.replace(old_param,new_param);

            }
            else {
                const url_params=url.split('?');
                if (url_params[1]==undefined)
                {
                    url+="?"+key+"="+value;
                }
                else {
                    url+="&"+key+"="+value;
                }
            }
            this.setPageUrl(url);
        },
        set_product_status:function (e,action) {
            if (action)
            {
                this.add_url_param('has_product',1);
                this.getProduct(1);


                if (!$("#selected_filter_box").find('div').hasClass('product_status_filter'))
                {
                    $("#filter_div").show();
                    const html= '<div class="selected_filter_item product_status_filter">'+
                        '<span>فقط کالاهای موجود</span> <i id="selected_filter_item_remove" class="fa fa-close"></i>'
                        +'</div>';
                    $('#selected_filter_box').append(html);
                }

            }
            else {
                this.remove_url_params('has_product',1);
                this.getProduct(1);

                $('.product_status_filter').remove();
                if ($('#selected_filter_box div').length==0)
                {
                    $("#filter_div").hide();
                }
            }
        },
        set_send_status:function (e,action) {
            if (action)
            {
                this.add_url_param('has_ready_to_shipment',1);
                this.getProduct(1);

                if (!$("#selected_filter_box").find('div').hasClass('send_status_filter'))
                {
                    $("#filter_div").show();
                    const html= '<div class="selected_filter_item send_status_filter">'+
                        '<span>کالاهای آماده ارسال</span> <i id="selected_filter_item_remove" class="fa fa-close"></i>'
                        +'</div>';
                    $('#selected_filter_box').append(html);
                }

            }
            else {
                this.remove_url_params('has_ready_to_shipment',1);
                this.getProduct(1);

                $('.send_status_filter').remove();
                if ($('#selected_filter_box div').length==0)
                {
                    $("#filter_div").hide();
                }
            }
        },
        add_filter_tag: function (data, k, v) {
            $("#filter_div").show();
            data = data.toString().replace(",", '_').replace(",", '_');
            data = data.toString().replace("'", '').replace("'", '');
            data = "'" + data + "'";
            const el = "li[data=" + data + "]";
            const title = $(el).parent().parent().parent().parent().find('.title_box label').text();
            const html = '<div class="selected_filter_item" data-key="' + k + '" data-value="' + v + '">' +
                '<span>' +
                title + ":" + $(el).find('.title').text() +
                '</span>' +
                '<i id="selected_filter_item_remove" class="mdi mdi-close"></i>' +
                '</div>';
            $("#selected_filter_box").append(html);
        },
        remove_filter_item:function (el) {
            const key=$(el).attr('data-key');
            const value=$(el).attr('data-value');
            if (key && value)
            {
                this.remove_url_query_string(key,value);
                $(el).remove();

                const data=key+"_param_"+value;
                $('li[data="'+data+'"] .check_box').removeClass('active');

                if ($('#selected_filter_box div').length==0)
                {
                    $("#filter_div").hide();
                }

            }
            else if ($(el).hasClass('product_status_filter')) {
                this.remove_product_status(el);
            }
            else if ($(el).hasClass('send_status_filter')) {
                this.remove_send_status_filter(el);
            }

        },
        remove_product_status:function (el) {
            $(el).remove();
            this.remove_url_params('has_product','1');

            $('#product_status').click();
        },
        remove_send_status_filter:function (el) {
            $(el).remove();
            this.remove_url_params('has_ready_to_shipment','1');

            $('#send_status').unbind('click');
            $('#send_status').toggles({
                type: 'Light',
                text: {'on': 'آماده ارسال', 'off': 'در حال آماده'},
                width: 85,
                direction: 'rtl',
                on: false
            });
        },
        set_sort:function (value) {
            this.sort=value;
            this.add_url_param('sortby',value);
            this.getProduct(1);
        },

    }
}
</script>

<style scoped>

</style>

