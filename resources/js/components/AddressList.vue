<template>
    <div >

        <button v-if="AddressLists.length==0" type="button" class="add_address_btn" v-on:click="showModalBox()"  data-target=".bd-example-modal-lg">
            <strong>افزودن آدرس جدید</strong>
        </button>

        <div class="address_box box_border" v-if="show_address_list">

            <div class="select_address_label">
                <span>آدرس مورد نظر خود را جهت تحویل انتخاب نمایید</span>
                <span id="close_address" v-on:click="close_address_list()"><i  class="fa fa-close" ></i></span>
            </div>
            <button type="button" class="add_address_btn" v-on:click="showModalBox()"  data-target=".bd-example-modal-lg">
                <strong>افزودن آدرس جدید</strong>
            </button>

            <div class="address_row" v-for="(address,key) in AddressLists" v-bind:key="address.id">
                <h6>{{address['name']}}</h6>
                <div class="checkout_address">
                    آدرس :
                    <span>{{address['get_province']['name']}}</span> -
                    <span>{{address['get_city']['name']}}</span> -
                    <span>{{address['address']}}</span>
                </div>
                <ul>
                    <li>
                        <ul>
                            <li>
                                کد پستی تحویل گیرنده :
                                <span>{{replaceNumber(address['zip_code'])}}</span>
                            </li>
                            <li>
                                شماره موبایل تحویل گیرنده :
                                <span>{{replaceNumber(address['mobile'])}}</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li><button class="address_btn" v-on:click="updateRow(address)"> ویرایش</button></li>
                            <li><button class="address_btn" v-on:click="remove_address(address)"> حذف</button></li>
                        </ul>
                    </li>
                </ul>

                <button :class="[key==0 ? 'checkout_address_btn selected_address' : 'checkout_address_btn']" v-on:click="change_default_address(key)">
                    <span v-if="key==0">سفارش به این آدرس ارسال می شود</span>
                    <span v-else>ارسال سفارش به این آدرس</span>
                </button>

            </div>
        </div>

        <address-form @setData="updateAddressList" ref="data"></address-form>

        <div v-if="show_default_address()">
            <div class="address_row default_address">
              <div style="padding-right: 20px">
                 <ul>
                     <li> <h6>{{AddressLists[0]['name']}}</h6></li>
                     <li>
                         <span class="data_link" v-on:click="updateRow(AddressLists[0])">اصلاح این آدرس</span>
                     </li>
                     <li class="change_address_btn">
                         <button class="address_btn" v-on:click="change_address()">تغییر آدرس ارسال</button>
                     </li>
                 </ul>
                  <div class="checkout_address">
                      آدرس :
                      <span>{{AddressLists[0]['get_province']['name']}}</span> -
                      <span>{{AddressLists[0]['get_city']['name']}}</span> -
                      <span>{{AddressLists[0]['address']}}</span>
                  </div>
                  <ul>
                      <li>
                          <ul>
                              <li>
                                  کد پستی تحویل گیرنده :
                                  <span>{{replaceNumber(AddressLists[0]['zip_code'])}}</span>
                              </li>
                              <li>
                                  شماره موبایل تحویل گیرنده :
                                  <span>{{replaceNumber(AddressLists[0]['mobile'])}}</span>
                              </li>
                          </ul>
                      </li>

                  </ul>
              </div>
                <div class="checkout_contact"></div>
            </div>

        </div>


                <OrderingTime v-if="city_id>0" v-bind:city_id="city_id"></OrderingTime>




        <div class="message_div" v-if="show_dialog_box">
            <div class="message_box">
                <p id="msg">آیا مایل به حذف این آدرس هستید؟</p>
                <a  class="alert alert-success" v-on:click="delete_address">بلی</a>
                <a  class="alert alert-danger" v-on:click="show_dialog_box=false">خیر</a>
            </div>
        </div>


    </div>

</template>

<script>
import AddressForm from "./AddressForm";
import myMixin from "../myMixin";
import OrderingTime from "./OrderingTime";
export default {
    name: "AddressList",
    components: {OrderingTime, AddressForm},
    mixins:[myMixin],
    props:['data'],
    data(){
        return{
            AddressLists:[],
            show_address_list:false,
            show_default:true,
            city_id:'',
            show_dialog_box:false,
            remove_address_id:''
        }
    },
    mounted() {
        this.AddressLists=this.data;
        if (this.AddressLists.length>0)
        {
            this.city_id=this.AddressLists[0].city_id;
            document.getElementById('address_id').value=this.AddressLists[0].id;
        }
    },
    methods:{
        showModalBox:function () {
            this.$refs.data.setTitle('افزودن آدرس جدید');
            $("#myModal").modal('show');
        },
        close_address_list:function () {
            this.show_address_list=false;
            this.show_default=true;
        },
        show_default_address:function () {
           if (this.AddressLists.length>0 && this.show_default)
           {
               return true;
           }
           else {
               return false;
           }
        },
        change_address:function () {
            this.show_default=false;
          this.show_address_list=true;
        },
        updateAddressList:function (data) {
            this.AddressLists=data;
        },
        updateRow:function (address) {
            this.$refs.data.setUpdateData(address,'ویرایش آدرس');
            if(address['lat']!="0.0")
            {
                updateMap(address['lat'],address['lng']);
            }

        },
        remove_address:function (address) {
            this.remove_address_id=address.id;
            this.show_dialog_box=true;
        },
        change_default_address:function (key) {
            let old_array=this.AddressLists;
            const first=old_array[0];
            const select=old_array[key];
            this.city_id=select.city_id;
            this.$set(this.AddressLists,0,select);
            this.$set(this.AddressLists,key,first);
            this.show_address_list=false;
            this.show_default=this;
            document.getElementById('address_id').value=select.id;
        },
        delete_address:function () {
            $("#loading").show();
            this.show_dialog_box=false;
            const url=this.$siteUrl+"/user/removeAddress/"+this.remove_address_id;
            this.axios.delete(url).then(response=>{
                $("#loading").hide();
               if (response.data!='error')
               {
                   this.AddressLists=response.data;
               }
            }).catch(error=>{
                $("#loading").hide();
            });
        },


    }

}
</script>

<style scoped>

</style>
