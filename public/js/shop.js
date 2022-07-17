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
