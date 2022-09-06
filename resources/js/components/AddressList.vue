<template>
    <div>

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
            </div>
        </div>

        <address-form @setData="updateAddressList"></address-form>

        <div v-if="show_default_address()">
            <div class="address_row default_address">
              <div style="padding-right: 20px">
                 <ul>
                     <li> <h6>{{AddressLists[0]['name']}}</h6></li>
                     <li>
                         <span class="data_link">اصلاح این آدرس</span>
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



    </div>

</template>

<script>
import AddressForm from "./AddressForm";
import myMixin from "../myMixin";
export default {
    name: "AddressList",
    components: {AddressForm},
    mixins:[myMixin],
    props:['data'],
    data(){
        return{
            AddressLists:[],
            show_address_list:false,
            show_default:true
        }
    },
    mounted() {
        this.AddressLists=this.data;
    },
    methods:{
        showModalBox:function () {
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

        },
        remove_address:function (address) {

        },


    }

}
</script>

<style scoped>

</style>
