<template>
    <div>

        <button v-if="AddressLists.length==0" type="button" class="add_address_btn" v-on:click="show_address_box()"
                data-target=".bd-example-modal-lg">
            <strong>افزودن آدرس جدید</strong>
        </button>

        <div v-if="AddressLists.length>0" class="address_list">
            <div class="product_item_box default_address">
                <h6> تحویل گیرنده : {{ AddressLists[0]['name'] }} </h6>
                <div class="address_content">
                    <div> آدرس : استان  {{ AddressLists[0]['get_province']['name'] }} - {{ AddressLists[0]['get_city']['name'] }} - {{ AddressLists[0]['address'] }}</div>
                    <ul>
                        <li>
                            کد پستی :
                            <span>{{ replaceNumber(AddressLists[0]['zip_code']) }}</span>
                        </li>
                        <li>
                            شماره موبایل :
                            <span>{{ replaceNumber(AddressLists[0]['mobile']) }}</span>
                        </li>
                    </ul>

                    <a class="show_other_item" v-on:click="show_more_address()">
                        <span style="margin-left: 15px;">تغییر آدرس ارسال</span>
                        <i style="position: absolute;margin-top: 5px;margin-right: 5px;font-size: 15px;"
                           class="fa fa-angle-left"></i>
                    </a>

                </div>
            </div>
        </div>

        <mobile-address-form @setData="updateAddressList" @hideBox="hide_address_list_box()" ref="data"></mobile-address-form>

        <div class="mobile_data_box" v-if="show_address_list">
            <div class="header">
                <span><i class="fa fa-location-crosshairs"></i>  انتخاب آدرس</span>

                <a>
                    <span>بازگشت</span>
                    <i class="mdi mdi-chevron-left"></i>
                </a>
            </div>

            <div class="content">
                <button type="button" class="add_address_btn" v-on:click="show_address_box()">
                    <strong>افزودن آدرس جدید</strong>
                </button>

                <div v-for="(address,key) in AddressLists">
                    <div class="product_item_box default_address">
                        <div class="header">
                            <h6> تحویل گیرنده : {{ address['name'] }} </h6>
                            <div>
                                <i class="mdi mdi-file-edit-outline" style="color: #384a51" v-on:click="updateRow(address)"></i>
                                <i class="mdi mdi-trash-can-outline" v-on:click="remove_address(address)"></i>
                            </div>
                        </div>

                        <div class="address_content">
                            <div> آدرس : استان {{ address['get_province']['name'] }}   - {{ address['get_city']['name'] }} - {{ address['address'] }}</div>
                            <ul>
                                <li>
                                    کد پستی :
                                    <span>{{ replaceNumber(address['zip_code']) }}</span>
                                </li>
                                <li>
                                    شماره موبایل :
                                    <span>{{ replaceNumber(address['mobile']) }}</span>
                                </li>
                            </ul>

                            <a>
                                <span v-if="key==0" class="select_address_tag">سفارش به این آدرس ارسال می شود</span>
                                <span v-else class="select_address_tag" style="color: #989191!important;"
                                      v-on:click="change_default_address(key)">ارسال سفارش به این آدرس</span>
                            </a>


                        </div>
                    </div>
                </div>
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
import MobileAddressForm from "./MobileAddressForm";
import myMixin from "../myMixin";
import OrderingTime from "./OrderingTime";

export default {
    name: "AddressList",
    components: {OrderingTime, AddressForm,MobileAddressForm},
    mixins: [myMixin],
    props: ['data'],
    data() {
        return {
            AddressLists: [],
            show_address_list: false,
            show_default: true,
            city_id: '',
            show_dialog_box: false,
            remove_address_id: ''
        }
    },
    mounted() {
        this.AddressLists = this.data;
        if (this.AddressLists.length > 0) {
            this.city_id = this.AddressLists[0].city_id;
            document.getElementById('address_id').value = this.AddressLists[0].id;
        }
    },
    methods: {
        showModalBox: function () {
            this.$refs.data.setTitle('افزودن آدرس جدید');
            $("#myModal").modal('show');
        },
        close_address_list: function () {
            this.show_address_list = false;
            this.show_default = true;
        },
        show_default_address: function () {
            if (this.AddressLists.length > 0 && this.show_default) {
                return true;
            } else {
                return false;
            }
        },
        change_address: function () {
            this.show_default = false;
            this.show_address_list = true;
        },
        updateAddressList: function (data) {
            this.AddressLists = data;
        },
        updateRow: function (address) {
            this.$refs.data.setUpdateData(address, 'ویرایش آدرس');
            if (address['lat'] != "0.0") {
                updateMap(address['lat'], address['lng']);
            }

        },
        remove_address: function (address) {
            this.remove_address_id = address.id;
            this.show_dialog_box = true;
        },
        change_default_address: function (key) {
            let old_array = this.AddressLists;
            const first = old_array[0];
            const select = old_array[key];

            this.city_id = select.city_id;

            this.$set(this.AddressLists, 0, select);
            this.$set(this.AddressLists, key, first);
            this.show_default = this;
            document.getElementById('address_id').value = select.id;

            this.$nextTick(function () {

                const width = $(window).width();
                const right = "-" + width + "px";

                setTimeout(function () {
                    $(".mobile_data_box").css({'right': right});
                }, 50);
            });

        },
        delete_address: function () {
            $("#loading").show();
            this.show_dialog_box = false;
            const url = this.$siteUrl + "/user/removeAddress/" + this.remove_address_id;
            this.axios.delete(url).then(response => {
                $("#loading").hide();
                if (response.data != 'error') {
                    this.AddressLists = response.data;
                }
            }).catch(error => {
                $("#loading").hide();
            });
        },
        show_more_address: function () {
            this.show_address_list = true;
            this.$nextTick(function () {

                const width = $(window).width();
                const right = "-" + width + "px";
                $(".mobile_data_box").css({'right': right});
                setTimeout(function () {
                    $(".mobile_data_box").css('right', '0');
                }, 100);
            });
        },
        show_address_box: function () {
            this.$refs.data.setTitle('افزودن آدرس جدید');
        },
        hide_address_list_box:function () {
            this.show_address_list=false;
        }




    }

}
</script>

<style scoped>

</style>
