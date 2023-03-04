<template>

    <div>

        <button  type="button" class="add_address_btn profile_address_btn" v-on:click="showModalBox()"  data-target=".bd-example-modal-lg">
            <strong>افزودن آدرس جدید</strong>
        </button>

        <div class="profile_address_cart" v-for="(address,key) in AddressLists.data" v-bind:key="address.id">
            <div class="profile_address_cart_desc">
                <h4>{{address['name']}}</h4>
                <p>{{address['get_province']['name']}} - {{address['get_city']['name']}} - {{address['address']}}</p>
            </div>

            <div class="profile_address_cart_data">
                <ul>
                    <li>
                        <i class="mdi mdi-email-outline"></i>
                        <span>  کد پستی تحویل گیرنده :  {{replaceNumber(address['zip_code'])}}</span>
                    </li>
                    <li>
                        <i class="mdi mdi-phone-classic"></i>
                        <span>  شماره تماس تحویل گیرنده :  {{replaceNumber(address['mobile'])}}</span>
                    </li>
                </ul>

                <ul style="display: inline-flex" class="btn_ul">
                    <li><button class="address_btn" v-on:click="updateRow(address)"> ویرایش</button></li>
                    <li  style="margin-right: 10px"><button class="address_btn" v-on:click="remove_address(address)"> حذف</button></li>
                </ul>

            </div>

        </div>



        <pagination align="center" :data="AddressLists" @pagination-change-page="getAddress"></pagination>




        <address-form v-if="layout!='mobile'" @setData="updateAddressList" ref="data" :paginate="'ok'"></address-form>
        <mobile-address-form v-else @setData="updateAddressList" ref="data" :paginate="'ok'"></mobile-address-form>


        <div class="message_div" v-if="show_dialog_box">
            <div class="message_box">
                <p id="msg">آیا مایل به حذف این آدرس هستید؟</p>
                <a  class="alert alert-success" v-on:click="delete_address('ok')">بلی</a>
                <a  class="alert alert-danger" v-on:click="show_dialog_box=false">خیر</a>
            </div>
        </div>

    </div>

</template>

<script>
import myMixin from "../myMixin";
import AddressForm from "./AddressForm";
import LaravelVuePagination from 'shetabit-laravel-vue-pagination';
import MobileAddressForm from "./MobileAddressForm";


export default {
    name: "ProfileAddress",
    mixins:[myMixin],
    components: {
        AddressForm,
        MobileAddressForm,
        'Pagination': LaravelVuePagination
    },

    data(){
        return{
            AddressLists:{data:[]},
            show_dialog_box:false,
        }
    },
    props:['layout'],
    mounted() {
        this.getAddress();
    },
    methods:{
        getAddress:function (page=1) {
            const url=this.$siteUrl+"user/getAddress?page="+page;
            this.axios.get(url).then(response=>{
               this.AddressLists=response.data;
            });
        },
        updateAddressList:function (data) {
            this.AddressLists=data;
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

            // old_array[0]=select;
            // old_array[key]=first;
            this.city_id=select.city_id;
            this.$set(this.AddressLists,0,select);
            this.$set(this.AddressLists,key,first);
            this.show_address_list=false;
            this.show_default=this;
            document.getElementById('address_id').value=select.id;
        },
        delete_address:function (paginate) {
            const string=paginate==undefined ? '' : "?paginate=ok"
            $("#loading").show();
            this.show_dialog_box=false;
            const url=this.$siteUrl+"/user/removeAddress/"+this.remove_address_id+string;
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
