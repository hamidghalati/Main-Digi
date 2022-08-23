<template>
    <div class="page_row">
        <div class="page_content">
            <table class="cart_table">
                <tr v-for="product in cart_data['product']">
                    <td><span class="fa fa-close remove_product"></span></td>
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
                                <span class="ui_variant_shape" v-bind:style="{background:product.color_code} "></span>
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
        <div class="page_aside"></div>
    </div>
</template>

<script>
export default {
    name: "ShoppingCart",
    props:['cart_data'],
    mounted() {

    }
}
</script>

<style scoped>

</style>
