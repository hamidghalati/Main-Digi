<template>
    <div  v-if="show_second>0">
        <div class="c-counter">
            <span>{{h}}</span>:<span>{{m}}</span>:<span>{{s}}</span>
        </div>
        <p class="discount_counter_title">زمان باقی مانده تا پایان سفارش</p>
    </div>



</template>

<script>
import myMixin from "../myMixin";
export default {
    name: "Counter",
    mixins:[myMixin],
    data(){
        return{
            h: '',
            m: '',
            s: '',
            show_second:0

        }
    },
    props:['second'],
    mounted() {
        this.show_second=this.second;
        this.counter();
        setInterval(this.counter,1000);
    },
    methods:{
        counter:function () {
            let second=this.show_second;
            let h=Math.floor(second/3600);
            second=second-h*3600;
            let m=Math.floor(second/60);
            let s=second-m*60;
            if (h.toString().length==1)
            {
                h="0"+h;
            }
            if (m.toString().length==1)
            {
                m="0"+m;
            }
            if (s.toString().length==1)
            {
                s="0"+s;
            }
            this.h=this.replaceNumber(h);
            this.m=this.replaceNumber(m);
            this.s=this.replaceNumber(s);
            this.show_second=this.show_second-1;

        },

    }
}
</script>

<style scoped>

</style>
