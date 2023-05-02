const site_url = "http://127.0.0.1:8000/";
var times = 0;
let t = 180;
let promo_single_count=0

$(document).ready(function () {
    $(".cat_item").mouseover(function () {
        const li_width = $(this).css('width');
        const ul_width = $(".index-cat-list ul").width();
        const a = li_width.replace('px', '');
        const right = ul_width - $(this).offset().left - a + 15;

        $('.cat_hover').css('width', li_width);
        $(".cat_hover").css('right', right);
        $(".cat_hover").css('transform', 'scaleX(1)');
        $('.li_div').hide();
        $('.li_div', this).show();
    });

    $('.index-cat-list').mouseleave(function () {
        $(".cat_hover").css('transform', 'scaleX(0)');
        $('.li_div').hide();
    });

    $(".discount_left_item div").click(function () {
        $(".discount_left_item div").removeClass('active');
        const id = $(this).attr('data-id');
        $('.discount_box_content .item').hide();
        $("#discount_box_link_" + id).show();
        $(this).addClass('active');
    });

    $(".discount_box_footer .slide-amazing").click(function () {
        const id = $(this).attr('data-id');
        $('.discount_box_content .item').hide();
        $("#discount_box_link_" + id).show();
        $(".discount_box_footer .slide-amazing").removeClass('active');
        $(this).addClass('active');
    });

    $('.header_box').click(function () {
        const el = $(this).parent().find('.ordering_product_list');
        const display = el.css('display');
        if (display == 'block') {
            el.slideUp();
        } else {
            el.slideDown();
        }
    });


    let discount_slider_count = 0;
    let discount_slider_number = 0;
    const discount_box_footer = $('.discount_box_footer').css('display')
    if (discount_box_footer == 'none') {
        discount_slider_count = $('.discount_left_item div').length;
        const discount_slider = setInterval(function () {
            const discount_box_footer = $('.discount_box_footer').css('display');
            if (discount_box_footer == 'none') {
                discount_slider_number++;
                $(".discount_left_item div").removeClass('active');
                $('.discount_box_content .item').hide();

                if (discount_slider_number >= discount_slider_count) {
                    discount_slider_number = 0;
                }

                $("#item_number_" + discount_slider_number).addClass('active');
                const id = $("#item_number_" + discount_slider_number).attr('data-id');
                $("#discount_box_link_" + id).show();
            } else {
                clearInterval(discount_slider);
            }


        }, 5000);
    }

    $(document).on('click', '.color_li', function () {
        const color_id = $(this).attr('data');
        const product_id = $("#product_id").val();
        change_color(color_id, product_id);

    });

    $('.send_btn').hover(function () {
        $('.send_btn .line').addClass('line2');
    }, function () {
        $('.send_btn .line').removeClass('line2');
    });

    $('.show_more_important_item').click(function () {
        const more_important_item = $('.more_important_item').css('display');
        if (more_important_item == 'none') {
            $(".more_important_item").slideDown();
            $('.show_more_important_item').text('موارد کمتر');
            $('.show_more_important_item').addClass('minus_important_item');
        } else {
            $(".more_important_item").slideUp();
            $('.show_more_important_item').text('موارد بیشتر');
            $('.show_more_important_item').removeClass('minus_important_item');
        }
    });

    $("#register_btn").click(function () {
        const mobile = $("#register_mobile").val();
        const password = $("#register_password").val();
        const result1 = validate_register_mobile(mobile);
        const result2 = validate_register_password(password);
        if (result1 && result2) {
            $("#register_form").submit();
        }
    });

    $("#resend_active_code").click(function () {
        if (t == 0) {
            const mobile = $("#user_mobile").val();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            const url = site_url + "ajax/resend";
            $.ajax({
                url: url,
                type: "POST",
                data: "mobile=" + mobile,
                success: function (response) {
                    t = 180;
                    startTime();
                },
                error: function (jqXhr, textStatus, error) {
                    t = 180;
                    startTime();
                }
            });
        }
    });

    $("#active_account_btn").click(function () {
        $("#active_account_form").submit();
    });


    $(".favorite").click(function () {
        const product_id=$(this).attr('product-id');
        $("#loading").show();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        const url = site_url + "user/add_favorite";
        $.ajax({
            url: url,
            type: "POST",
            data: "product_id=" + product_id,
            success: function (response) {
                $("#loading").hide();
                if (response=='ok') {
                    if ($('.favorite i').hasClass('chosen'))
                    {
                        $('.favorite i').removeClass('chosen');
                    }
                    else {
                        $('.favorite i').addClass('chosen');
                    }
                }
            },
            error:function (xhr,textStatus,error) {
                $("#loading").hide();
                if (error=="Unauthorized"){
                    $("#login_box").modal('show');
                }

            }
        });
    });

    $("#login_remember").click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $("#remember").removeAttr('checked');
        } else {
            $(this).addClass('active')
            $("#remember").attr('checked', true);
        }
    });

    $("#cart_btn").click(function () {
        $("#add_cart_form").submit();
    });

    $('.title_box').click(function () {
        const el = $(this).parent().find('.filter_box');
        if (el.css('display') == 'none') {
            el.slideDown();
            $('.fa-angle-down', this).removeClass('fa-angle-down').addClass('fa-angle-up');
        } else {
            el.slideUp();
            $('.fa-angle-up', this).removeClass('fa-angle-up').addClass('fa-angle-down');
        }
    });

    let search = new window.URLSearchParams(window.location.search);
    if (document.getElementById('product_status')) {
        if (search.get('has_product') != null) {
            if (search.get('has_product') == 1) {
                $('#product_status').toggles({
                    type: 'Light',
                    text: {'on': 'موجود', 'off': 'ناموجود'},
                    width: 85,
                    direction: 'rtl',
                    on: true
                });
            }
        }

        if (search.get('has_ready_to_shipment') != null) {
            if (search.get('has_ready_to_shipment') == 1) {
                $('#send_status').toggles({
                    type: 'Light',
                    text: {'on': 'آماده ارسال', 'off': 'در حال آماده'},
                    width: 85,
                    direction: 'rtl',
                    on: true
                });
            }
        }
    }

    $("#brand_search").on('keyup', function () {
        const input = $(this).val().toLowerCase();
        const li = $(this).parent().find('.product_cat_ul li');
        for (let i = 0; i < li.length; i++) {

            if (li[i].innerText.toLowerCase().indexOf(input) > -1) {
                li[i].style.display = 'block';
            } else {
                li[i].style.display = 'none';
            }

        }
    });

    $('.remove_product_of_compare_list').click(function () {
        const product_id = $(this).attr('data-id');
        let url = window.location.href;
        url = url.replace('/dkp-' + product_id, '');
        window.location = url;
    });

    check_has_compare_list();

    $(".logout").click(function () {
        $("#logout_form").submit();
    });

    $(".expert_button").click(function () {
        const display = $(this).parent().find('.content').css('display');
        if (display == 'block') {
            $(this).parent().find('.content').css('display', 'none');
            $(this).addClass('plus_btn');
        } else {
            $(this).parent().find('.content').css('display', 'block');
            $(this).removeClass('plus_btn');
        }
    });

    $('.more_content span').click(function () {
        if ($(this).parent().hasClass('show_short_content')) {
            $('.tozihat .content div').css('max-height', '250px');
            $(this).text('ادامه مطلب');
            $(this).parent().removeClass('show_short_content');
        } else {
            $('.tozihat .content div').css('max-height', 'none');
            $(this).text('نمایش کمتر');
            $(this).parent().addClass('show_short_content');
        }

    });

    $('.item_slider').on('input', function () {
        const newValue = this.value;
        const left = (100 - (newValue) * 25) + '%';
        $(this).parent().find('.range_slider_div .active_range_slider').css('left', left);

        const Array = ['slider_step_two', 'slider_step_three', 'slider_step_four', 'slider_step_five', 'slider_step_six'];
        $(this).parent().find('.range_slider_div .js-slider-step').removeClass('active_range_step');
        for (let i = 0; i < newValue; i++) {
            $(this).parent().find('.range_slider_div .' + Array[i]).addClass('active_range_step');
        }

        const title = $(this).parent().find('.range_slider_div .' + Array[newValue]).attr('data-rate-title');
        $(this).parent().find('.range_slider_div').attr('data-rate-title', title);

    });

    $('.input_add_point input[type="text"]').keyup(function () {
        const value = $(this).val();
        if (value.trim().length > 2) {
            $(this).parent().find('button').css('display', 'block');
        } else {
            $(this).parent().find('button').css('display', 'none');
        }
    });

    $('.input_add_point button').click(function () {
        const value = $(this).parent().find('input[type="text"]').val();
        const name = $(this).parent().find('input[type="text"]').attr('id');
        if (value.trim().length > 2) {
            const html = '<div><span>' + value + '</span>' +
                '<span class="fa fa-close" id="fa-close"></span>' +
                '<input type="hidden" value="' + value + '" name="' + name + '[]">' +
                '</div>';
            $("#" + name + "_input_box").append(html);
            $(this).parent().find('input[type="text"]').val('')
            $(this).hide();
        }
    });

    $(document).on('click', '.score_comment_form .item_list #fa-close', function () {
        $(this).parent().remove();
    });

    $("#comment_form").submit(function (event) {
        const comment_title = $("#comment_title").val();
        const comment_content = $("#comment_content").val();

        const check_title = check_comment_title(comment_title);
        const check_content = check_comment_content(comment_content);

        if (!check_title || !check_content) {
            event.preventDefault();
        }


    });

    const promo_single=$(".promo_single a");
    if (promo_single.length>0)
    {
        promo_single_count=promo_single.length;
        startPromoSingleSlide();
    }

    $(".cart-header-box .dropdown-menu").on({"click":function (e) {
            e.stopPropagation();
        }
    })

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });






});

