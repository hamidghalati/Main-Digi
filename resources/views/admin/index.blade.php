@extends('layouts.admin.admin')


@section('content')

    <div>
        <div class="row" style="margin-bottom: 40px">
            <div class="panel">
                <div class="header">
                    نمودار میزان فروش این ماه فروشگاه
                </div>

                <div class="panel_content">
                    <div id="container" style="width: 100%;height: 400px;margin: 0 auto"></div>
                </div>

            </div>
        </div>
    </div>

@endsection

@section('footer')
    @php
        $price='';
        $date='';
        $count='';
        foreach ($indexChartData['date_list'] as $key=>$value)
            {
                if (array_key_exists($value,$indexChartData['price_array']))
                {
                    $p=$indexChartData['price_array'][$value];
                    $c=$indexChartData['count_array'][$value];
                    $price.="$p,";
                    $count.="$c,";
                }
                else{
                    $price.="0,";
                    $count.="0,";
                }

                $value=replace_number($value);
                $date.="'$value',";


            }
    @endphp

    <script type="text/javascript" src="{{ url("js/highcharts.js") }}"></script>
    <script>
        Highcharts.chart('container', {

            title: {
                text: 'میزان فروش <?= $indexChartData['month']?> ',
                align: 'center'
            },
            chart:{
              type:'line',
              style:{
                  fontFamily:'iransans'
              }
            },

            subtitle: {
                text: '',
                align: 'left'
            },

            yAxis: {
                title: {
                    text: ''
                },
                labels:{
                    formatter:function(){
                        let values=parseInt(this.value);

                        if(values>1000)
                        {
                            values=new Intl.NumberFormat().format(values);
                        }
                        return '<div>'+
                            '<span>'+values+'</span>'
                            +'</div>';
                    },
                    style:{
                        fontsize:'15px'
                    }
                }
            },

            xAxis: {
                categories: [<?= $date ?>]
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },


            series: [{
                name: 'میزان فروش',
                data: [<?= $price ?>],
                color:'red'
            }, {
                name: 'تعداد تراکنش',
                data: [<?= $count ?>],
                marker:{
                    symbol:'circle'
                }
            }],

            tooltip:{
                useHTML:true,
              formatter:function () {
                  if (this.series.name=='میزان فروش')
                  {
                      return this.x+'<br>'+'<div style="padding-top: 5px;padding-bottom: 5px">'+this.series.name+' : '+number_format(this.y)+' تومان '+'</div>';
                  }
                  else {
                      return this.x+'<br>'+'<div style="padding-top: 5px;padding-bottom: 5px">'+this.series.name+' : '+number_format(this.y)+' بار '+'</div>';
                  }
              },
                style:{
                    fontsize:'15px'
                }

            },


            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });



    </script>
@endsection







