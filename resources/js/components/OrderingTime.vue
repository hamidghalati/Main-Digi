<template>
    <div>
{{city_id}}
    </div>

</template>

<script>
export default {
    name: "OrderingTime",
    props:['city_id'],
    data(){
        return {
            OrderingData:[],
            multi_type_send:false,
            normal_send:true,
            fast_send:false
        }
    },
    mounted() {
        this.get_ordering_time();
    },
    methods:{
        get_ordering_time:function () {
            const url=this.$siteUrl+"/shipping/getSendData/"+this.city_id
            this.axios.get(url).then(response=>{
               this.OrderingData=response.data;
               alert(this.OrderingData.delivery_order_interval.length);
               if (this.OrderingData.delivery_order_interval.length>1)
               {
                   this.multi_type_send=true;
               }
            });
        }
    }
}
</script>

<style scoped>

</style>