let img_count = 0;
let img = 0;

function load_slider(count) {
    img_count = count;
    setInterval(next, 5000);
}

function next() {
    $('.slider_bullet_div span').removeClass('active');
    if (img == (img_count - 1)) {
        img = -1;
    }
    img = img + 1;
    $('.slide_div').hide();
    document.getElementById('slider_img_' + img).style.display = 'block';
    $("#slider_bullet_" + img).addClass('active');
}

function prev() {
    $('.slider_bullet_div span').removeClass('active');
    img = img - 1;
    if (img == -1) {
        img = (img_count - 1);
    }
    $('.slide_div').hide();
    document.getElementById('slider_img_' + img).style.display = 'block';
    $("#slider_bullet_" + img).addClass('active');

}

function change_color(color_id, product_id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    const url = site_url + "site/change_color";
    $.ajax({
        url: url,
        type: "POST",
        data: "color_id=" + color_id + "&product_id=" + product_id,
        success: function (response) {
            if (response) {
                $("#warranty_box").html(response);
                $("#offers_time").click();
            }


        }
    });
}

function validate_register_mobile(mobile_number) {
    if (mobile_number.toString().trim() == "") {
        $("#register_mobile").addClass('validate_error_border');
        $("#mobile_error_message").show().text('لطفاً شماره موبایل خود را وارد نمایید');
        return false;
    } else if (check_mobile_number(mobile_number)) {
        $("#register_mobile").addClass('validate_error_border');
        $("#mobile_error_message").show().text(' شماره موبایل وارد شده معتبر نمی باشد');
        return false;
    } else {
        $("#register_mobile").removeClass('validate_error_border');
        $("#mobile_error_message").hide();
        return true;
    }
}

