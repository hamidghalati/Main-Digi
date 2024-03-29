const site_url = 'http://127.0.0.1:8000/';
let Toggle = false;
let delete_url;
let token;
let send_array_data = false;
let _method = 'DELETE';

$(document).ready(function () {
    $('#sidebar_menu li').click(function () {
        if (!$(this).hasClass('active')) {

            $('#sidebar_menu li').removeClass('active');
            $(this).addClass('active');


            $('.child_menu').slideUp(500);


            $('#sidebar_menu .fa-angle-down').removeClass('fa-angle-down');
            $("#sidebar_menu .fa-angle-down", this).addClass('fa-angle-down');

            if (!Toggle) {
                $('.child_menu', this).slideDown(500);

            } else {
                $('.child_menu', this).show();
            }
        } else if (Toggle) {
            $('.child_menu').slideUp(500);
            $(".child_menu", this).show();

        }


    });

    $('#sidebarToggle').click(function () {
        if ($('.page-sidebar').hasClass('toggled')) {
            Toggle = false;
            $('.page-sidebar').removeClass('toggled');
            $('#sidebar_menu').find('.active .child_menu').css('display', 'block');
            $('.page-content').css('margin-right', '240px');
        } else {
            Toggle = true;
            $('.page-sidebar').addClass('toggled');
            $('.child_menu').hide();
            $('.page-content').css('margin-right', '50px');
        }
    });

    $(window).resize(function () {
        set_sidebar_width();
    });
});


$(document).ready(function () {
    set_sidebar_width();

    const url = window.location.href.split('?')[0];
    $('#sidebar_menu a[href="' + url + '"]').parent().parent().addClass('active');
    $('#sidebar_menu a[href="' + url + '"]').parent().parent().find('a .fa-angle-left').addClass('fa-angle-down');
    $('#sidebar_menu a[href="' + url + '"]').parent().parent().find('.child_menu').show();


});

set_sidebar_width = function () {
    const width = document.body.offsetWidth;
    if (width < 850) {
        $('.page-sidebar').addClass('toggled');
        $('.page-content').css('margin-right', '50px');
        $('.child_menu').hide();
    } else {
        if (Toggle == false) {
            $('.page-sidebar').removeClass('toggled');
            $('.page-content').css('margin-right', '240px');
        }
    }
}

select_file = function () {
    $('#pic').click();
};

select_file2 = function () {
    $('#mobile_pic').click();
};

loadFile = function (event) {
    const render = new FileReader();
    render.onload = function () {
        const output = document.getElementById('output');
        output.src = render.result;
    };
    render.readAsDataURL(event.target.files[0]);

}

loadFile2 = function (event) {
    const render = new FileReader();
    render.onload = function () {
        const output = document.getElementById('output2');
        output.src = render.result;
    };
    render.readAsDataURL(event.target.files[0]);

}

del_row = function (url, t, message_text) {
    _method = 'DELETE';
    delete_url = url;
    token = t;
    $("#msg").text(message_text);
    $(".message_div").show();

};

delete_row = function () {

    if (send_array_data) {
        $("#data_form").submit();
    } else {
        let form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', delete_url);


        const hiddenField1 = document.createElement('input');
        hiddenField1.setAttribute('name', '_method');
        hiddenField1.setAttribute('value', _method);
        form.appendChild(hiddenField1);

        const hiddenField2 = document.createElement('input');
        hiddenField2.setAttribute('name', '_token');
        hiddenField2.setAttribute('value', token);
        form.appendChild(hiddenField2);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }


};

hide_box = function () {
    token = '';
    delete_url = '';
    $(".message_div").hide();
};

$('.check_box').click(function () {
    send_array_data = false;
    const $checkboxs = $('.panel_content input[type="checkbox"]');
    const $count = $checkboxs.filter(':checked').length;
    if ($count > 0) {
        $("#remove_item").removeClass('off');
        $("#remove_color").removeClass('offcolor');

        $("#restore_color").removeClass('offcolor');
        $("#restore_item").removeClass('off');
    } else {
        $('#remove_item').addClass('off');
        $('#remove_color').addClass('offcolor');

        $('#restore_item').addClass('offcolor');
        $('#restore_color').addClass('off');
    }

});

$('.item_form').click(function () {
    send_array_data = true;
    const $checkboxs = $('.panel_content input[type="checkbox"]');
    const $count = $checkboxs.filter(':checked').length;
    if ($count > 0) {
        const href = window.location.href.split('?');
        let action = href[0] + "/" + this.id;
        if (href.length == 2) {
            action = action + "?" + href[1];
        }
        $("#data_form").attr('action', action);
        $("#msg").text($(this).attr('msg'));
        $('.message_div').show();
    }

});

