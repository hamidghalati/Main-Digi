const site_url = 'http://127.0.0.1:8000/';

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

    $(document).on('click', '.color_li', function () {
        const color_id = $(this).attr('data');
        const product_id = $("#product_id").val();
        change_color(color_id, product_id);

    });

    set_mobile_data_right_value();



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

function set_mobile_data_right_value(){
    const width=$(window).width();
    $(".mobile_data_box").css('right','-'+width+'px');
}
