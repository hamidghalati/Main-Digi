<template>
    <div>
        <p>
            <span>میزان فروش در سال</span>
            <select  v-model="default_year" v-on:change="getData()" ref="default_year" class="selectpicker auto-width-select years_tag">
                <option v-bind:value="year" v-for="(year,key) in years" v-bind:key="key">{{ year }}</option>
            </select>
        </p>
        <highcharts :options="chartOptions"></highcharts>
        <div style="padding-top: 60px">
            <highcharts :options="chartOptions2"></highcharts>
        </div>
    </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

export default {
    name: "SaleReport",
    props:['product_id'],
    data() {
        return {
            default_year: '',
            years:[],
            chartOptions: {
                series: [{
                    data: [],
                    color: 'rgba(244,81,108)',
                    dataLabels: {
                        enabled: true,
                        color: "#FFFFFF",
                        formatter: function () {
                            return number_format(this.y);
                        },
                        rotation: -90,
                        style: {
                            fontSize: '16px'
                        },
                        y: 10,
                        align: 'right'
                    },
                    name: 'آمار فروش'
                }],
                title: {
                    text: 'نمودار آمار فروش',
                    update: true
                },

                xAxis: {
                    type: 'category'
                },
                chart: {
                    type: 'column',
                    style: {
                        fontFamily: 'IRANSans'
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        useHTML: true,
                        formatter: function () {
                            let values = this.value;

                            if (values > 1000) {
                                values = new Intl.NumberFormat().format(values);
                            }
                            return '<div style="direction: rtl">' +
                                '<span>' + values + '  تومان  ' + '</span>'
                                + '</div>';
                        },
                        style: {
                            fontsize: '15px'
                        }
                    }
                },
                tooltip: {
                    useHTML: true,
                    formatter: function () {
                        return '<div style="width: 210px;text-align: right;font-size: 16px;">' +
                            '<p><span> میزان فروش در </span>' + getMonthName(this.x) + '   ماه' + '</p>' +
                            '<div style="color: rgba(244,81,108);direction: rtl;text-align: left"><span>' + number_format(this.y) + '</span><span>  تومان</span></div>'

                            + '</div>'
                    },
                }

            },
            chartOptions2: {
                series: [{
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: "#FFFFFF",
                        formatter: function () {
                            return number_format(this.y);
                        },
                        rotation: -90,
                        style: {
                            fontSize: '16px'
                        },
                        y: 10,
                        align: 'right'
                    },
                    name: 'کمیسیون'
                }],
                title: {
                    text: ' کمیسیون دریافت شده از فروش محصول',
                    update: true
                },

                xAxis: {
                    type: 'category'
                },
                chart: {
                    type: 'column',
                    style: {
                        fontFamily: 'IRANSans'
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        useHTML: true,
                        formatter: function () {
                            let values = this.value;

                            if (values > 1000) {
                                values = new Intl.NumberFormat().format(values);
                            }
                            return '<div style="direction: rtl">' +
                                '<span>' + values + '  تومان  ' + '</span>'
                                + '</div>';
                        },
                        style: {
                            fontsize: '15px'
                        }
                    }
                },
                tooltip: {
                    useHTML: true,
                    formatter: function () {
                        return '<div style="width: 260px;text-align: right;font-size: 13px;">' +
                            '<p><span> میزان کمیسیون دریافت شده در </span>' + getMonthName(this.x) + '   ماه' + '</p>' +
                            '<div style="color: rgba(244,81,108);direction: rtl;text-align: left"><span>' + number_format(this.y) + '</span><span>  تومان</span></div>'

                            + '</div>'
                    },
                }

            },
            month: [
                'فروردین',
                'اردیبهشت',
                'خرداد',
                'تیر',
                'مرداد',
                'شهریور',
                'مهر',
                'آبان',
                'آذر',
                'دی',
                'بهمن',
                'اسفند'
            ],
            url:''
        }
    },
    components: {
        highcharts: Chart
    },
    mounted() {



       if (this.product_id==undefined)
       {
           this.url=this.$siteUrl + '/admin/shop/get_sale_report?default_year=' + this.default_year;
       }
       else {
           this.url=this.$siteUrl + '/admin/product/get_sale_report?default_year=' + this.default_year+'&product_id='+this.product_id;
       }


        this.getData();
    },
    methods: {
        getData: function () {
            $("#loading").show();
            const app = this;
            this.axios.get(this.url).then(response => {
                $("#loading").hide();
                this.chartOptions['series'][0]['data'] = [];
                const sale = response.data.sale;
                if (sale != undefined) {
                    sale.forEach(function (row, key) {
                        if (key != 0) {
                            app.chartOptions['series'][0]['data'].push([app.getMonthName(key), row]);
                        }
                    });
                }

                const commission = response.data.commission;
                if (commission != undefined) {
                    commission.forEach(function (row, key) {
                        if (key != 0) {
                            app.chartOptions2['series'][0]['data'].push([app.getMonthName(key), row]);
                        }
                    });
                }

                this.years=response.data.year_list;
                this.default_year=response.data.default_year;

                this.$nextTick(function () {
                   $(this.$refs.default_year).selectpicker('refresh');
                });


            }).catch(error=>{
                $("#loading").hide();
            });

        },
        getMonthName: function (key) {
            key = key - 1;
            if (this.month[key] != undefined) {
                return this.month[key];
            } else {
                return '';
            }
        }
    }
}
</script>

<style scoped>

</style>
