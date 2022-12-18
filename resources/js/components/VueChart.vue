<template>


    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="vue_chart">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                vue chart
            </div>
        </div>
    </div>


</template>

<script>
export default {
    name: "VueChart",
    data(){
      return{
          get_data:'no'
      }
    },
    mounted() {
        const app=this;
        $(document).on('click','#line-chart',function () {
           app.getData();
        });
    },methods:{
        getData()
        {
            if (this.get_data=='no')
            {
                $("#vue_chart").modal('show');
            }

        }
    }
}
</script>

<style scoped>

</style>
