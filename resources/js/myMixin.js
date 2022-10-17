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
        setFilterPrice:function () {
            this.add_url_param('price[min]',this.min_price);
            this.add_url_param('price[max]',this.max_price);
            this.getProduct(1);
        },
        add_url_param:function (key,value) {
            let params=new window.URLSearchParams(window.location.search);
            let url=window.location.href;
            if (params.get(key)!=null)
            {
                let old_param=key+"="+params.get(key);
                let new_param=key+"="+value;
                url=url.replace(old_param,new_param);

            }
            else {
                const url_params=url.split('?');
                if (url_params[1]==undefined)
                {
                    url+="?"+key+"="+value;
                }
                else {
                    url+="&"+key+"="+value;
                }
            }
            this.setPageUrl(url);
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
        set_filter_event:function (el) {
            let data=$(el).attr('data');
            data=data.split('_');
            if ($('.check_box',el).hasClass('active'))
            {
                $('.check_box',el).removeClass('active');
                this.remove_url_query_string(data[0],data[2]);
            }
            else {
                $('.check_box',el).addClass('active');
                this.add_url_query_string(data[0],data[2]);
            }
        },
        add_url_query_string:function (key,value) {
            let url=window.location.href;
            let check=url.split(key);
            const n=check.length-1;
            const url_params=url.split('?');
            if (url_params[1]==undefined)
            {
                url=url+"?"+key+"["+n+"]="+value;
            }
            else {
                url=url+"&"+key+"["+n+"]="+value;
            }

            this.setPageUrl(url);
            this.getProduct(1);

        },
        remove_url_query_string:function (key,value) {
            let url=window.location.href;
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

            this.setPageUrl(url);
            this.getProduct(1);
        }

    }
}
