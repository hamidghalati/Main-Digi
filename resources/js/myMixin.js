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
    }
}
