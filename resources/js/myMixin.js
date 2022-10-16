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
        }

    }
}
