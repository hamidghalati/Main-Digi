<template>

    <div>

        <div id="cat_product_list">
            <a v-for="product in this.productList.data"
               v-bind:href="$siteUrl+'product/dkp-'+product.id+'/'+product.product_url">
                <div class="product_div">
                    <div class="product_offer_div">
                        <div v-if="check_has_off(product)">
                            <product-offers-time :time="check_has_off(product)"></product-offers-time>
                        </div>
                    </div>
                    <div class="product_info_div">
                        <div class="image_box">
                            <div v-if="product.get_first_product_price.price1 != product.get_first_product_price.price2">
                                <!--                            <img :src="$siteUrl+'files/images/discount.png'" alt="">-->
                                <span class="discount-badge" id="discount-badge_filter">
                                %{{getDiscountValue(product.get_first_product_price.price1, product.get_first_product_price.price2)}}
                            </span>
                            </div>
                            <img v-bind:src="$siteUrl+'files/thumb/'+product.image_url" alt="">
                        </div>
                        <div class="info">
                            <div class="product_info">
                                <span class="title">{{ product.title }}</span>
                            </div>


                            <div style="display: flex;align-items: center" v-if="product.score_count>0">

                                <span> {{ replaceNumber(product.score_count) }} نفر </span>
                                <div class="score">
                                    <div class="gray">
                                        <div class="red" :style="{width:getScoreValue(product)+'%'}"></div>
                                    </div>
                                </div>

                            </div>

                            <!--                       <div class="score">-->
                            <!--                           <div class="gray" v-if="product.score_count>0">-->
                            <!--                               <span> {{ replaceNumber(product.score_count) }} نفر </span>-->
                            <!--                               <div class="red" :style="{width:getScoreValue(product)+'%'}"></div>-->
                            <!--                           </div>-->
                            <!--                       </div>-->

                            <div v-if="product.status==1 && product.get_first_product_price !=null" class="price">
                                <div class="discount_div">
                                    <div
                                        v-if="product.get_first_product_price.price1 != product.get_first_product_price.price2">
                                        <!--                            <img :src="$siteUrl+'files/images/discount.png'" alt="">-->
                                        <del>
                                            {{ replaceNumber(number_format(product.get_first_product_price.price1)) }} تومان
                                        </del>
                                        <!--                                   <span class="discount-badge" id="discount-badge_filter" >-->
                                        <!--                                %{{ getDiscountValue(product.get_first_product_price.price1, product.get_first_product_price.price2) }}-->
                                        <!--                                   </span>-->
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
                    </div>
                </div>
            </a>


            <div v-if="this.productList.data==0 && get_result &&  !show_loading_box" class="not_found_product_message">
                محصولی برای نمایش یافت نشد
            </div>

            <div id="loading2" v-if="show_loading_box">
                <span class="loader"></span>
            </div>

        </div>



        <!-- Modal -->
        <div class="modal fade" id="sort_dialog_box" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">مرتب سازی بر اساس</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-inline sort_ul">
                            <li>
                                <input v-model="sort" value="21" type="radio" id="radio1" name="sort">
                                <label v-on:click="set_sort(21)" for="radio1">پر بازدیدترین</label>
                            </li>
                            <li>
                                <input v-model="sort" value="22" type="radio" id="radio2" name="sort">
                               <label v-on:click="set_sort(22)" for="radio2">محبوب ترین</label>
                            </li>
                            <li>
                                <input v-model="sort" value="23" type="radio" id="radio3" name="sort">
                                <label v-on:click="set_sort(23)" for="radio3">جدیدترین</label>
                            </li>
                            <li>
                                <input v-model="sort" value="24" type="radio" id="radio4" name="sort">
                               <label v-on:click="set_sort(24)" for="radio4">ارزان ترین</label>
                            </li>
                            <li>
                                <input v-model="sort" value="25" type="radio" id="radio5" name="sort">
                                <label v-on:click="set_sort(25)" for="radio5">گران ترین</label>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
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
            search_string: '',
            search_url: '',
            sort: 21,
            page:1,
            product_box_height:0,
            scroll_height:0,
            getServerData:'ok',
            show_loading_box:true,
            send_request:true,


        }
    },
    props: ['compare'],
    mixins: [myMixin],
    mounted() {
        // this.request_url=window.location.href.replace(this.$siteUrl,this.$siteUrl+'/getProduct/');
        const app = this;
        this.search_url = window.location.href;
        this.check_search_params(this.search_url);
        $(".selected_filter_item").show();
        this.set_product_sort();
        // this.set_search_string();
        $(document).on('click', '.product_cat_ul li', function () {
            app.set_filter_event(this, app.search_url);
        });
        $(document).on('click', '#filter_link', function () {
            $(".selected_filter_item").show();
            $('.removed_tag').remove();
            app.getServerData='ok';
            app.productList.data=[];
            app.page=1;
            app.getProduct();
        });

        $(document).on('click', '#remove_all_filter', function () {
            app.remove_all_filter(app.search_url);
        });
        $(document).on('toggle', '#product_status', function (e, action) {
            app.set_product_status(e, action);

        });
        $(document).on('toggle', '#send_status', function (e, action) {
            app.set_send_status(e, action);
        });
        $(document).on('click', '.selected_filter_item', function () {
            $(".selected_filter_item").show();
            $(".removed_tag").remove();
            // $(".product_status_filter").remove();
            app.remove_filter_item(this);
            app.page=1;
            app.getProduct();
        });
        $(window).scroll(function (e) {
            app.checkScroll($(document).scrollTop());
        });
        this.getProduct();


    },
    methods: {
        getProduct: function () {
            if (this.send_request==true)
            {
                this.send_request=false;
                const app=this;
                this.setFilterPrice();
                this.setPageUrl(this.search_url);
                this.hide_search_box();
                this.show_loading_box=true;
                this.request_url = this.search_url.replace(this.$siteUrl, this.$siteUrl + 'getProduct/');
                this.axios.get(this.get_request_url(this.request_url, this.page)).then(response => {
                    response.data['product'].data.forEach(function (item) {
                        app.productList.data.push(item) ;
                    });

                    if (response.data['product'].data.length==0){
                        this.getServerData='no';
                    }

                    this.setRangeSlider(response.data.max_price);
                    this.show_loading_box=false;
                    this.get_result = true;

                    // if (response.data['count'] != undefined) {
                    //     $("#product_count").text(this.replaceNumber(response.data['count']) + " کالا ")
                    // }
                    this.$nextTick(function () {
                        const h=$("#cat_product_list")[0].scrollHeight;
                        this.product_box_height=h;
                    });
                    this.send_request=true;
                }).catch(error=>{
                    this.show_loading_box=false;
                    this.send_request=true;
                });
            }

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
        getScoreValue: function (product) {
            let width = 0;
            if (product.score_count > 0) {
                width = product.score / (product.score_count * 6);
            }
            width *= 20;
            return width;
        },
        add_url_query_string: function (key, value) {
            let url = this.search_url;
            let check = url.split(key);
            const n = check.length - 1;
            const url_params = url.split('?');
            if (url_params[1] == undefined) {
                url = url + "?" + key + "[" + n + "]=" + value;
            } else {
                url = url + "&" + key + "[" + n + "]=" + value;
            }
            this.search_url = url;

        },
        hide_search_box: function () {
            $('body').css('overflow-y', 'auto');
            const width = $(window).width();
            const right = "-" + width + "px";

            setTimeout(function () {
                $(".mobile_data_box").css({'right': right});
            }, 50)
        },
        changed_url: function (url) {
            this.search_url = url;
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
        add_active_filter: function (k, v) {
            if (k.length > 1) {
                let data = "";
                let filter_key = k[0];
                if (k.length == 3) {
                    data = k[0] + "[" + k[1] + "_param_" + v;
                    data = "'" + data + "'";
                    filter_key = k[0] + "[" + k[1];

                } else {
                    data = k[0] + "_param_" + v;

                }

                $('li[data=' + data + '] .check_box').addClass('active');
                $('li[data=' + data + ']').parent().parent().slideDown();
                if ($('li[data=' + data + ']').length == 1) {
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
        remove_filter_tag: function (k, v) {
            $('.selected_filter_item[data-key="'+k+'"][data-value="'+v+'"]').addClass('removed_tag');
        },
        setFilterPrice:function () {
            if (this.max_price>0){
                this.search_url=this.add_url_param('price[min]',this.min_price);
                this.search_url=this.add_url_param('price[max]',this.max_price);
            }

        },
        add_url_param:function (key,value) {
            let params=new window.URLSearchParams(window.location.search);
            let url=this.search_url;
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
                    url=url+"?"+key+"="+value;
                }
                else {
                    url=url+"&"+key+"="+value;
                }
            }
           return url;
        },
        set_product_status:function (e,action) {
            if (action)
            {
                this.search_url=this.add_url_param('has_product',1);

                if (!$("#selected_filter_box").find('div').hasClass('product_status_filter'))
                {
                    $("#filter_div").show();
                    const html= '<div class="selected_filter_item product_status_filter">'+
                        '<span>فقط کالاهای موجود</span> <i id="selected_filter_item_remove" class="fa fa-close"></i>'
                        +'</div>';
                    $('#selected_filter_box').append(html);
                }
                else {
                    $('.product_status_filter').removeClass('removed_tag');
                }

            }
            else {
                this.remove_url_params('has_product',1,this.search_url);
                $('.product_status_filter').addClass('removed_tag');
            }
        },
        set_send_status:function (e,action) {
            if (action)
            {
               this.search_url=this.add_url_param('has_ready_to_shipment',1);

                if (!$("#selected_filter_box").find('div').hasClass('send_status_filter'))
                {
                    $("#filter_div").show();
                    const html= '<div class="selected_filter_item send_status_filter">'+
                        '<span>کالاهای آماده ارسال</span> <i id="selected_filter_item_remove" class="fa fa-close"></i>'
                        +'</div>';
                    $('#selected_filter_box').append(html);
                }
                else {
                    $('.send_status_filter').removeClass('removed_tag');
                }

            }
            else {
                this.remove_url_params('has_ready_to_shipment',1,this.search_url);
                $('.send_status_filter').addClass('removed_tag');
            }
        },
        remove_filter_item:function (el) {
            const key=$(el).attr('data-key');
            const value=$(el).attr('data-value');
            if (key && value)
            {
                this.remove_url_query_string(key,value,this.search_url);
                $(el).remove();

                const data=key+"_param_"+value;
                $('li[data="'+data+'"] .check_box').removeClass('active');

                if ($('#selected_filter_box div').length==0)
                {
                    $("#filter_div").hide();
                }
                app.getServerData='ok';
                this.page=1;
                this.productList.data=[];
                this.getProduct();

            }
            else if ($(el).hasClass('product_status_filter')) {
                this.remove_product_status(el);
                app.getServerData='ok';
                this.page=1;
                this.productList.data=[];
                this.getProduct();
            }
            else if ($(el).hasClass('send_status_filter')) {
                this.remove_send_status_filter(el);
                app.getServerData='ok';
                this.page=1;
                this.productList.data=[];
                this.getProduct();
            }

        },
        remove_product_status:function (el) {
            $(el).remove();
            this.remove_url_params('has_product','1');
            $('#product_status').click();
            app.getServerData='ok';
            this.page=1;
            this.productList.data=[];
            this.getProduct();
            // $('#product_status').toggles({
            //     type: 'Light',
            //     text: {'on': '', 'off': ''},
            //     width: 50,
            //     direction: 'rtl',
            //     on: false
            // });
        },
        remove_send_status_filter:function (el) {
            $(el).remove();
            this.remove_url_params('has_ready_to_shipment','1');

            $('#send_status').click();
            app.getServerData='ok';
            this.page=1;
            this.productList.data=[];
            this.getProduct();
            // $('#send_status').toggles({
            //     type: 'Light',
            //     text: {'on': 'آماده ارسال', 'off': 'در حال آماده'},
            //     width: 85,
            //     direction: 'rtl',
            //     on: false
            // });
        },
        set_sort:function (value) {
            this.sort=value;
            this.search_url=this.add_url_param('sortby',value);
            $("#sort_dialog_box").modal('hide');
            this.productList.data=[];
            app.getServerData='ok';
            this.page=1;
            this.getProduct();
        },
        checkScroll:function (h) {
            if(h>(this.product_box_height/2) && this.product_box_height>200 && h>this.scroll_height && this.getServerData=='ok')
            {
                this.page=this.page+1;
                this.getProduct();
            }
            if (h>this.scroll_height)
            {
                this.scroll_height=h;
            }
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
