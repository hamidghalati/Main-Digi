<template>

    <div class="shipping_data_box">
        <p class="shipping_data_box_title">استفاده از کد تخفیف فروشگاه</p>
        <p>با ثبت کد تخفیف  مبلغ کد تخفیف از مبلغ قابل پرداخت کسر می شود</p>

        <div class="form-group" style="display: flex">
            <input type="text" v-model="code" class="form-control discount_input">
            <button v-on:click="send_code()" class="btn btn-success discount_button">ثبت کد تخفیف </button>
        </div>

        <div v-if="success_message" class="alert alert-success">{{success_message}}</div>
        <div v-if="error_message" class="alert alert-danger">{{error_message}}</div>





    </div>

</template>

<script>

export default {
    name: "DiscountBox",

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
                const url=this.$siteUrl+'/site/check_discount_code';
                const formData=new FormData();
                formData.append('code',this.code);
                this.axios.post(url,formData).then(response=>{
                    $("#loading").hide();
                    if (response.data.status=='ok')
                    {
                        this.code='';
                       const discount_value=response.data.discount_value;
                         const cart_final_price=response.data.cart_final_price;
                        $('.discount_li').show();
                        $('#discount_value').text(discount_value);
                        $('#final_price').text(cart_final_price);

                        this.success_message='کد تخفیف وارد شده از هزینه کسر شد';
                        this.error_message=false;
                    }
                    else {
                        this.error_message=response.data;
                        this.success_message=false;

                    }
                }).catch(error=>{
                    $("#loading").hide();
                    this.error_message="خطا در ارسال اطلاعات، مجدداً تلاش کنید";
                });
            }
            else {
                this.error_message="لطفاً کد کارت تخفیف را وارد نمایید"
            }
        }
    }
}
</script>

<style scoped>

</style>
