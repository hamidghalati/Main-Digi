<template>
    <div class="page_row">
        <div class="page_content">
            <table class="cart_table" >
                <tr v-for="product in cart_data['product']">
                    <td><span class="fa fa-close remove_product" v-on:click="remove_product(product)"></span></td>
                    <td><img v-bind:src="$siteUrl+'files/thumb/'+product.product_image_url" alt=""></td>
                    <td>
                        <ul>
                            <li class="title">
                                <a href="">{{product.product_title}}</a>
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
                            <select v-model="product.product_count">
                                <option v-for="i in product.product_number_cart" v-bind:value="i">{{i}}</option>
                            </select>
                        </p>
                        <p v-else>{{product.product_count}}</p>
                    </td>
                    <td>
                        {{ product.price2 }} تومان
                    </td>
                </tr>
            </table>
        </div>
        <div class="page_aside">
            <div class="order_info">
                <ul>
                    <li>
                        <span>مبلغ کل</span>
                        <span>  ({{replaceNumber(cart_data.product_count)}}) کالا :</span>
                        <span class="left">{{replaceNumber(cart_data.total_price)}}</span>
                    </li>

                    <li class="cart_discount_li" v-if="cart_data.discount!=0">
                        <span>سود حاصل از خرید شما :</span>
                        <span class="left">{{replaceNumber(cart_data.discount)}}</span>
                    </li>

                </ul>
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
    mounted() {
    },
    methods:{
        remove_product:function (product) {
            
        }
    }
}
</script>

<style scoped>

</style>
