<template>
    <div>

        <div class="mobile_data_box hide_box">
            <div class="header">
                <span>   {{ title }}   </span>
                <a>
                    <span>بازگشت</span>
                    <i class="mdi mdi-chevron-left"></i>
                </a>
            </div>

            <div class="content">

                <div class="profile_item" style="height: 330px!important;position: relative">
                    <div id="change_map"></div>
                    <div id="map"
                         style="width: 100%; height: 100%; background: #eee; border: 2px solid #aaa;position:relative ;z-index: 1;display: block;">
                    </div>
                    <button class="btn btn-success" id="select_location_btn">انتخاب</button>
                </div>

                <div class="profile_item" style="margin: 10px" id="add_address_box">
                    <div class="form-group">
                        <div class="account_title"> نام و نام خانوادگی تحویل گیرنده :</div>
                        <label for="" class="input_label">
                            <input type="text" v-model="name" class="form-control"
                                   placeholder=" نام و نام خانوادگی تحویل گیرنده">
                            <label for="" v-if="error_name_message"
                                   :class="[error_name_message ? 'feedback_hint active' : 'feedback']">{{ error_name_message }}</label>
                        </label>
                    </div>
                    <div class="form-group">
                        <div class="account_title"> شماره موبایل :</div>
                        <label for="" class="input_label">
                            <input type="text" v-model="mobile" class="form-control"
                                   placeholder=" شماره موبایل تحویل گیرنده">
                            <label for="" v-if="error_mobile_message"
                                   :class="[error_mobile_message? 'feedback_hint active' : 'feedback']">{{ error_mobile_message }}</label>
                        </label>
                    </div>
                    <div class="form-group">
                        <div class="account_title"> استان :</div>
                        <label for="" class="input_label">
                            <select class="selectpicker" v-model="province_id" name="" id="province_id"
                                    v-on:change="getCity('')" data-live-search="true">
                                <option value="">انتخاب استان</option>
                                <option v-for="row in province" v-bind:value="row.id">{{ row.name }}</option>
                            </select>

                            <label for="" v-if="error_province_id_message"
                                   :class="[error_province_id_message? 'feedback_hint active' : 'feedback']">{{ error_province_id_message }}</label>
                        </label>
                    </div>
                    <div class="form-group">
                        <div class="account_title"> شهر :</div>
                        <label for="" class="input_label">
                            <select class="selectpicker" v-model="city_id" name="" id="city_id" data-live-search="true">
                                <option value="">انتخاب شهر</option>
                                <option v-for="row in city" v-bind:value="row.id">{{ row.name }}</option>
                            </select>

                            <label for="" v-if="error_city_id_message"
                                   :class="[error_city_id_message? 'feedback_hint active' : 'feedback']">{{ error_city_id_message }}</label>
                        </label>
                    </div>
                    <div class="form-group">
                        <div class="account_title"> آدرس پستی :</div>
                        <label for="" class="input_label">
                            <textarea class="textarea form-control" v-model="address"
                                      placeholder="آدرس پستی تحویل گیرنده"></textarea>
                            <label for="" v-if="error_address_message"
                                   :class="[error_address_message? 'feedback_hint active' : 'feedback']">{{ error_address_message }}</label>
                        </label>
                    </div>
                    <div class="form-group">
                        <div class="account_title"> کد پستی :</div>
                        <label for="" class="input_label">
                            <input type="text" v-model="zip_code" class="form-control"
                                   placeholder=" کد پستی تحویل گیرنده">
                            <label for="" v-if="error_zip_code_message"
                                   :class="[error_zip_code_message? 'feedback_hint active' : 'feedback']">{{ error_zip_code_message }}</label>
                        </label>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" v-on:click="add_address()">
                            <span>{{ btn_text }}</span>
                        </button>

                        <div v-if="server_error"  class="alert alert-warning" style="margin-top: 20px;font-size: 14px;">خطا در ارسال اطلاعات، مجدداً تلاش نمایید</div>

                    </div>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
import myMixin from "../myMixin";

