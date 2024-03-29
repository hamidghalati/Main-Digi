$(document).ready(function () {

    $("#profile_province_id").change(function () {
        const province_id = $(this).val();
        if (parseInt(province_id) > 0) {
            const url = site_url + "api/get_city/" + province_id;
            $.ajax({
                type: "GET",
                url: url,
                success: function (response) {
                    let html = '';
                    for (let i = 0; i < response.length; i++) {
                        html += '<option value=' + response[i].id + '>' + response[i].name + '</option>'
                    }
                    if (html.trim() != '') {
                        $("#profile_city").html(html).selectpicker('refresh');
                    } else {
                        html = '<option value="">انتخاب شهر</option>';
                        $("#profile_city").html(html).selectpicker('refresh');
                    }
                }
            })
        } else {
            html = '<option value="">انتخاب شهر</option>';
            $("#profile_city").html(html).selectpicker('refresh');
        }
    });

    $("#newsletter").click(function () {
        if ($(this).hasClass('active')) {
            $("#newsletter_input").removeAttr('checked');
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
            $("#newsletter_input").attr('checked', true);
        }
    });

    $('.form_cover span').click(function () {
        $("#account_type").click();
        $('.form_cover').hide();
        document.getElementById('legal').value = true;
    });

    $("#login_btn").click(function () {
        const mobile = $("#login_mobile").val();
        const password = $("#login_password").val();
        const result1 = validate_login_mobile(mobile);
        const result2 = validate_login_password(password);
        if (result1 && result2) {
            $("#login_form").submit();
        }

    });

    $("#admin_login_btn").click(function () {
        const username = $("#username").val();
        const password = $("#login_password").val();
        const result1 = validate_login_username(username);
        const result2 = validate_login_password(password);
        if (result1 && result2) {
            $("#admin_login_form").submit();
        }

    });

    function validate_login_mobile(mobile_number) {
        if (mobile_number.toString().trim() == "") {
            $("#login_mobile").addClass('validate_error_border');
            $("#mobile_error_message").show().text('لطفاً شماره موبایل خود را وارد نمایید');
            return false;
        } else if (check_mobile_number(mobile_number)) {
            $("#login_mobile").addClass('validate_error_border');
            $("#mobile_error_message").show().text(' شماره موبایل وارد شده معتبر نمی باشد');
            return false;
        } else {
            $("#login_mobile").removeClass('validate_error_border');
            $("#mobile_error_message").hide();
            return true;
        }
    }

    function validate_login_password(password) {
        if (password.toString().trim() == "") {
            $("#login_password").addClass('validate_error_border');
            $("#password_error_message").show().text(' کلمه عبور خود را وارد کنید');
            return false;
        } else {
            $("#login_password").removeClass('validate_error_border');
            $("#password_error_message").hide();
            return true;
        }
    }

    validate_login_username = function (username) {
        if (username.toString().trim() == "") {
            $("#username").addClass('validate_error_border');
            $("#username_error_message").show().text(' نام کاربری خود را وارد کنید');
            return false;
        } else {
            $("#username").removeClass('validate_error_border');
            $("#username_error_message").hide();
            return true;
        }
    }

    $('.send_btn').hover(function () {
        $('.send_btn .line').addClass('line2');
    }, function () {
        $('.send_btn .line').removeClass('line2');
    });

    $("#share_box .mdi-email-outline").click(function () {
        $('.share_link_form').show();
    });

    $("#send_email").click(function () {
        const email = $("#email").val();
        const product_id = $("#share_product_id").val();

        if (email.trim() != '' && validateEmailAddress(email)) {
            $("#share_box").modal('hide');
            $("#loading").show();

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            const url = site_url + "site/share_product";
            $.ajax({
                url: url,
                type: "POST",
                data: "email=" + email + '&product_id=' + product_id,
                success: function (response) {
                    $("#loading").hide();
                    if (response == 'ok') {
                        $("#email").val('');
                        $("#share_link_error").text('')
                    } else {
                        $("#share_box").modal('show');
                        $("#share_link_error").text('خطا در ارسال ایمیل، دوباره تلاش نمایید')
                    }
                },
                error: function () {
                    $("#loading").hide();
                }
            });
        }


    });

    validateEmailAddress = function (email) {
        if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return true;
        } else {
            $("#share_link_error").text('آدرس ایمیل وارد شده معتبر نمی باشد')
            return false;
        }
    }

    $("#copy_btn").click(function () {
        const copy_data = $(this).attr('copy-data');
        const input = document.createElement('input');
        input.setAttribute('value', copy_data);
        input.setAttribute('id', "url_input");
        input.setAttribute('contenteditable', true);

        $("#share_box").append(input);
        input.select();
        document.execCommand('copy');
        $("#url_input").remove();

        $(this).text('کپی شد');
        setTimeout(function () {
            $("#copy_btn").text('کپی لینک');
        },3000);

    });

    $("#forget_password").click(function () {
        const mobile = $("#mobile").val();
        const result1 = validate_register_mobile(mobile);

        if (result1) {
            $("#forget_password_form").submit();
        }
    })

    $("#update_password_btn").click(function () {

        const mobile = $("#mobile").val();
        const password = $("#password").val();
        const password_confirm = $("#password_confirmation").val();
        const result1 = validate_mobile(mobile,"#mobile");
        const result2 = validate_password(password,"#password");
        const result3 = validate_password_confirm(password,password_confirm);
        if (result1 && result2 && result3) {
            $("#updatePasswordForm").submit();
        }
    });




});
function validate_mobile(mobile_number,element) {
    const el=(element==undefined) ? "#register_mobile" : element;
    if (mobile_number.toString().trim() == "") {
        $(el).addClass('validate_error_border');
        $("#mobile_error_message").show().text('لطفاً شماره موبایل خود را وارد نمایید');
        return false;
    } else if (check_mobile_number(mobile_number)) {
        $(el).addClass('validate_error_border');
        $("#mobile_error_message").show().text(' شماره موبایل وارد شده معتبر نمی باشد');
        return false;
    } else {
        $(el).removeClass('validate_error_border');
        $("#mobile_error_message").hide();
        return true;
    }
}

function validate_password(password,element) {
    const el=(element==undefined) ? "#register_mobile" : element;
    if (password.toString().trim().length < 8) {
        $(el).addClass('validate_error_border');
        $("#password_error_message").show().text(' کلمه عبور باید حداقل 8 کاراکتر باشد');
        return false;
    } else {
        $(el).removeClass('validate_error_border');
        $("#password_error_message").hide();
        return true;
    }
}

function validate_password_confirm(password,password_confirm)
{
    if(password.toString().trim().length >= 8)
    {
            if (password_confirm!=password)
            {

                $("#password_confirmation").addClass('validate_error_border');
                $("#password_confirmation_error_message").show().text('تکرار کلمه عبور با کلمه عبور مطابقت ندارد');
                return false;
            }
            else {
                $("#password_confirmation").removeClass('validate_error_border');
                $("#password_confirmation_error_message").hide();
                return true;
            }
    }
    else {
        return false;
    }


}