function validate_register_password(password) {
    if (password.toString().trim().length < 8) {
        $("#register_password").addClass('validate_error_border');
        $("#password_error_message").show().text(' کلمه عبور باید حداقل 8 کاراکتر باشد');
        return false;
    } else {
        $("#register_password").removeClass('validate_error_border');
        $("#password_error_message").hide();
        return true;
    }
}

function check_mobile_number(mobile_number) {
    if (isNaN(mobile_number)) {
        return true;
    } else {
        if (mobile_number.toString().trim().length == 11) {

            if (mobile_number.toString().charAt(0) == '0' && mobile_number.toString().charAt(1) == '9') {

                return false;
            } else {
                return true;

            }
        } else if (mobile_number.toString().trim().length == 10) {
            if (mobile_number.toString().charAt(0) == '9') {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }

    }
}

replaceNumber = function (n) {
    n = n.toString();
    const find = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const replace = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
    for (let i = 0; i < find.length; i++) {
        n = n.replace(new RegExp(find[i], 'g'), replace[i]);
    }
    return n;
};

function startTime() {
    times = setInterval(function () {
        t = t - 1;
        let m = Math.floor(t / 60);
        let s = t - m * 60;
        if (s.toString().length == 1) {
            s = "0" + s;
        }
        let text = replaceNumber("0" + m.toString()) + ":" + replaceNumber(s.toString());
        if (t == 0) {
            clearInterval(times);
            times = null;
            $("#timer").text('');
        } else {
            $("#timer").text(text);
        }

    }, 1000);
}




check_has_compare_list = function () {
    const check_has_compare_list = document.getElementsByClassName('compare_product_gallery');
    if (check_has_compare_list.length > 0) {
        $(window).scroll(function (e) {
            if ($(document).scrollTop() > 200) {
                $('.compare_product_gallery').css('border-bottom', '3px solid #2196F3');
                $('.compare_product_gallery .btn-primary').hide();
                $('.compare_product_gallery .btn-dark').hide();
                $('.gallery_box').css('height', '320px');
                $('.gallery_box img').css('width', '40%');
                $('.compare_add').css('height', '320px');
            } else {
                $('.compare_product_gallery').css('border-bottom', '0');
                $('.compare_product_gallery .btn-primary').show();
                $('.compare_product_gallery .btn-dark').show();
                $('.gallery_box').css('height', '360px');
                $('.gallery_box img').css('width', '50%');
                $('.compare_add').css('height', '360px');
            }
        });
    }
}

check_comment_title = function (title) {
    if (title.trim() == "") {
        $("#comment_title_error_message").show().text('عنوان نظر را وارد کنید');
        $("#comment_title").addClass('validate_error_border');
        return false;
    } else {
        $("#comment_title_error_message").hide();
        $("#comment_title").removeClass('validate_error_border');
        return true;
    }
}

check_comment_content = function (content) {
    if (content.trim().length == 0) {
        $("#comment_content_error_message").show().text("متن نظر را وارد کنید");
        $("#comment_content").addClass('validate_error_border');
        return false;
    } else {
        $("#comment_content_error_message").hide();
        $("#comment_content").removeClass('validate_error_border');
        return true;
    }
}

number_format=function (num)
{
    num=num.toString();
    let format='';
    let counter=0;
    for (let i=num.length-1;i>=0;i--)
    {
        format+=num[i];
        counter++;
        if (counter==3)
        {
            format+=",";
            counter=0;
        }
    }
    return format.split('').reverse().join('');
}

// replaceNumber=function(n) {
//     n=n.toString();
//     const find=["0","1","2","3","4","5","6","7","8","9"]
//     const replace=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"]
//     for (let i=0;i<find.length;i++)
//     {
//         n=n.replace(new RegExp(find[i],'g'),replace[i]);
//     }
//     return n;
// }


//        <!--دستور جی کوِرب برای منو-->
var timer = {};

$('#menu_top li').hover(function () {
    var tag = $(this);
    var timerAtte = tag.attr('data-time');
    clearTimeout(timer[timerAtte]);
    timer[timerAtte] = setTimeout(function () {
        $('>ul', tag).fadeIn(0);
        tag.addClass('active-menu');
        $('>.submenu3 ', tag).fadeIn(0);
    }, 500);


}, function () {
    var tag = $(this);
    var timerAtte = tag.attr('data-time');
    clearTimeout(timer[timerAtte]);
    timer[timerAtte] = setTimeout(function () {
        $('>ul', tag).fadeOut(0);
        tag.removeClass('active-menu');
        $('> .submenu3', tag).fadeOut(0);
    }, 600);
})

let promo_index=0;
startPromoSingleSlide=function () {
    $('.promo_single_header').addClass('promo-single-bar');
    setInterval(function () {
        promo_index++;
        if (promo_index>(promo_single_count-1))
        {
            promo_index=0;
        }
        $('.promo_single a').removeClass('active');
        $("a[data-swiper-slide-index='"+promo_index+"']").addClass('active');
    },7000);
}

