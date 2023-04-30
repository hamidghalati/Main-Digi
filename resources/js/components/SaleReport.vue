<template>
    <p>sale-report</p>
</template>

<script>
export default {
    name: "SaleReport",
    data(){
      return{
          default_year:''
      }
    },
    mounted() {
        this.getData();
    },
    methods:{
        getData:function () {
            const url=this.$siteUrl+'/admin/shop/get_sale_report?default_year='+this.default_year;

        }
    }
}
</script>

<style scoped>

</style>
