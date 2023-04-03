<template>


    <!-- Modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="login_box" aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">ورود به سایت</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div style="margin:25px">
                        <div class="alert alert-warning">ابتدا باید وارد حساب کاربری خود شوید</div>

                        <div class="form-group">
                            <div class="field_name">شماره موبایل :</div>
                            <label for="" class="input_label user_name">
                                <input type="text"
                                       :class="[mobile_error ? 'form-control validate_error_border' : 'form-control'] "
                                       v-model="mobile" placeholder="شماره موبایل خود را وارد نمایید">
                                <label class="feedback_hint" v-if="mobile_error">{{ mobile_error_text }}</label>
                            </label>
                        </div>

                        <div class="form-group">
                            <div class="field_name">کلمه عبور :</div>
                            <label for="" class="input_label user_pass">
                                <input type="password"
                                       :class="[password_error ? 'form-control validate_error_border' : 'form-control'] "
                                       v-model="password"
                                       placeholder="کلمه عبور خود را وارد نمایید">
                                <label class="feedback_hint" v-if="password_error">{{ password_error_text }}</label>
                            </label>
                        </div>

                        <div class="form-group row" style="margin-right: 3px;padding-top: 10px;">
                            <input v-model="checked" class="form-check-input" type="checkbox">
                            <span :class="[checked ?'check_box active' : 'check_box']" v-on:click="checked=!checked"></span>
                            <span class="form-check-label">مرا به خاطر بسپار</span>

                        </div>



                    </div>
                    <div v-if="serverError" class="alert alert-danger">{{ serverError }}</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">خروج</button>
                    <button type="button" class="btn btn-primary" v-on:click="login()">ورود به سایت</button>
                </div>

                <div class="alert alert-warning" style="margin-bottom:0!important;">
                    <span>کاربر جدید هستید؟</span>
                    <span> <a class="data_link" v-bind:href="$siteUrl+'register'"> ثبت نام در سایت</a> </span>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "LoginBox",
    data() {
        return {
            mobile: '',
            password: '',
            mobile_error: false,
            mobile_error_text: false,
            password_error: false,
            password_error_text: false,
            checked:true,
            serverError:false
        }
    },
    methods: {
        login: function () {
            this.validate_login_mobile();
            this.validate_login_password();
            if (!this.password_error && !this.mobile_error) {
                const formData=new FormData();
                formData.append('mobile',this.mobile);
                formData.append('password',this.password);
                formData.append('remember',this.checked);

                const url=this.$siteUrl+"vue_login";
                $("#loading").show();
                this.serverError=false;
                this.axios.post(url,formData).then(response=>{
                    $("#loading").hide();
                    if (response.data.status=='ok'){
                        window.location=window.location.href;
                    }
                    else {
                        this.serverError=response.data.status;
                    }
                });
            }

        },
        validate_login_mobile: function () {
            if (this.mobile.toString().trim() == "") {
                this.mobile_error = true;
                this.mobile_error_text = 'لطفاً شماره موبایل خود را وارد نمایید';
            } else if (this.check_mobile_number()) {
                this.mobile_error = true;
                this.mobile_error_text = ' شماره موبایل وارد شده معتبر نمی باشد';

            } else {
                this.mobile_error = false;
                this.mobile_error_text = false;
            }
        },
        check_mobile_number: function () {
            if (isNaN(this.mobile)) {
                return true;
            } else {
                if (this.mobile.toString().trim().length == 11) {

                    if (this.mobile.toString().charAt(0) == '0' && this.mobile.toString().charAt(1) == '9') {

                        return false;
                    } else {
                        return true;

                    }
                } else if (this.mobile.toString().trim().length == 10) {
                    if (this.mobile.toString().charAt(0) == '9') {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        },
        validate_login_password: function () {
            if (this.password.toString().trim() == "") {
                this.password_error = true;
                this.password_error_text = ' کلمه عبور خود را وارد کنید';
            } else {
                this.password_error = false;
                this.password_error_text = false;
            }
        }
    }

}
</script>

<style scoped>

</style>