$('span').tooltip();

restore_row = function (url, t, message_text) {
    _method = 'post';
    delete_url = url;
    token = t;
    $("#msg").text(message_text);
    $('.message_div').show();

}

add_tag = function () {
    const tag_list = document.getElementById('tag_list').value;
    const t = tag_list.split(',');
    const keywords = document.getElementById('keywords').value;
    let count = document.getElementsByClassName('tag_div').length + 1;
    let string = keywords;
    for (let i = 0; i < t.length; i++) {
        if (t[i].trim() != '') {
            // const n=keywords.search(t[i]);
            const check = check_has_tag(keywords, t[i]);
            if (check) {
                const r = "'" + t[i] + "'";
                string = string + "," + t[i];
                var tag = '<div class="tag_div" id="tag_div_' + count + '">' +
                    '<span class="fa fa-remove" onclick="remove_tag(' + count + ',' + r + ')"></span>' + t[i] +
                    '</div>';
                count++;
                $("#tag_box").append(tag);
            }
        }
    }
    document.getElementById('keywords').value = string;
    document.getElementById('tag_list').value = '';
}

check_has_tag = function (tag_list, tag) {
    let result = true;
    tag_list = tag_list.toString().split(',');
    for (let i=0;i<tag_list.length;i++) {
        if (tag_list[i].trim()==tag.toString().trim())
        {
            result=false;
        }
    }
    return result;
}

remove_tag = function (id, text) {
    $("#tag_div_" + id).hide();
    const keywords = document.getElementById('keywords').value;
    const t1 = text + ",";
    const t2 = "," + text;
    let a = keywords.replace(t1, '');
    let b = a.replace(t2, '');
    document.getElementById('keywords').value = b;


}

add_item_input = function () {
    const id = document.getElementsByClassName('item_input').length + 1;
    const html = '<div class="form-group item_group" id="item_-' + id + '">' +
        '<input type="text" class="form-control item_input" name="item[-' + id + ']" placeholder="نام گروه ویژگی">' +
        '<span class="fa fa-plus-circle" onclick="add_child_input(-' + id + ')"></span>' +
        '<div class="child_item_box"></div>'
        + '</div>';
    $("#item_box").append(html);

}

add_child_input = function (id) {
    const child_count = document.getElementsByClassName('child_input_item').length + 1;
    const count = document.getElementsByClassName('child_' + id).length + 1;
    const html = '<div class="form-group child_' + id + '" >' +
        count + '-' + '<div class="pretty p-icon p-curve p-pulse">' +
        '<input type="checkbox" name="check_box_item[' + id + '][-' + child_count + ']" >'
        + '<div class="state p-warning-o"> <i class="icon mdi mdi-check"></i><label></label></div></div>'
        + '<input type="text" name="child_item[' + id + '][-' + child_count + ']" class="form-control child_input_item" placeholder="نام ویژگی">' +
        '</div>';
    $("#item_" + id).find('.child_item_box').append(html);
}

add_item_value_item = function (id) {
    const html = '<div class="form-group">' +
        '<label></label>' +
        '<input name="item_value[' + id + '][]" type="text" class="form-control" placeholder=" مشخصات را وارد نمایید...">' +
        '</div>';
    $("#input_item_box_" + id).append(html);
}

add_filter_input = function () {
    const id = document.getElementsByClassName('filter_input').length + 1;
    const html = '<div class="form-group item_group" id="filter_-' + id + '">' +
        '<input type="text" class="form-control filter_input" name="filter[-' + id + ']" placeholder="نام گروه فیلتر">'
        + '<span class="fa fa-plus-circle" onclick="add_filter_child_input(-' + id + ')"></span>'
        + '<div class="child_filter_box"></div>'
        + '</div>';
    $("#filter_box").append(html);
};

add_filter_child_input = function (id) {

    const child_count = document.getElementsByClassName('child_input_filter').length + 1;
    const count = document.getElementsByClassName('child_' + id).length + 1;

    const html = '<div class="form-group child_' + id + '" >' +
        count + '-' + '<input type="text" name="child_filter[' + id + '][-' + child_count + ']" class="form-control child_input_filter" placeholder="نام فیلتر">' +
        '</div>';
    $("#filter_" + id).find('.child_filter_box').append(html);
}

