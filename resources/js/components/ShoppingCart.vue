<template>
<div>
    <div v-if="CartProduct.product!=undefined && CartProduct.product.length>0">
        <div class="page_row">
            <div class="page_content">
                <table class="cart_table" >
                    <tr v-for="product in CartProduct['product']">
                        <td><span data-toggle="tooltip" data-placement="top" title="حذف از سبد خرید" class="remove_product" v-on:click="remove_product(product)"><i class="fa fa-trash-alt"></i></span></td>
                        <td><img v-bind:src="$siteUrl+'files/thumb/'+product.product_image_url" alt="" v-on:click="remove_product(product)"></td>
                        <td>
                            <ul>
                                <li class="title">
                                    <a v-bind:href="$siteUrl+'product/dkp-'+product.product_id+'/'+product.product_url">{{product.product_title}}</a>
                                </li>
                                <li>{{product.warranty_name}}</li>
                                <li v-if="product.color_name != undefined">
                                    <span>رنگ :</span>
                                    <span>{{product.color_name}}</span>
                                    <span class="ui-variant-shape" v-bind:style="{background:product.color_code} "></span>
                                </li>
                            </ul>
                        </td>
                        <td>
                            <span>تعداد</span>
                            <p v-if="product.product_number_cart>1">
                                <select class="selectpicker" v-model="product.product_count" v-on:change="change_product_count(product)">
                                    <option v-for="i in product.product_number_cart" v-bind:value="i">{{i}}</option>
                                </select>
                            </p>
                            <p v-else>{{product.product_count}}</p>
                        </td>
                        <td>
                           <span v-if="check_has_off(product)">
                               <div class="discount_cart_div">
                                   <del style="color: red">{{ replaceNumber(number_format(product.price1)) }} تومان</del>
                                   <p style="color: red;font-size: 10px;">
                                       <span>تخفیف شگفت انگیز</span>
                                       {{ replaceNumber(number_format(product.price1-product.int_price)) }} تومان
                                   </p>
                                   <p style="font-size: 16px">{{ replaceNumber(number_format(product.int_price)) }} تومان</p>

                               </div>
                           </span>
                            <span v-else> {{ product.price2 }} تومان</span>

                        </td>
                    </tr>
                </table>
            </div>
            <div class="page_aside">
                <div class="order_info">
                    <ul>
                        <li>
                            <span>مبلغ کل</span>
                            <span>  ({{replaceNumber(CartProduct.product_count)}}) کالا :</span>
                            <span class="left">{{replaceNumber(CartProduct.total_price)}} تومان </span>
                        </li>

                        <li class="cart_discount_li" v-if="CartProduct.discount!=0">
                            <span>سود حاصل از خرید شما :</span>
                            <span class="left">{{replaceNumber(CartProduct.discount)}} تومان</span>
                        </li>

                        <li>
                            <span>هزینه ارسال</span>
                            <span data-toggle="tooltip" data-placement="bottom" title="هزینه ارسال مرسولات می تواند وابسته به شهر و آدرس گیرنده متفاوت باشد.در صورتی که هر یک از مرسولات حداقل ارزشی برابر با 150 هزار تومان داشته باشید، مرسوله به صورت رایگان ارسال خواهد شد"><i class="fa fa-question-circle"></i></span>
                            <span class="left">وابسته به آدرس</span>
                        </li>

                    </ul>
                    <div class="checkout_divider"></div>
                    <div class="checkout_content">
                        <p style="color: red">مبلغ قابل پرداخت</p>
                        <p class="cart_price_p">{{CartProduct.cart_price}} تومان</p>
                    </div>
                    <a v-bind:href="$siteUrl+'shipping'">
                        <div class="send_btn checkout">
                            <span class="line"></span>
                            <span class="title">ادامه ثبت سفارش</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="cart_table empty_cart_div">
        <i class="fa fa-basket-shopping icon-basket"></i>
        <p class="empty-title">سبد خرید شما خالی می باشد!</p>
    </div>

    <div class="message_div" v-if="show_dialog_box">
        <div class="message_box">
            <p id="msg">آیا مایل به حذف این محصول هستید؟</p>
            <a  class="alert alert-success" v-on:click="approve">بلی</a>
            <a  class="alert alert-danger" v-on:click="show_dialog_box=false;select_product=null;">خیر</a>
        </div>
    </div>

</div>
</template>

<script>
import myMixin from "../myMixin";
export default {
    name: "ShoppingCart",
    props:['cart_data'],
    mixins:[myMixin],
    data(){
     return{
          show_dialog_box:false,
         select_product:null,
         CartProduct: {product:[]}
     }
    },
    mounted() {
        this.CartProduct=this.cart_data;

    },
    methods:{
        remove_product:function (product) {
            this.select_product=product;
            this.show_dialog_box=true;
        },
        approve:function () {
            this.show_dialog_box=false;
            const url=this.$siteUrl+"site/cart/remove_product";
            const formData=new FormData();
            formData.append('product_id',this.select_product.product_id);
            formData.append('warranty_id',this.select_product.warranty_id);
            if (this.select_product.color_id!=undefined)
            {
                formData.append('color_id',this.select_product.color_id);
            }
            $("#loading").show();
            this.axios.post(url,formData).then(response=>{
                $("#loading").hide();
                if (response.data != 'error')
                {
                    this.CartProduct=response.data;

                    if(this.CartProduct.product)
                    {
                        $('.cart_product_count').text(this.replaceNumber(this.CartProduct.product.length));
                    }
                    else {
                        $('.cart_product_count').hide();
                    }

                }
            }).catch(error=>{
                $("#loading").hide();
            });
        },
        change_product_count:function (product) {
            $("#loading").show();
            // product.product_count;
            const url=this.$siteUrl+"site/cart/change_product_cart";
            const formData=new FormData();
            formData.append('product_id',product.product_id);
            formData.append('warranty_id',product.warranty_id);
            formData.append('product_count',product.product_count);
            if (product.color_id!=undefined)
            {
                formData.append('color_id',product.color_id);
            }
            this.axios.post(url,formData).then(response=>{
                $("#loading").hide();
                if (response.data != 'error')
                {
                    this.CartProduct=response.data;
                }
            }).catch(error=>{
                $("#loading").hide();
            });
        },
        check_has_off:function (product) {
            let time=Date.now();
            time=parseInt(time/1000);
            if (product.offers_last_time>time && product.int_price<product.price1){
                return true;
            }
            else {
                return  false;
            }

        }
    }
}
</script>

<style>
    /*.tooltip-inner{*/
    /*    background: #68a5ff!important;*/
    /*    text-align: justify!important;*/
    /*}*/
    /*.tooltip .arrow::before{*/
    /*    border-bottom-color: #68a5ff!important;*/
    /*    border-top-color: #68a5ff!important;*/
    /*}*/
</style>
