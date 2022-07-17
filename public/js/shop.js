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