$('.item_filter_box ul li input[type="checkbox"]').click(function () {
    const filter = $(this).parent().parent().parent().parent().find('.filter_value');
    const input = $(this).parent().parent().parent().parent().find('.item_value');
    const text = $(this).parent().text().trim();
    let value = input.val();
    let filter_value = filter.val();
    if ($(this).is(":checked")) {
        if (value.trim() == '') {
            value = text;
            filter_value = $(this).val();
        } else {
            value = value + "," + text;
            filter_value = filter_value + "@" + $(this).val();
        }
        input.val(value);
        filter.val(filter_value);
    } else {
        value = value.replace("," + text, "");
        value = value.replace(text + ",", "");
        value = value.replace(text, "");
        filter_value = filter_value.replace("@" + $(this).val(), "");
        filter_value = filter_value.replace($(this).val(), "");
        input.val(value);
        filter.val(filter_value);

    }


});

$('.show_filter_box').click(function () {
    const el = $(this).parent().find('.item_filter_box ul');
    const display = el.css('display');
    if (display == 'block') {
        el.slideUp();
    } else {
        el.slideDown();
    }
});

$('.comment_status').click(function () {
    const comment_id = $(this).attr('comment-id');
    const status = $(this).attr('comment-status');
    const el = $(this);
    $("#loading").show();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    const url = site_url + "admin/comment/change_status";
    $.ajax({
        url: url,
        type: "POST",
        data: "comment_id=" + comment_id,
        success: function (response) {
            if (response == 'ok') {

                if (status == 1) {
                    el.text('در انتظار تایید')
                    el.attr('comment-status', 0);
                    el.parent().parent().parent().removeClass('Accepted').addClass('pending_approval');
                } else {
                    el.text(' تایید شده');
                    el.attr('comment-status', 1);
                    el.parent().parent().parent().addClass('Accepted').removeClass('pending_approval');
                }
            } else {
                $("#server_error_box").show();
                setTimeout(function () {
                    $("#server_error_box").hide();
                }, 5000);
            }
            $("#loading").hide();

        },
        error: function (jqXhr, textStatus, error) {
            $("#server_error_box").show();
            setTimeout(function () {
                $("#server_error_box").hide();
            }, 5000);
            $("#loading").hide();
        }
    });

});

$(".add_answer").click(function () {
    $(".answer_div").slideUp();
    $(this).parent().parent().find('.answer_div').slideDown();
});

$(".question_status").click(function () {
    const question_id = $(this).attr('question_id');
    const status = $(this).attr('status');
    const el = $(this);
    $("#loading").show();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    const url = site_url + "admin/question/change_status";
    $.ajax({
        url: url,
        type: "POST",
        data: "question_id=" + question_id,
        success: function (response) {
            if (response == 'ok') {

                if (status == 1) {
                    el.text('در انتظار تایید')
                    el.attr('status', 0);
                    el.parent().parent().addClass('question-pending-approval');
                } else {
                    el.text(' تایید شده');
                    el.attr('status', 1);
                    el.parent().parent().removeClass('question-pending-approval');
                }
            } else {
                $("#server_error_box").show();
                setTimeout(function () {
                    $("#server_error_box").hide();
                }, 5000);
            }
            $("#loading").hide();

        },
        error: function (jqXhr, textStatus, error) {
            $("#server_error_box").show();
            setTimeout(function () {
                $("#server_error_box").hide();
            }, 5000);
            $("#loading").hide();
        }
    });

});

add_answer = function (token, id) {
    const answer = $("#answer_" + id).val();

    if (answer.trim() != "") {
        const url = site_url + "admin/question/addAnswer/" + id;
        let form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', url);

        const hiddenField1 = document.createElement('input');
        hiddenField1.setAttribute('name', '_token');
        hiddenField1.setAttribute('value', token);
        form.appendChild(hiddenField1);

        const hiddenField2 = document.createElement('input');
        hiddenField2.setAttribute('name', 'answer');
        hiddenField2.setAttribute('value', answer);
        form.appendChild(hiddenField2);

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }
}

number_format = function (num) {
    num = num.toString();
    let format = '';
    let counter = 0;
    for (let i = num.length - 1; i >= 0; i--) {
        format += num[i];
        counter++;
        if (counter == 3) {
            format += ",";
            counter = 0;
        }
    }
    return format.split('').reverse().join('');
}

const month = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند'
]

getMonthName = function (key) {

    if (month[key] != undefined) {
        return month[key];
    } else {
        return '';
    }
}
