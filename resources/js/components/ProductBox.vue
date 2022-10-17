<template>

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

        <pagination align="center" :data="productList" @pagination-change-page="getProduct"></pagination>

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


        }
    },
    mixins:[myMixin],
    mounted() {
        this.request_url=window.location.href.replace(this.$siteUrl,this.$siteUrl+'/getProduct/');
        const app=this;
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
            this.axios.get(this.request_url+"?page="+page).then(response=>{
                this.productList=response.data['product'];
               this.setRangeSlider(response.data.max_price);
                $("#loading").hide();
            });
        },
        setRangeSlider:function (price) {
            const app=this;
            var slider = document.querySelector('.price_range_slider');
            if (this.noUiSlider==null)
            {

                this.noUiSlider=noUiSlider.create(slider, {
                    start: [0, price],
                    connect:true,
                    direction:'rtl',
                    range: {
                        'min': 0,
                        'max': price
                    },
                    format:{
                        from:function (value) {
                            return parseInt(value);
                        },
                        to:function (value) {
                            return parseInt(value);
                        }

                    }
                });


            }

            slider.noUiSlider.on('update',function (values,handle) {
                app.min_price=values[0];
                app.max_price=values[1];
                $("#min_price").text(app.number_format(values[0]));
                $("#max_price").text(app.number_format(values[1]));
            });

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
                let old_param=key+"="+params.get(key);
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
        setPageUrl:function (url) {
            window.history.pushState('data','title',url);
        },
        getDiscountValue:function (price1,price2) {
            let a=(price2/price1)*100;
            a=100-a;
            a=Math.round(a);
            return a;
        },
        set_filter_event:function (el) {
            let data=$(el).attr('data');
            data=data.split('_');
            if ($('.check_box',el).hasClass('active'))
            {
                $('.check_box',el).removeClass('active');
                this.remove_url_query_string(data[0],data[2]);
            }
            else {
                $('.check_box',el).addClass('active');
                this.add_url_query_string(data[0],data[2]);
            }
        },
        add_url_query_string:function (key,value) {
            let url=window.location.href;
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

            this.setPageUrl(url);
            this.getProduct(1);

        },
        remove_url_query_string:function (key,value) {
            let url=window.location.href;
            let check=url.split(key);
            const params=url.split('?');
            let h=0;

            if (params[1]!=undefined)
            {
                if(params[1].indexOf('&')>1){

                    let vars=params[1].split('&');
                    for (let i in vars)
                    {
                        let k=vars[i].split('=')[0];
                        let v=vars[i].split('=')[1];
                        let n=k.indexOf(key);
                        if (n>-1 && v!=value)
                        {
                           k=k.replace(key,'');
                           k=k.replace('[','');
                           k=k.replace(']','');
                           const new_string=key+"["+h+"]="+v;
                           const old_string=key+"["+k+"]="+v;
                           url=url.replace(old_string,new_string);
                           h++;
                        }
                        else if (n>-1)
                        {

                            url=url.replace('&'+k+"="+v,'');
                            url=url.replace('?'+k+"="+v,'');
                        }
                    }
                }
                else {


                    url=url.replace('?'+key+"[0]"+"="+value,'');
                }

            }


            this.setPageUrl(url);
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
