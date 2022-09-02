<template>
<div>
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="myModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title">
                        <span class="fa fa-location-arrow"></span>
                        <span>ثبت آدرس</span>
                    </h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-7">
                            <div id="add_address_box">
                                <input type="hidden" name="lat" id="lat" value="0.0">
                                <input type="hidden" name="lng" id="lng" value="0.0">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <div class="account_title"> نام و نام خانوادگی تحویل گیرنده : </div>
                                            <label for="" class="input_label">
                                                <input type="text" v-model="name" class="form-control" placeholder=" نام و نام خانوادگی تحویل گیرنده">
                                                <label for="" v-if="error_name_message" :class="[error_name_message? 'feedback-hint active' : 'feedback']">{{error_name_message}}</label>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <div class="account_title"> شماره موبایل :</div>
                                            <label for="" class="input_label">
                                                <input type="text" v-model="mobile" class="form-control" placeholder=" شماره موبایل تحویل گیرنده">
                                                <label for="" v-if="error_mobile_message" :class="[error_mobile_message? 'feedback-hint active' : 'feedback']">{{error_mobile_message}}</label>
                                            </label>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <div class="account_title"> استان :</div>
                                            <label for="" class="input_label">
                                                <select class="selectpicker" v-model="province_id" name="" id="province_id" v-on:change="getCity" data-live-search="true">
                                                    <option value="">انتخاب استان</option>
                                                    <option v-for="row in province" v-bind:value="row.id">{{row.name}}</option>
                                                </select>

                                                <label for="" v-if="error_province_id_message" :class="[error_province_id_message? 'feedback-hint active' : 'feedback']">{{error_province_id_message}}</label>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-6">
                                        <div class="form-group">
                                            <div class="account_title"> شهر :</div>
                                            <label for="" class="input_label">
                                                <select class="selectpicker" v-model="city_id" name="" id="city_id" data-live-search="true">
                                                    <option value="">انتخاب شهر</option>
                                                    <option v-for="row in city" v-bind:value="row.id">{{row.name}}</option>
                                                </select>

                                                <label for="" v-if="error_city_id_message" :class="[error_city_id_message? 'feedback-hint active' : 'feedback']">{{error_city_id_message}}</label>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <div class="account_title"> آدرس پستی :</div>
                                            <label for="" class="input_label">
                                                <textarea class="textarea form-control" v-model="address" placeholder="آدرس پستی تحویل گیرنده" ></textarea>
                                                <label for="" v-if="error_address_message" :class="[error_address_message? 'feedback-hint active' : 'feedback']">{{error_address_message}}</label>
                                            </label>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <div class="account_title"> کد پستی :</div>
                                            <label for="" class="input_label">
                                                <input type="text" v-model="zip_code" class="form-control" placeholder=" کد پستی تحویل گیرنده">
                                                <label for="" v-if="error_zip_code_message" :class="[error_zip_code_message? 'feedback-hint active' : 'feedback']">{{error_zip_code_message}}</label>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-md-5">
<!--                            <div id="map" style="width: 100%;height: 400px;"></div>-->
<!--                            <button class="btn btn-success">انتخاب</button>-->
                            <div class="fluid-wrapper">
                                <iframe src="http://mapsengine.google.com/map/embed?mid=z-BEFzFo7gdM.kYdiUKVQpQQI" width="640" height="480"></iframe>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    </div>
</div>


</template>

<script>
export default {
    name: "AddressForm",
    data(){
        return{
            name:'',
            mobile:'',
            province_id:'',
            city_id:'',
            address:'',
            zip_code:'',
            error_name_message:false,
            error_mobile_message:false,
            error_province_id_message:false,
            error_city_id_message:false,
            error_address_message:false,
            error_zip_code_message:false,
            province:[],
            city:[],
        }
    },
    mounted() {
        this.getProvince();
    },
    methods:{
        getProvince()
        {
            this.axios.get(this.$siteUrl+'/api/get_province').then(response=>{
                this.province=response.data;
                setTimeout(function () {
                    $("#province_id").selectpicker('refresh');
                },100)
            });
        },
        getCity:function () {
            if (this.province_id != '')
            {
                this.city=[];
                this.axios.get(this.$siteUrl+'/api/get_city/'+this.province_id).then(response=>{
                    this.city=response.data;
                    setTimeout(function () {
                        $("#city_id").selectpicker('refresh');
                    },100)
                });
            }

        }
    }
}
</script>

<style scoped>

</style>
