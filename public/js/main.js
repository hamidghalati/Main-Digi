
$(document).ready(function () {

    $("#profile_province_id").change(function () {
        const province_id=$(this).val();
        if (parseInt(province_id)>0)
        {
            const url=site_url+"api/get_city/"+province_id;
            $.ajax({
                type:"GET",
                url:url,
                success:function (response) {
                    let html='';
                    for (let i=0;i<response.length;i++)
                    {
                        html+='<option value='+response[i].id+'>'+response[i].name+'</option>'
                    }
                    if (html.trim()!='')
                    {
                        $("#profile_city").html(html).selectpicker('refresh');
                    }
                    else {
                        html='<option value="">انتخاب شهر</option>';
                        $("#profile_city").html(html).selectpicker('refresh');
                    }
                }
            })
        }
        else {
            html='<option value="">انتخاب شهر</option>';
            $("#profile_city").html(html).selectpicker('refresh');
        }
    });





});
