<template>
    <div id="send_order_type_box">
        <div v-if="multi_type_send">
            <h6>انتخاب نحوه ارسال</h6>
            <div class="shipping_data_box">
                <p v-on:click="send_normal_send">
                    <span :class="(normal_send ? 'radio_check active_radio_check' : 'radio_check')"></span>
                    <span>عادی</span>
                </p>

                <p v-on:click="send_fast_send">
                    <span :class="(fast_send ? 'radio_check active_radio_check' : 'radio_check')"></span>
                    <span>سریع (مرسوله شما در سریع ترین زمان ممکن ارسال می شود)</span>
                </p>

            </div>
        </div>


        <div v-if="normal_send" class="shipping_data_box" style="padding-left: 0;padding-right: 0">
            <div class="swiper_product_box">
                <swiper :options="swiperOtion">
                    <swiper-slide v-for="product in OrderingData.cart_product_data" :key="product.product_id" class="product_info_box">
                        <img v-bind:src="$siteUrl+'files/thumb/'+product.product_image_url" alt="">
                        <p style="text-align: justify;">{{product.product_title}}</p>

                        <div class="swiper-button-next" slot="button-next"></div>
                        <div class="swiper-button-prev" slot="button-prev"></div>

                    </swiper-slide>
                    <div class="swiper-button-next" slot="button-next"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                </swiper>
            </div>


            <div style="padding-bottom:10px;padding-top:10px">
                <span class="checkout_image"></span>
                <div class="checkout_time">
                    <p>
                        <span>بازه تحویل سفارش : </span>
                        <span>زمان تقریبی تحویل از </span>
                        <span>{{OrderingData.min_ordering_day}}</span>
                        <span>تا</span>
                        <span>{{OrderingData.max_ordering_day}}</span>
                    </p>

                    <span> (پست پیشتاز)</span>
                    <span>هزینه ارسال : </span>
                    <span>{{OrderingData.normal_send_order_amount}}</span>
                </div>
            </div>

        </div>


        <div v-if="fast_send" v-for="(delivery_order_interval,key) in OrderingData.delivery_order_interval">
            <p>
                <span>مرسوله </span>
                <span>{{replaceNumber(i=key+1)}}</span>
                <span>از</span>
                <span>{{replaceNumber(OrderingData.delivery_order_interval.length)}}</span>
            </p>
            <div class="shipping_data_box" style="padding-left: 0;padding-right: 0">
                <div class="swiper_product_box">
                    <swiper :options="swiperOtion">
                        <swiper-slide v-for="(data,key2) in OrderingData.array_product_id[key]" :key="key" class="product_info_box">
                            <img v-bind:src="$siteUrl+'files/thumb/'+OrderingData.cart_product_data[data+'_'+key2].product_image_url" alt="">
                            <p>{{OrderingData.cart_product_data[data+'_'+key2].product_title}}</p>
                        </swiper-slide>

                        <div class="swiper-button-next" slot="button-next"></div>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                    </swiper>
                </div>

                <div style="padding-bottom:10px;padding-top:10px">
                    <span class="checkout_image"></span>
                    <div class="checkout_time">
                        <p>
                            <span>بازه تحویل سفارش : </span>
                            <span>زمان تقریبی تحویل از </span>
                            <span>{{delivery_order_interval.day_label1}}</span>
                            <span>تا</span>
                            <span>{{delivery_order_interval.day_label2}}</span>
                        </p>

                        <span> (پست پیشتاز)</span>
                        <span>هزینه ارسال : </span>
                        <span>{{delivery_order_interval.send_fast_price}}</span>
                    </div>
                </div>

            </div>
        </div>


        <div class="shipping_data_box"  style="padding: 20px 20px 15px 30px">
            <input type="checkbox" checked class="form-check-input" name="need-invoice">
            <span class="check_box active" id="need-invoice"></span>
            <span style="padding-right: 10px">درخواست ارسال فاکتور خرید</span>
        </div>

        <ul class="checkout_action">
            <li>
                <a v-bind:href="$siteUrl+'Cart'" class="data_link">بازگشت به سبد خرید</a>
            </li>

            <li>
                <a v-bind:href="$siteUrl+'payment'" class="data_link">تایید و ادامه ثبت سفارش </a>
            </li>

        </ul>


    </div>

</template>

<script>
import MyMixin from "../myMixin";
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'

export default {
    name: "OrderingTime",
    props:['city_id'],
    mixins:[MyMixin],
    components:{swiper,swiperSlide},
    data(){
        return {
            OrderingData:[],
            multi_type_send:false,
            normal_send:true,
            fast_send:false,
            swiperOtion:{
                slidesPerView:4,
                spaceBetween:30,
                navigation:{
                    nextEl:'.swiper-button-next',
                    prevEl:'.swiper-button-prev',
                },
                breakpoints:{
                    400:{
                        slidesPerView:2
                    },600:{
                        slidesPerView:2
                    },
                }
            }
        }
    },
    mounted() {
        this.get_ordering_time();
    },
    methods:{
        get_ordering_time:function () {
            const url=this.$siteUrl+"/shipping/getSendData/"+this.city_id
            this.axios.get(url).then(response=>{
               this.OrderingData=response.data;

               if (this.OrderingData.delivery_order_interval.length>1)
               {
                   this.multi_type_send=true;
               }
               this.setPrice();
            });
        },
        send_normal_send:function () {
            this.normal_send=true;
            this.fast_send=false;
            this.setPrice();
            document.getElementById('send_type').value=1;
        },
        send_fast_send:function () {
            this.normal_send=false;
            this.fast_send=true;
            this.setPrice();
            document.getElementById('send_type').value=2;
        },
        setPrice:function () {
            if (this.normal_send)
            {
                $("#total_send_order_price").text(this.OrderingData.normal_send_order_amount);
                $("#final_price").text(this.OrderingData.normal_cart_price);
            }
            else{
                $("#total_send_order_price").text(this.OrderingData.total_fast_send_amount);
                $("#final_price").text(this.OrderingData.fasted_cart_amount)
            }
        }
    },
    watch:{
        city_id:function (newVal,oldVal) {
            this.city_id=newVal;
            this.get_ordering_time();
        }
    }
}
</script>

<style scoped>

</style>
