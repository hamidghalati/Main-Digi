$(document).ready(function () {
   $("#align-justify").on('click',function () {
       $('.catBox').show();
       setTimeout(function () {
           document.getElementById('mySideNav').style.right='0';
       },50);
   });

   $("#catBox").click(function () {
      const width=$(window).width();
      const clientX=parseInt(event.clientX);
      if ((width-clientX)>270)
      {
          document.getElementById('mySideNav').style.right='-270px';
          setTimeout(function () {
              $('.catBox').hide();
          },300);
      }
   });

   $('.parent_cat').click(function () {
       $(".li_div").hide();
      $(".parent_cat").find('.mdi-minus-circle').addClass('mdi-plus-circle').removeClass('mdi-minus-circle');

      if ($(this).find('i').hasClass('mdi-plus-circle'))
      {

          $(this).find('i').removeClass('mdi-plus-circle').addClass('mdi-minus-circle');
          $(this).parent().find('.li_div').show();
      }
      else {

          $(this).find('i').addClass('mdi-plus-circle').removeClass('mdi-minus-circle');
      }
   });

   $('#mySideNav .child_cat').click(function () {

       $(this).parent().parent().find('li ul').hide();
       $(this).parent().parent().find('li a').find('mdi-minus-circle').removeClass('mdi-minus-circle').addClass('mdi-plus-circle');

       if ($(this).find('.mdi').hasClass('mdi-plus-circle'))
       {
           $(this).find('.mdi').removeClass('mdi-plus-circle').addClass('mdi-minus-circle');
           $(this).parent().find('ul').show();
       }
       else {
           $(this).find('.mdi').addClass('mdi-plus-circle').removeClass('mdi-minus-circle');
       }
   });

});
