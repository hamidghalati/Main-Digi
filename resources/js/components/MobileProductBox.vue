<template>

    <div>
        <a v-for="product in this.productList.data" v-bind:href="$siteUrl+'product/dkp-'+product.id+'/'+product.product_url">
           <div class="product_div">
               <div class="product_offer_div">
                   <div v-if="check_has_off(product)">
                       <product-offers-time :time="check_has_off(product)"></product-offers-time>
                   </div>
               </div>
               <div class="product_info_div">
                   <div class="image_box">
                       <span v-if="product.status==1 && product.get_first_product_price !=null" class="discount-badge" id="discount-badge_filter" >
                           <span  v-if="product.get_first_product_price.price1 != product.get_first_product_price.price2">
                               %{{ getDiscountValue(product.get_first_product_price.price1, product.get_first_product_price.price2) }}
                           </span>
                       </span>
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
                           <span>{{ replaceNumber(number_format(product.get_first_product_price.price2)) }} تومان </span>
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
            search_string: '',
            search_url: '',


        }
    },
    props: ['compare'],
    mixins: [myMixin],
    mounted() {
        // this.request_url=window.location.href.replace(this.$siteUrl,this.$siteUrl+'/getProduct/');
        const app = this;
        this.search_url=window.location.href;
        this.check_search_params(window.location.href);
        $(".selected_filter_item").show();
        this.set_product_sort();
        this.set_search_string();
        $(document).on('click', '.product_cat_ul li', function () {
            app.set_filter_event(this,app.search_url);
        });
        $(document).on('click', '#filter_link', function () {
            $(".selected_filter_item").show();
            $(".removed_tag").remove();
            app.getProduct(1);
        });

        this.getProduct();


    },
    methods: {
        getProduct: function (page = 1) {
            this.setPageUrl(this.search_url);
            this.hide_search_box();
            $("#loading").show();
            this.request_url = this.search_url.replace(this.$siteUrl, this.$siteUrl + 'getProduct/');
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
        getScoreValue:function (product) {
            let width=0;
            if (product.score_count > 0){
                width = product.score / (product.score_count * 6);
            }
            width*=20;
            return width;
        },
        add_url_query_string:function (key,value) {
            let url=this.search_url;
            let check=url.split(key);
            const n=check.length-1;
            const url_params=url.split('?');
            if (url_params[1]==undefined)
            {
                url=url+"?"+key+"["+n+"]="+value;
            }
            else {
                url=url+"&"+key+"["+n+"]="+value;
            }
            this.search_url=url;

        },
        hide_search_box:function () {
            $('body').css('overflow-y','auto');
            const width=$(window).width();
            const right="-"+width+"px";

            setTimeout(function () {
                $(".mobile_data_box").css({'right':right});
            },50)
        },
        changed_url:function (url) {
            this.search_url=url;
        },
        add_filter_tag:function (data,k,v) {
            $('#filter_div').show();
            data=data.toString().replace(",",'_').replace(",",'_');
            data=data.toString().replace("''",'').replace("",'');
            data="'"+data+"'";
            const el="li[data="+data+"]";
            const title=$(el).parent().parent().parent().parent().find('.title_box label').text();
            const html='<div class="selected_filter_item" data-key="'+k+'" data-value="'+v+'">'+
                '<span>'+
                title+":"+$(el).find('.title').text()+
                '</span>'+
                '<i id="selected_filter_item_remove" class="fa fa-close"></i>'+
                '</div>';
            $("#selected_filter_box").append(html);
        },
        add_active_filter:function (k,v) {
            if (k.length>1)
            {


                let data="";
                let filter_key=k[0];
                if (k.length==3)
                {
                    data=k[0]+"["+k[1]+"_param_"+v;
                    data="'"+data+"'";
                    filter_key=k[0]+"["+k[1];

                }
                else {
                    data=k[0]+"_param_"+v;

                }

                $('li[data='+data+'] .check_box').addClass('active');
                $('li[data='+data+']').parent().parent().slideDown();
                if ($('li[data='+data+']').length==1)
                {
                    this.add_filter_tag(data,filter_key,v);
                }
            }
            else {

                if (k=="has_product")
                {
                    this.set_enable_product_status_toggle();

                }
                else if (k=="has_ready_to_shipment")
                {
                    this.set_enable_status_toggle();
                }
            }
        },
        remove_filter_tag:function (k,v) {
            $('.selected_filter_item[data-key="'+k+'"][data-value='+v+']').addClass('removed_tag');
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
