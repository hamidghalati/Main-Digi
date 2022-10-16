<template>

    <div class="product_list">

        <div class="product_div" v-for="product in this.productList.data">
            <div class="image_div">
                <a v-bind:href="$siteUrl+'product/dkp-'+product.id+'/'+product.product_url">
                    <img v-bind:src="$siteUrl+'files/thumb/'+product.image_url" alt="">
                </a>
            </div>

            <div class="info">
                <a v-bind:href="$siteUrl+'product/dkp-'+product.id+'/'+product.product_url">
                    <p class="title">{{product.title}}</p>
                </a>

                <div v-if="product.status==1 && product.get_first_product_price !=null" class="price">
                    <div class="discount_div"></div>
                    <span>{{replaceNumber(number_format(product.get_first_product_price.price2))}}</span>
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
            noUiSlider:null

        }
    },
    mixins:[myMixin],
    mounted() {
        this.request_url=window.location.href.replace(this.$siteUrl,this.$siteUrl+'/getProduct/');
        this.getProduct();



    },
    methods:{
        getProduct:function (page=1) {
            this.axios.get(this.request_url+"?page="+page).then(response=>{
                this.productList=response.data['product'];
               this.setRangeSlider(response.data.max_price);
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

                slider.noUiSlider.on('update',function (values,handle) {
                    $("#min_price").text(app.number_format(values[0]));
                    $("#max_price").text(app.number_format(values[1]));
                });
            }
            else {
                this.noUiSlider.updateOptions({
                    start: [0, price],
                    range: {
                        'min': 0,
                        'max': price
                    },
                });
            }

        }
    }
}
</script>

<style scoped>

</style>
