const site_url='http://127.0.0.1:8000/';
let times=null;
let t=180;
$(document).ready(function () {
    $(".cat_item").mouseover(function () {
        const li_width=$(this).css('width');
        const ul_width=$(".index-cat-list ul").width();
        const a=li_width.replace('px','');
       const right=ul_width-$(this).offset().left-a+15;
        $('.cat_hover').css('width',li_width);
        $(".cat_hover").css('right',right);
        $(".cat_hover").css('transform','scaleX(1)');
        $('.li_div').hide();
        $('.li_div',this).show();
    });

    $('.index-cat-list').mouseleave(function () {
        $(".cat_hover").css('transform','scaleX(0)');
        $('.li_div').hide();
    });

    $(".discount_left_item div").click(function () {
        $(".discount_left_item div").removeClass('active');
        const id=$(this).attr('data-id');
        $('.discount_box_content .item').hide();
        $("#discount_box_link_"+id).show();
        $(this).addClass('active');
    });

    $(".discount_box_footer .slide-amazing").click(function () {
        const id=$(this).attr('data-id');
        $('.discount_box_content .item').hide();
        $("#discount_box_link_"+id).show();
        $(".discount_box_footer .slide-amazing").removeClass('active');
        $(this).addClass('active');
    });

    let discount_slider_count=0;
    let discount_slider_number=0;
    const discount_box_footer=$('.discount_box_footer').css('display')
    if (discount_box_footer=='none')
    {
        discount_slider_count=$('.discount_left_item div').length;
        const discount_slider= setInterval(function () {
            const discount_box_footer=$('.discount_box_footer').css('display');
            if (discount_box_footer=='none')
            {
                discount_slider_number++;
                $(".discount_left_item div").removeClass('active');
                $('.discount_box_content .item').hide();

                if (discount_slider_number>=discount_slider_count)
                {
                    discount_slider_number=0;
                }

                $("#item_number_"+discount_slider_number).addClass('active');
                const id=$("#item_number_"+discount_slider_number).attr('data-id');
                $("#discount_box_link_"+id).show();
            }
            else {
                clearInterval(discount_slider);
            }




        },5000);
    }

    $(document).on('click','.color_li',function () {
        const color_id=$(this).attr('data');
        const product_id=$("#product_id").val();
        change_color(color_id,product_id);

    });

    $('.send_btn').hover(function () {
        $('.send_btn .line').addClass('line2');
    },function (){
        $('.send_btn .line').removeClass('line2');
    });


    $('.show_more_important_item').click(function () {
       const  more_important_item=$('.more_important_item').css('display');
       if (more_important_item=='none')
       {
           $(".more_important_item").slideDown();
           $('.show_more_important_item').text('موارد کمتر');
           $('.show_more_important_item').addClass('minus_important_item');
       }
       else
       {
           $(".more_important_item").slideUp();
           $('.show_more_important_item').text('موارد بیشتر');
           $('.show_more_important_item').removeClass('minus_important_item');
       }
    });

    $("#register_btn").click(function () {
        const mobile=$("#register_mobile").val();
        const password=$("#register_password").val();
        const result1=validate_register_mobile(mobile);
        const result2=validate_register_password(password);
        if (result1 && result2)
        {
            $("#register_form").submit();
        }
    });

    $("#resend_active_code").click(function () {
        if (t==0)
        {
            const mobile=$("#user_mobile").val();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            const url=site_url+"ajax/resend";
            $.ajax({
                url:url,
                type:"POST",
                data:"mobile="+mobile,
                success:function (response) {
                   t=180;
                   startTime();
                },
                error:function (jqXhr,textStatus,error) {
                    t=180;
                    startTime();
                }
            });
        }
    });

    $("#active_account_btn").click(function () {
        $("#active_account_form").submit();
    });

    $("#login_btn").click(function () {
        const mobile=$("#login_mobile").val();
        const password=$("#login_password").val();
        const result1=validate_login_mobile(mobile);
        const result2=validate_login_password(password);
        if (result1 && result2)
        {
            $("#login_form").submit();
        }

    });

    $("#login_remember").click(function () {
       if ($(this).hasClass('active'))
       {
           $(this).removeClass('active');
           $("#remember").removeAttr('checked');
       }
       else
       {
           $(this).addClass('active')
           $("#remember").attr('checked',true);
       }
    });

    $("#cart_btn").click(function () {
       $("#add_cart_form").submit();
    });

});

let img_count=0;
let img=0;
function load_slider(count){
    img_count=count;
    setInterval( next,5000);
}
function next(){
    $('.slider_bullet_div span').removeClass('active');
    if (img==(img_count-1))
    {
        img=-1;
    }
    img=img+1;
    $('.slide_div').hide();
    document.getElementById('slider_img_'+img).style.display='block';
    $("#slider_bullet_"+img).addClass('active');
}

