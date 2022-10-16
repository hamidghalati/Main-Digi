<template>

    <div class="shipping_data_box">
        <p class="shipping_data_box_title">استفاده از کارت هدیه فروشگاه</p>
        <p>با ثبت کارت هدیه، مبلغ کارت هدیه از مبلغ قابل پرداخت کسر می شود</p>

        <div class="form-group" style="display: flex">
            <input type="text" v-model="code" class="form-control discount_input">
            <button v-on:click="send_code()" class="btn btn-success discount_button">ثبت کارت هدیه</button>
        </div>

        <div v-if="success_message" class="alert alert-success">{{success_message}}</div>
        <div v-if="error_message" class="alert alert-danger">{{error_message}}</div>





    </div>

</template>

<script>

export default {
    name: "GiftCart",

    data(){
        return{
            code:'',
            error_message:false,
            success_message:false
        }
    },
    methods:{
        send_code:function () {
            if (this.code.trim()!="")
            {
                $("#loading").show();
                const url=this.$siteUrl+'/site/check_gift_cart';
                const formData=new FormData();
                formData.append('code',this.code);
                this.axios.post(url,formData).then(response=>{
                    $("#loading").hide();
                    if (response.data.status=='yes')
                    {
                        this.code='';
                        const gift_value=response.data.gift_value;
                        const cart_final_price=response.data.cart_final_price;
                        $('.gift_li').show();
                        $('#gift_cart_amount').text(gift_value);
                        $('#final_price').text(cart_final_price);
                        this.error_message=false;
                        this.success_message='مبلغ کارت هدیه از هزینه کسر شد';
                    }
                    else {
                        this.success_message=false;
                        this.error_message=response.data;
                    }
                }).catch(error=>{
                    $("#loading").hide();
                    this.error_message="خطا در ارسال اطلاعات، مجدداً تلاش کنید";
                });
            }
            else {
                this.error_message="لطفاً کد کارت هدیه را وارد نمایید"
            }
        }
    }
}
</script>

<style scoped>

</style>
