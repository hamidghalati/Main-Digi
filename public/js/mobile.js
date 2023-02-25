const site_url = 'http://127.0.0.1:8000/';

$(document).ready(function () {

    $("#align-justify").on('click', function () {
        $('.catBox').show();
        setTimeout(function () {
            document.getElementById('mySideNav').style.right = '0';
        }, 50);
    });

    $("#catBox").click(function () {
        const width = $(window).width();
        const clientX = parseInt(event.clientX);
        if ((width - clientX) > 270) {
            document.getElementById('mySideNav').style.right = '-270px';
            setTimeout(function () {
                $('.catBox').hide();
            }, 300);
        }
    });

    $('.parent_cat').click(function () {
        $(".li_div").hide();
        $(".parent_cat").find('.mdi-minus-circle').addClass('mdi-plus-circle').removeClass('mdi-minus-circle');

        if ($(this).find('i').hasClass('mdi-plus-circle')) {

            $(this).find('i').removeClass('mdi-plus-circle').addClass('mdi-minus-circle');
            $(this).parent().find('.li_div').show();
        } else {

            $(this).find('i').addClass('mdi-plus-circle').removeClass('mdi-minus-circle');
        }
    });

    $('#mySideNav .child_cat').click(function () {

        $(this).parent().parent().find('li ul').hide();
        $(this).parent().parent().find('li a').find('mdi-minus-circle').removeClass('mdi-minus-circle').addClass('mdi-plus-circle');

        if ($(this).find('.mdi').hasClass('mdi-plus-circle')) {
            $(this).find('.mdi').removeClass('mdi-plus-circle').addClass('mdi-minus-circle');
            $(this).parent().find('ul').show();
        } else {
            $(this).find('.mdi').addClass('mdi-plus-circle').removeClass('mdi-minus-circle');
        }
    });

    $(document).on('click', '.color_li', function () {
        const color_id = $(this).attr('data');
        const product_id = $("#product_id").val();
        change_color(color_id, product_id);

    });

    set_mobile_data_right_value();

    $(document).on('click', '.mobile_data_box .header a', function () {

        set_mobile_data_right_value();
        $('body').css('overflow-y', 'auto');

    });

    $("#show_more_item_product").click(function () {
        $("#product_item").show();
        setTimeout(function () {
            $("#product_item").css('right', '0');
        },20);

        $('body').css('overflow-y', 'hidden');
    });

    $('.add_product_link').click(function () {
       $("#add_cart_form").submit();
    });

    $('.advanced_search_box').click(function () {
        $("#filter_box").show();
        setTimeout(function () {
            $("#filter_box").css('right', '0');
        },20);

        $('body').css('overflow-y', 'hidden');
    });

    $('.title_box').click(function () {
        const el = $(this).parent().find('.filter_box');
        if (el.css('display') == 'none') {
            el.slideDown();
            $('.mdi-plus-circle', this).removeClass('mdi-plus-circle').addClass('mdi-minus-circle');
        } else {
            el.slideUp();
            $('.mdi-minus-circle', this).removeClass('mdi-minus-circle').addClass('mdi-plus-circle');
        }
    });

    let search = new window.URLSearchParams(window.location.search);
    if (document.getElementById('product_status')) {
        if (search.get('has_product') != null) {
            if (search.get('has_product') == 1) {
                $('#product_status').toggles({
                    type: 'Light',
                    text: {'on': '', 'off': ''},
                    width: 50,
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

    $('.sort_btn').click(function () {
       $("#sort_dialog_box").modal('show');
    });

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

    const legal=$("#legal_box");
    if (legal.length==1)
    {
        const w=$(window).width();
        if (w<500)
        {
            $('.form_cover').remove();
            $("#legal_box").hide();
            $('.feedback_hint_error').css('color','red');

        }
        else {
            $("#legal_title").show();
            $('.feedback_hint_error').css('color','red');
        }
    }


});

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

function set_mobile_data_right_value() {
    const width = $(window).width();
    $(".mobile_data_box").css('right', '-' + width + 'px');
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