function prev(){
    $('.slider_bullet_div span').removeClass('active');
    img=img-1;
    if (img==-1)
    {
        img=(img_count-1);
    }
    $('.slide_div').hide();
    document.getElementById('slider_img_'+img).style.display='block';
    $("#slider_bullet_"+img).addClass('active');

}

function change_color(color_id,product_id)
{
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    const url=site_url+"site/change_color";
    $.ajax({
        url:url,
        type:"POST",
        data:"color_id="+color_id+"&product_id="+product_id,
        success:function (response) {
            if(response)
            {
                $("#warranty_box").html(response);
                $("#offers_time").click();
            }


        }
    });
}

function validate_register_mobile(mobile_number)
{
    if (mobile_number.toString().trim()=="")
    {
        $("#register_mobile").addClass('validate_error_border');
        $("#mobile_error_message").show().text('لطفاً شماره موبایل خود را وارد نمایید');
        return false;
    }
    else if(check_mobile_number(mobile_number))
    {
        $("#register_mobile").addClass('validate_error_border');
        $("#mobile_error_message").show().text(' شماره موبایل وارد شده معتبر نمی باشد');
        return false;
    }
    else {
        $("#register_mobile").removeClass('validate_error_border');
        $("#mobile_error_message").hide();
        return true;
    }
}

function validate_register_password(password)
{
    if (password.toString().trim().length<8)
    {
        $("#register_password").addClass('validate_error_border');
        $("#password_error_message").show().text(' کلمه عبور باید حداقل 8 کاراکتر باشد');
        return false;
    }
    else {
        $("#register_password").removeClass('validate_error_border');
        $("#password_error_message").hide();
        return true;
    }
}

function check_mobile_number(mobile_number)
{
    if (isNaN(mobile_number))
    {
        return true;
    }
    else {
        if (mobile_number.toString().trim().length==11)
        {

            if (mobile_number.toString().charAt(0)=='0' && mobile_number.toString().charAt(1)=='9')
            {

                return false;
            }
            else {
                return true;

            }
        }
        else if(mobile_number.toString().trim().length==10)
        {
            if (mobile_number.toString().charAt(0)=='9' )
            {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }

    }
}
replaceNumber=function(n) {
    n=n.toString();
    const find=["0","1","2","3","4","5","6","7","8","9"]
    const replace=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"]
    for (let i=0;i<find.length;i++)
    {
        n=n.replace(new RegExp(find[i],'g'),replace[i]);
    }
    return n;
};

function startTime()
{
    times=setInterval(function () {
        t=t-1;
        let m=Math.floor(t/60);
        let s=t-m*60;
        if (s.toString().length==1)
        {
            s="0"+s;
        }
        let text=replaceNumber("0"+m.toString())+":"+replaceNumber(s.toString());
        if (t==0)
        {
            clearInterval(times);
            times=null;
            $("#timer").text('');
        }
        else {
            $("#timer").text(text);
        }

    },1000);
}


function validate_login_mobile(mobile_number)
{
    if(mobile_number.toString().trim()=="")
    {
        $("#login_mobile").addClass('validate_error_border');
        $("#mobile_error_message").show().text('لطفاً شماره موبایل خود را وارد نمایید');
        return false;
    }
    else if(check_mobile_number(mobile_number))
    {
        $("#login_mobile").addClass('validate_error_border');
        $("#mobile_error_message").show().text(' شماره موبایل وارد شده معتبر نمی باشد');
        return false;
    }
    else {
        $("#login_mobile").removeClass('validate_error_border');
        $("#mobile_error_message").hide();
        return true;
    }
}

function validate_login_password(password)
{
    if (password.toString().trim()=="")
    {
        $("#login_password").addClass('validate_error_border');
        $("#password_error_message").show().text(' کلمه عبور خود را وارد کنید');
        return false;
    }
    else {
        $("#login_password").removeClass('validate_error_border');
        $("#password_error_message").hide();
        return true;
    }
}









































































































//        <!--دستور جی کوِرب برای منو-->
var  timer={};

$('#menu_top li').hover(function ()
{
    var tag=$(this);
    var timerAtte=tag.attr('data-time');
    clearTimeout(timer[timerAtte]);
    timer[timerAtte]=setTimeout(function ()
    {
        $('>ul',tag).fadeIn(0);
        tag.addClass('active-menu');
        $('>.submenu3 ',tag).fadeIn(0);
    },500);


},function ()
{
    var tag=$(this);
    var timerAtte=tag.attr('data-time');
    clearTimeout(timer[timerAtte]);
    timer[timerAtte]=setTimeout(function ()
    {
        $('>ul', tag).fadeOut(0);
        tag.removeClass('active-menu');
        $('> .submenu3', tag).fadeOut(0);
    },600);
})