export default {
    name: "AddressForm",
    props:['paginate'],
    data() {
        return {
            id: 0,
            name: '',
            mobile: '',
            province_id: '',
            city_id: '',
            address: '',
            zip_code: '',
            show_box: false,
            error_name_message: false,
            error_mobile_message: false,
            error_province_id_message: false,
            error_city_id_message: false,
            error_address_message: false,
            error_zip_code_message: false,
            province: [],
            city: [],
            title: 'ثبت آدرس',
            btn_text:'ثبت و ارسال به این آدرس',
            server_error:false,
            get_page:'no'
        }
    },
    mixins: [myMixin],
    mounted() {
        this.getProvince();
        this.get_page=this.paginate=='ok' ?'ok' : 'no';
    },
    methods: {
        getProvince() {
            this.axios.get(this.$siteUrl + '/api/get_province').then(response => {
                this.province = response.data;
                this.$nextTick(function () {
                    $("#province_id").selectpicker('refresh');
                });


            });
        },
        getCity: function (id) {
            if (this.province_id != '') {
                this.city_id = id;
                this.city = [];
                this.axios.get(this.$siteUrl + '/api/get_city/' + this.province_id).then(response => {
                    this.city = response.data;
                    setTimeout(function () {
                        $("#city_id").selectpicker('refresh');
                    }, 100)
                });
            }
        },
        add_address: function () {
            const validateName = this.validateName();
            const validateMobileNumber = this.validateMobileNumber();
            const validateَAddress = this.validateAddress();
            const validateZipCode = this.validateZipCode();
            const validateProvince = this.validateProvince();
            const validateCity = this.validateCity();

            if (validateName && validateMobileNumber && validateَAddress && validateZipCode && validateProvince && validateCity) {
                $("#loading").show();
                const lat = $("#lat").val();
                const lng = $("#lng").val();
                const formData = new FormData();
                formData.append('id', this.id);
                formData.append('name', this.name);
                formData.append('mobile', this.mobile);
                formData.append('address', this.address);
                formData.append('zip_code', this.zip_code);
                formData.append('province_id', this.province_id);
                formData.append('city_id', this.city_id);
                formData.append('lat', lat);
                formData.append('lng', lng);
                formData.append('paginate',this.get_page);
                const url = this.$siteUrl + '/user/addAddress';
                this.server_error=false;
                this.axios.post(url, formData).then(response => {
                    $("#loading").hide();
                    $(".hide_box").hide();
                    if (response.data != "error") {
                        this.$emit('setData', response.data);
                    }
                    else {
                        this.server_error=true;
                    }


                }).catch(error => {
                    $("#loading").hide();
                    this.server_error=true;
                    $(".hide_box").hide();
                });

            }

        },
        validateName: function () {
            if (this.name.toString().trim() == "") {
                this.error_name_message = 'نام و نام خانوادگی نمی تواند خالی باشد';
                return false;
            } else if (this.name.toString().trim().length < 3) {
                this.error_name_message = 'نام و نام خانوادگی حداقل شامل 3 کاراکتر باشد';
                return false;
            } else {
                this.error_name_message = false;
                return true;
            }
        },
        validateMobileNumber: function () {
            if (this.mobile.toString().trim() == "") {
                this.error_mobile_message = 'شماره موبایل نمی تواند خالی باشد';
                return false;
            } else if (this.check_mobile_number()) {
                this.error_mobile_message = 'شماره موبایل وارد شده معتبر نمی باشد';
                return false;
            } else {
                this.error_mobile_message = false;
                return true;
            }

        },
        validateAddress: function () {
            if (this.address.toString().trim() == "") {
                this.error_address_message = 'آدرس نمی تواند خالی باشد';
                return false;
            } else if (this.address.toString().trim().length < 20) {
                this.error_address_message = 'آدرس دقیق را وارد کنید';
                return false;
            } else {
                this.error_address_message = false;
                return true;
            }
        },
        validateZipCode: function () {
            if (this.zip_code.toString().trim() == "") {
                this.error_zip_code_message = 'کد پستی نمی تواند خالی باشد';
                return false;
            } else if (this.zip_code.toString().trim().length < 10 || isNaN(this.zip_code) || this.zip_code.toString().trim().length > 10) {
                this.error_zip_code_message = 'کد پستی وارد شده معتبر نمی باشد';
                return false;
            } else {
                this.error_zip_code_message = false;
                return true;
            }
        },
        validateProvince: function () {
            if (this.province_id.toString().trim() == "") {
                this.error_province_id_message = 'استان جهت ارسال کالا را وارد کنید';
                return false;
            } else {
                this.error_province_id_message = false;
                return true;
            }
        },
        validateCity: function () {
            if (this.city_id.toString().trim() == "") {
                this.error_city_id_message = 'شهر جهت ارسال کالا را وارد کنید';
                return false;
            } else {
                this.error_city_id_message = false;
                return true;
            }
        },
        setUpdateData: function (address, title) {
            this.btn_text='ویرایش و ارسال به این آدرس';
            this.id = address.id;
            this.name = address.name;
            this.mobile = address.mobile;
            this.city_id = address.city_id;
            this.province_id = address.province_id;
            this.address = address.address;
            this.zip_code = address.zip_code;
            this.title = title;
            this.getProvince();
            if (this.province_id > 0) {
                this.getCity(this.city_id);
            } else {
                this.cityList = [];
                setTimeout(function () {
                    $("#city_id").selectpicker('refresh');
                }, 100);
            }
            this.error_name_message = false;
            this.error_mobile_message = false;
            this.error_address_message = false;
            this.error_zip_code_message = false;
            this.error_province_id_message = false;
            this.error_city_id_message = false;

            this.$emit('hideBox');
            $('.hide_box').show();
            $("#change_map").click();
            this.show_mobile_box();
            this.$nextTick(function () {
                $("#province_id").selectpicker('refresh');
                $("#city_id").selectpicker('refresh');
            });
        },
        setTitle: function (title) {
            this.title = title;
            this.btn_text='ثبت و ارسال به این آدرس';
            this.name = '';
            this.mobile = '';
            this.city_id = '';
            this.province_id = '';
            this.address = '';
            this.zip_code = '';

            this.$emit('hideBox');
            $('.hide_box').show();
            $("#change_map").click();
            this.show_mobile_box();
            this.$nextTick(function () {
                $("#province_id").selectpicker('refresh');
                $("#city_id").selectpicker('refresh');
            });
        }


    }
}
</script>

<style scoped>

</style>
