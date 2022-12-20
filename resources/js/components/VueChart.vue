<template>


    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="vue_chart">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                   <div style="width: 97%;margin: 40px auto">
                       <highcharts :options="chartOptions"></highcharts>
                   </div>

                   <div class="chart_color_div">
                       <ul class="color_ul">
                           <li v-for="(color,key) in colors" v-bind:class="[color_key==key ? 'color_li active' : 'color_li']">
                               <label v-on:click="change_series(key)">
                                   <span class="ui-variant-shape" v-bind:style="{background:color.code}"></span>
                                   <span class="color_name">{{ color.name }}</span>
                               </label>
                           </li>
                       </ul>
                   </div>


            </div>
        </div>
    </div>


</template>

<script>
import {Chart} from 'highcharts-vue'

export default {
    name: "VueChart",
    data(){
      return{
          chartOptions: {
              series: [],
              title:{
                text:'نمودار تغییرات قیمت',
                update:true
              },
              xAxis:{
                  categories:[]
              },
              chart:{
                  height:400,
                  type:'line',
                  style:{
                      fontFamily:'IRANSans'
                  }
              },
              yAxis:{
                  title:{
                      text:''
                  },
                  labels:{
                      useHTML:true,
                      formatter:function () {
                        let value=replaceNumber(number_format(this.value));
                        return '<div style="direction: rtl"><span>'+value+'</span><span style="padding-right: 2px">تومان</span></div>'
                      },
                      style:{
                          fontsize:'13px'
                      }
                  }
              },
              tooltip:{
                  backgroundColor:'#fff',
                  bordercolor: '#c8c8c8',
                  borderRadius:10,
                  borderWidth:1,
                  useHTML: true,
                  formatter:function () {
                      if (this.point.has_product=='ok')
                      {
                          return '<div>'+
                              '<ul class="chart_ul">'+
                              '<li style="justify-content: end;margin-top: 10px">'+
                              '<span style="padding-right: 4px">'+this.point.seller+'</span>   : <span> فروشنده</span>'+
                              '</li>'+
                              '<li style="justify-content: space-between;margin-top: 15px">'+
                              '<div style="color: #00bfd6;font-size: 19px;direction: rtl"><span>'+replaceNumber(number_format(this.point.price))+'</span><span>تومان</span></div>'+
                              '<div style="margin-top: 3px">کمترین قیمت</div>'+
                              '</li>'+
                              '</ul>'+
                              '</div>';
                      }
                      else {
                          return '<div>'+
                              '<ul class="chart_ul">'+
                              '<li style="justify-content: space-between;margin-top: 15px">'+
                              '<div style="color: #00bfd6;font-size: 19px;direction: rtl"><span>ناموجود</span></div>'+
                              '<div style="margin-top: 3px">کمترین قیمت</div>'+
                              '</li>'+
                              '</ul>'+
                              '</div>';
                      }
                  }
              }
          },
          colors:[],
          color_key:0
      }
    },
    components: {
        highcharts: Chart
    },
    props:['product_id'],
    mounted() {
        const app=this;
        $(document).on('click','#line-chart',function () {
           app.getData();
        });
    },methods:{
        getData()
        {
            if (this.chartOptions.series.length==0)
            {
                $("#loading").show();
                const app=this;
                const url=this.$siteUrl+'/site/getProductChartData/'+this.product_id;
                this.axios.get(url).then(response=>{
                    this.chartOptions['xAxis']['categories']=response.data.points;
                    this.colors=response.data.color;

                    let i=0;


                    response.data.price.forEach(function (item) {
                        var name=response.data.color[i].name;
                        const zonesRow=response.data.zone[response.data.color[i].id];
                        app.chartOptions['series'].push({'data':item,'name':name,
                            'color':'#00bfd6',marker:{symbol:'circle'},zones:zonesRow,zoneAxis:'x'});
                        if (i>0)
                        {
                            app.chartOptions['series'][i].visible=false;
                        }
                        else {
                            app.chartOptions['series'][i].visible=true;
                        }
                        i++;
                    });
                    $("#loading").hide();
                    $("#vue_chart").modal('show');

                }).catch(error=>{
                    $("#loading").hide();
                });

            }
            else {
                $("#vue_chart").modal('show');
            }

        },
        change_series:function (key)
        {
            this.color_key=key;
            this.chartOptions['title']['update']=! this.chartOptions['title']['update'];
            this.chartOptions['series'].forEach(function (item) {
                item.visible=false;
            });
            this.chartOptions['series'][key].visible=true;
        }
    }
}
</script>

<style scoped>

</style>
