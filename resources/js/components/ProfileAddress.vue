<template>

    <div>

        <button  type="button" class="add_address_btn profile_address_btn" v-on:click="showModalBox()"  data-target=".bd-example-modal-lg">
            <strong>افزودن آدرس جدید</strong>
        </button>

        <div class="profile_address_cart" v-for="(address,key) in AddressLists.data" v-bind:key="address.id">
            <div class="profile_address_cart_desc">
                <h6>{{address['name']}}</h6>
                <p>{{address['address']}}</p>
            </div>

            <div class="profile_address_cart_data">
                <ul>
                    <li>
                        <i class="fa fa-envelope"></i>
                        <span>  کد پستی تحویل گیرنده :  {{replaceNumber(address['zip_code'])}}</span>
                    </li>
                    <li>
                        <i class="fa fa-mobile-phone"></i>
                        <span>  شماره تماس تحویل گیرنده :  {{replaceNumber(address['mobile'])}}</span>
                    </li>
                </ul>

                <ul style="display: inline-flex">
                    <li><button class="address_btn" v-on:click="updateRow(address)"> ویرایش</button></li>
                    <li  style="margin-right: 10px"><button class="address_btn" v-on:click="remove_address(address)"> حذف</button></li>
                </ul>

            </div>

        </div>


        <address-form @setData="updateAddressList" ref="data"></address-form>

    </div>

</template>

<script>
import myMixin from "../myMixin";
import AddressForm from "./AddressForm";

export default {
    name: "ProfileAddress",
    mixins:[myMixin],
    components: {AddressForm},
    data(){
        return{
            AddressLists:{data:[]},
        }
    },
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

    }
}
</script>

<style scoped>

</style>
