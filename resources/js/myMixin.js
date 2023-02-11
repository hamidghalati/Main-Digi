export default {
    methods:{
        replaceNumber:function(n) {
            n=n.toString();
            const find=["0","1","2","3","4","5","6","7","8","9"]
            const replace=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"]
            for (let i=0;i<find.length;i++)
            {
                n=n.replace(new RegExp(find[i],'g'),replace[i]);
            }
            return n;
        },
        check_mobile_number(){
            if (isNaN(this.mobile))
            {
                return true;
            }
            else {
                if (this.mobile.toString().trim().length==11)
                {

                    if (this.mobile.toString().charAt(0)=='0' && this.mobile.toString().charAt(1)=='9')
                    {

                        return false;
                    }
                    else {
                        return true;

                    }
                }
                else if(this.mobile.toString().trim().length==10)
                {
                    if (this.mobile.toString().charAt(0)=='9' )
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
        },
        number_format:function (num)
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
        },
        check_search_params:function (page_url) {
            let url=page_url==undefined ? window.location.href : page_url;
            const params=url.split('?');
            if (params[1] !=undefined)
            {
                if (params[1].indexOf('&')>-1)
                {
                    let vars=params[1].split('&');
                    for (let i in vars)
                    {
                        let k=vars[i].split('=')[0];
                        let v=vars[i].split('=')[1];
                        k=k.split('[');
                         this.add_active_filter(k,v);
                    }

                }
                else {

                    let k=params[1].split('=')[0];
                    let v=params[1].split('=')[1];
                    k=k.split('[');
                     this.add_active_filter(k,v);
                }
            }
        },
        setRangeSlider:function (price) {
            const app=this;
            var slider = document.querySelector('.price_range_slider');
            if (this.noUiSlider==null)
            {
                if (parseInt(price)>0)
                {
                    this.noUiSlider=noUiSlider.create(slider, {
                        start: [0, price],
                        connect:true,
                        direction:'rtl',
                        range: {
                            'min': 0,
                            'max': price
                        },
                        format:{
                            from:function (value) {
                                return parseInt(value);
                            },
                            to:function (value) {
                                return parseInt(value);
                            }

                        }
                    });

                }
            }

            if (slider.noUiSlider!=undefined)
            {
                slider.noUiSlider.on('update',function (values,handle) {
                    app.min_price=values[0];
                    app.max_price=values[1];
                    $("#min_price").text(app.number_format(values[0]));
                    $("#max_price").text(app.number_format(values[1]));
                });


                let search=new window.URLSearchParams(window.location.search);
                const min=parseInt(search.get('price[min]')) !=null ? parseInt(search.get('price[min]')) : 0;
                if (search.get('price[max]')!=null)
                {
                    this.noUiSlider.updateOptions({
                        start: [min, parseInt(search.get('price[max]'))],

                    })
                }

                if (search.get('price[min]')!=null && search.get('price[max]')==null)
                {
                    this.noUiSlider.updateOptions({
                        start: [parseInt(search.get('price[min]')),slider.noUiSlider.get()[1]],

                    })
                }
            }


        },


        setPageUrl:function (url) {
            window.history.pushState('data','title',url);
        },
        getDiscountValue:function (price1,price2) {
            let a=(price2/price1)*100;
            a=100-a;
            a=Math.round(a);
            return a;
        },
        set_filter_event:function (el,page_url) {
            let data=$(el).attr('data');
            data=data.split('_');
            if ($('.check_box',el).hasClass('active'))
            {
                $('.check_box',el).removeClass('active');
                this.remove_url_query_string(data[0],data[2],page_url);
                this.remove_filter_tag(data[0],data[2],page_url);
            }
            else {
                $('.check_box',el).addClass('active');
                this.add_url_query_string(data[0],data[2],page_url);
                this.add_filter_tag(data,data[0],data[2],page_url);
            }
        },
        remove_url_query_string:function (key,value,page_url) {
            let url=page_url==undefined ? window.location.href : page_url;
            let check=url.split(key);
            const params=url.split('?');
            let h=0;

            if (params[1]!=undefined)
            {
                if(params[1].indexOf('&')>-1){

                    let vars=params[1].split('&');
                    for (let i in vars)
                    {
                        let k=vars[i].split('=')[0];
                        let v=vars[i].split('=')[1];
                        let n=k.indexOf(key);
                        if (n>-1 && v!=value)
                        {
                            k=k.replace(key,'');
                            k=k.replace('[','');
                            k=k.replace(']','');
                            const new_string=key+"["+h+"]="+v;
                            const old_string=key+"["+k+"]="+v;
                            url=url.replace(old_string,new_string);
                            h++;
                        }
                        else if (n>-1)
                        {
                            url=url.replace('&'+k+"="+v,'');
                            url=url.replace('?'+k+"="+v,'');
                        }
                    }
                }
                else {
                    url=url.replace('?'+key+"[0]"+"="+value,'');

                }

            }

            const url_params=url.split('?');
            if (url_params[1]==undefined)
            {
                url=url.replace('&','?');
            }
            this.changed_url(url);
        },
        set_sort:function (value) {
            this.sort=value;
            this.add_url_param('sortby',value);
            this.getProduct(1);
        },
        get_request_url:function (url,page) {
            const url_param=url.split('?');
            if (url_param[1]==undefined)
            {
                url=url+"?page="+page;
            }
            else {
                url=url+"&page="+page;
            }
            return url;
        },
        set_product_sort:function () {
            let params=new window.URLSearchParams(window.location.search);
            let url=window.location.href;
            if (params.get("sortby")!=null){
                const sortby=parseInt(params.get("sortby"));
                if (sortby>=21 && sortby<=25)
                {
                    this.sort=sortby;
                }
            }
        },
        search_product:function (event,el) {
            if (event.keyCode==13)
            {
                const search_text=$(el).val();
                if (search_text.trim().length==0)
                {
                    if (this.search_string!="")
                    {
                        this.remove_url_params('string',this.search_string);
                        this.search_string='';
                        this.getProduct(1);
                    }

                }
                else {
                    if (search_text.trim().length>1)
                    {
                        this.search_string=search_text;
                        this.add_url_param('string',search_text);
                        this.getProduct(1);
                    }
                }
            }
        },
        remove_url_params:function (key,value,page_url) {
            let params=new window.URLSearchParams(window.location.search);
            let url=page_url==undefined ? window.location.href : page_url;

            if (params.get(key)!=null)
            {
                value=encodeURIComponent(value);
                url=url.replace('&'+key+"="+value,'');
                url=url.replace('?'+key+"="+value,'');
                this.remove_filter_tag(key,value);

                const url_params=url.split('?');
                if (url_params[1]==undefined)
                {
                    url=url.replace('&','?');
                }

                if (page_url==undefined)
                {
                    this.setPageUrl(url);
                    this.getProduct(1);
                }
                else {
                    this.search_url=url;
                }

            }
        },
        set_search_string:function () {
            let params=new window.URLSearchParams(window.location.search);
            let url=window.location.href;
            if (params.get('string')!=null)
            {
                this.search_string=params.get('string');
            }
        },


        remove_filter_item:function (el) {
            const key=$(el).attr('data-key');
            const value=$(el).attr('data-value');
            if (key && value)
            {
                this.remove_url_query_string(key,value);
                $(el).remove();

                const data=key+"_param_"+value;
                $('li[data="'+data+'"] .check_box').removeClass('active');

                if ($('#selected_filter_box div').length==0)
                {
                    $("#filter_div").hide();
                }
            }
            else if ($(el).hasClass('product_status_filter')) {
                this.remove_product_status(el);
            }
            else if ($(el).hasClass('send_status_filter')) {
                this.remove_send_status_filter(el);
            }

        },
        remove_product_status:function (el) {
            $(el).remove();
            this.remove_url_params('has_product','1');

            $('#product_status').unbind('click');
            $('#product_status').toggles({
                type: 'Light',
                text: {'on': 'موجود', 'off': 'ناموجود'},
                width: 85,
                direction: 'rtl',
                on: false
            });
        },
        remove_send_status_filter:function (el) {
            $(el).remove();
            this.remove_url_params('has_ready_to_shipment','1');

            $('#send_status').unbind('click');
            $('#send_status').toggles({
                type: 'Light',
                text: {'on': 'آماده ارسال', 'off': 'در حال آماده'},
                width: 85,
                direction: 'rtl',
                on: false
            });
        },
        set_enable_product_status_toggle:function () {
            if (!$("#selected_filter_box").find('div').hasClass('product_status_filter'))
            {
                $("#filter_div").show();
                const html= '<div class="selected_filter_item product_status_filter">'+
                    '<span>فقط کالاهای موجود</span> <i id="selected_filter_item_remove" class="fa fa-close"></i>'
                    +'</div>';
                $('#selected_filter_box').append(html);
            }
        },
        set_enable_status_toggle:function () {
            if (!$("#selected_filter_box").find('div').hasClass('send_status_filter'))
            {
                $("#filter_div").show();
                const html= '<div class="selected_filter_item send_status_filter">'+
                    '<span>کالاهای آماده ارسال</span> <i id="selected_filter_item_remove" class="fa fa-close"></i>'
                    +'</div>';
                $('#selected_filter_box').append(html);
            }

        },

        add_active_filter:function (k,v) {
            if (k.length>1)
            {
                let data="";
                let filter_key=k[0];
                if (k.length==3)
                {
                    data=k[0]+"["+k[1]+"_param_"+v;
                    data="'"+data+"'";
                    filter_key=k[0]+"["+k[1];
                }
                else {
                    data=k[0]+"_param_"+v;
                }
                $('li[data='+data+'] .check_box').addClass('active');
                $('li[data='+data+']').parent().parent().slideDown();
                if ($('li[data='+data+']').length==1)
                {
                    this.add_filter_tag(data,filter_key,v);
                }
            }
            else {

                if (k=="has_product")
                {
                    this.set_enable_product_status_toggle();
                }
                else if (k=="has_ready_to_shipment")
                {
                    this.set_enable_status_toggle();
                }
            }
        },
        remove_all_filter: function (page_url) {
            let url=page_url==undefined ? window.location.href : page_url;
            url = url.split('?')[0];
            $('.selected_filter_item').remove();
            $("#filter_div").hide();
            $('.filter_box .list-inline li').find('.check_box').removeClass('active');
            if ($('#product_status .toggle-slide .toggle-on').hasClass('active')) {
                $('#product_status').click();
            }
            if ($('#send_status .toggle-slide .toggle-on').hasClass('active')) {
                $('#send_status').click();
            }
            if (this.noUiSlider) {
                this.noUiSlider.reset();
            }
            if (page_url==undefined)
            {
                this.setPageUrl(url);
                this.getProduct(1);
            }
            else {
                this.search_url=url;
            }

        },
        gregorian_to_jalali:function (gy, gm, gd) {
            var g_d_m, jy, jm, jd, gy2, days;
            g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            gy2 = (gm > 2) ? (gy + 1) : gy;
            days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
            jy = -1595 + (33 * ~~(days / 12053));
            days %= 12053;
            jy += 4 * ~~(days / 1461);
            days %= 1461;
            if (days > 365) {
                jy += ~~((days - 1) / 365);
                days = (days - 1) % 365;
            }
            if (days < 186) {
                jm = 1 + ~~(days / 31);
                jd = 1 + (days % 31);
            } else {
                jm = 7 + ~~((days - 186) / 30);
                jd = 1 + ((days - 186) % 30);
            }
            return [jy, jm, jd];
        },
        show_mobile_box:function () {
            this.$nextTick(function () {
                $('body').css('overflow-y','hidden');
                const width=$(window).width();
                const right="-"+width+"px";
                $(".mobile_data_box").css({'right':right});
                setTimeout(function () {
                    $(".mobile_data_box").css('right','0');
                },50)
            });
        },




    }
}
