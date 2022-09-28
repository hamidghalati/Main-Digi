<template>
<div>
    <div class="swiper-container order_steps">
        <div class="swiper-wrapper">

            <div class="swiper-slide" v-for="(step,key) in steps" v-if="key>-1">
                <div :class="[order_status<key  ? 'step_div step_inactive' : 'step_div'] " v-on:click="change_status(key)">
                    <img v-bind:src="$siteUrl+'files/images/steps/step'+key+'.png'" alt="" >
                    <span  :class="order_status>=key ? 'text-success' : ''">{{step}}</span>
                </div>

                <hr  :class="order_status>=key ? 'hr_active' : ''">
            </div>

        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>

    <div class="message_div" style="display: block" v-if="show_box">
        <div class="message_box">
            <p id="msg">آیا از تغییر وضعیت این مرسوله مطمئن هستید؟</p>
            <a  class="alert alert-success" v-on:click="send_data()">بلی</a>
            <a  class="alert alert-danger" v-on:click="show_box=false">خیر</a>
        </div>
    </div>

    <div class="error_dialog">
        <span>خطا در ارسال اطلاعات، دوباره سعی کنید</span>
    </div>

</div>

</template>

<script>
export default {
    name: "OrderStep",
    props:['steps','send_status','order_id'],
    data(){
      return{
          show_box:false,
          status:0,
          order_status:0
      }
    },
    mounted() {
      this.order_status=this.send_status
    },
    methods:{
        change_status:function (staus) {
            this.status=staus;
            this.show_box=true;
        },
        send_data:function () {
            this.show_box=false;
            $("#loading").show();
            const formData=new FormData();
            formData.append('order_id',this.order_id);
            formData.append('status',this.status);
            const url=this.$siteUrl+'/admin/order/change_status';
            this.axios.post(url,formData).then(response=>{
                $("#loading").hide();
                if (response.data=='ok')
                {
                    this.order_status=this.status;
                }
                else {
                    $('.error_dialog').show();
                    setTimeout(function () {
                        $('.error_dialog').hide();
                    },4000);
                }
            }).catch(onerror=>{
                $("#loading").hide();
                $('.error_dialog').show();
                setTimeout(function () {
                    $('.error_dialog').hide();
                },4000);
            });


        }
    }
}
</script>

<style scoped>

</style>
