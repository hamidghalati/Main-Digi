<template>
   <div>
       <div class="header_cart_box">
           <div class="basket_arrow"></div>
           <div class="box_label">
               <span>  ({{replaceNumber(CartProduct.product_count)}}) کالا :</span>
               <span ><a style="font-family: IRANSans;color: #19bfd3!important;" v-bind:href="$siteUrl+'Cart'">   مشاهده‌ی سبد خرید  </a></span>
           </div>
           <div id="header_cart_content">
               <div v-if="CartProduct.product!=undefined && CartProduct.product.length>0">
                   <table class="cart_table" >
                       <tr v-for="product in CartProduct['product']">
                           <td><span data-toggle="tooltip" data-placement="top" title="حذف از سبد خرید" class="remove_product" v-on:click="remove_product(product)"><i class="fa fa-trash-alt"></i></span></td>
                           <td><img v-bind:src="$siteUrl+'files/thumb/'+product.product_image_url" alt="" v-on:click="remove_product(product)"></td>
                           <td>
                               <ul>
                                   <li class="title">

                                       <a v-bind:href="$siteUrl+'product/dkp-'+product.product_id+'/'+product.product_url">{{product.product_title}}</a>
                                   </li>
                                   <li>
                                       <span>تعداد : {{ replaceNumber(product.product_count) }}عدد </span>
                                       <div v-if="product.color_name != undefined">
                                           <span>رنگ :</span>
                                           <span>{{product.color_name}}</span>
                                       </div>
                                   </li>
                               </ul>
                           </td>

                       </tr>
                   </table>
               </div>
           </div>

           <div class="box_label">

               <span style="font-family:IRANSans">مبلغ قابل پرداخت : {{replaceNumber(CartProduct.cart_price)}} تومان </span>
               <a v-bind:href="$siteUrl+'shipping'" class="btn show_order_page">ثبت سفارش</a>
           </div>
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
    name: "HeaderCart",
    mixins:[myMixin],
    data() {
        return {
            show_dialog_box:false,
            select_product:null,
            CartProduct: {product: []}
        }
    },
    mounted() {
        this.CartProductData();
    },
    methods:{
        CartProductData:function () {
            const url=this.$siteUrl+"/site/CartProductData";
            this.axios.get(url).then(respnse=>{
                this.CartProduct=respnse.data;
            });
        },
        remove_product:function (product) {
            this.select_product=product;
            //this.show_dialog_box=true;
            this.approve();
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
            this.axios.post(url,formData).then(response=>{
                if (response.data != 'error')
                {
                    this.CartProduct=response.data;
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
