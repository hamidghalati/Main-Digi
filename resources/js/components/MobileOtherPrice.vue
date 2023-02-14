<template>
    <div>
        <div class="product_item_box" v-if="warrantyList.length>1" style="cursor:pointer;padding: 15px">
            <a class="warranty_count">
            <span @click="show_list_box">
                {{ replaceNumber(warrantyList.length-1) }}
                فروشنده دیگر این کالا
            </span>
                <span @click="show_list_box" class="fa fa-angle-left"></span>
            </a>
        </div>

       <transition name="data-box">
           <div class="vue_mobile_data_box" v-if="show_box">
               <div class="header">
                   <span>لیست فروشندگان این کالا</span>
                   <a v-on:click="show_box=false">
                       <span>بازگشت</span>
                       <i class="mdi mdi-chevron-left"></i>
                   </a>
               </div>


               <div v-if="warrantyList.length>1" class="productPriceList content">
                   <div :class="[key==0 ? 'warranty_list active' : 'warranty_list']" v-for="(warranty,key) in warrantyList">
                       <div>
                           <span style="margin-left: 10px" class="fa fa-home"></span>
                           <a v-if="warranty.get_seller.id!=0" v-bind:href="$siteUrl+'/seller/'+warranty.get_seller.id">
                               <span>{{ warranty.get_seller.brand_name }}</span>
                           </a>
                           <a v-else >
                               <span>{{ warranty.get_seller.brand_name }}</span>
                           </a>
                       </div>

                       <div class="product_send_time">
                <span data-toggle="tooltip" data-placement="bottom" v-bind:title="get_time_message(warranty.send_time)" v-if="warranty.send_time==0">
                    {{ get_day(warranty.send_time) }}
                </span>

                           <span v-else data-toggle="tooltip" data-placement="bottom" v-bind:title="get_time_message(warranty.send_time)">
                    <i style="font-size: 20px;margin-left: 5px" class="mdi mdi-truck-delivery-outline"></i>
                    {{ get_day(warranty.send_time) }}

                </span>
                       </div>

                       <div class="product_send_time">
                           <i style="font-size: 20px;margin-left: 5px" class="mdi mdi-certificate-outline"></i>
                           <span>{{ warranty.get_warranty.name}}</span>
                       </div>

                       <div class="dropdown-divider"></div>
                       <div class="price">
                           <span>{{ replaceNumber(number_format(warranty.price2))+'  تومان' }}</span>
                           <a class="btn-seller-add-cart" v-on:click="add_product(warranty.warranty_id)">
                               افزودن به سبد خرید
                           </a>
                       </div>



                   </div>
               </div>

           </div>
       </transition>

    </div>

</template>

<script>
import myMixin from "../myMixin";

export default {
    name: "OtherPrice",
    props:['product_id'],
    mixins:[myMixin],
    data(){
        return{
            color_id:0,
            warrantyList:[],
            request_count:0,
            show_box:false
        }
    },
    mounted() {
        this.color_id=$("#color_id").val();
        const app=this;
        $(document).on('click','.color_li',function () {
            app.color_id=$(this).attr('data');
            app.getProductWarranty();
        });
        this.getProductWarranty();

    },
    methods:{
        getProductWarranty:function () {
            this.request_count+=1;
            const url=this.$siteUrl+"/api/getWarranty/"+this.product_id;
            const formData=new FormData();
            formData.append('color_id',this.color_id);
            this.axios.post(url,formData).then(response=>{
                this.request_count=0;
                this.warrantyList=response.data;

                this.$nextTick(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });

            }).catch(error=>{
                if (this.request_count<2)
                {
                    this.getProductWarranty();
                }

            });
        },
        get_day:function (day) {
            if (day==0)
            {
                return 'آماده ارسال';
            }
            else {
                return 'ارسال از '+this.replaceNumber(day)+' روز کاری آینده';
            }
        },
        get_time_message:function (day) {
            if (day==0)
            {
                return 'این کالا در حال حاضر در انبار موجود، آماده پردازش و ارسال است.';
            }
            else {
                return 'این کالا در انبار فروشنده موجود است، برای ارسال تا مدت زمان ذکر شده منتظر بمانید';
            }
        },
        add_product:function (id) {
            $("#warranty_id").val(id);
            $("#add_cart_form").submit();
        },
        show_list_box:function () {
            $('body').css('overflow-y','hidden');
            this.show_box=true;
            // this.$nextTick(function () {
            //     $('body').css('overflow-y','hidden');
            //     $("#product_item").css('display','none');
            //     const width=$(window).width();
            //     const right="-"+width+"px";
            //     $(".mobile_data_box").css({'right':right});
            //     setTimeout(function () {
            //         $(".mobile_data_box").css('right','0');
            //     },100)
            // });
        }

    }
}
</script>

<style scoped>

</style>
