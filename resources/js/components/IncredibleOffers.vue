<template>
    <div>
        <table class="table table-bordered">
            <thead class="table-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">تصویر</th>
                <th scope="col">عنوان محصول</th>
                <th scope="col">فروشنده</th>
                <th scope="col">گارانتی</th>
                <th scope="col">رنگ</th>
                <th scope="col">عملیات</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,key) in WarrantyList.data">
                <th scope="row" style="vertical-align: middle;">{{getRow(key)}}</th>
                <td><img v-bind:src="$siteUrl+'files/thumb/'+item.get_product.image_url" alt="" class="product_pic"></td>
                <td>{{item.get_product.title}}</td>
                <td></td>
                <td>{{item.get_warranty.name}}</td>
                <td>
                    <span v-if="item.get_color.id>0" v-bind:style="[item.get_color.id>0 ? {background:item.get_color.code} : {}]" class="color_td">
                        <span v-if="item.get_color.id>0"  v-bind:style="[item.get_color.name=='سفید' ? {color:'black'} : {color: 'white'}]">
                    {{item.get_color.name}}
                </span>
                    </span>
                </td>

                <td>
                    <p class="select_item" v-on:click="show_box(item.id,key)">انتخاب</p>
                    <p class="remove_item" v-if="item.offers==1" v-on:click="remove_offers(item.id,key)">حذف</p>
                </td>
            </tr>


            </tbody>
        </table>
<!--             <pagination :data="WarrantyList" @pagination-change-page="getWarrantyList"></pagination>-->
                <pagination align="center" :data="WarrantyList" @pagination-change-page="getWarrantyList"></pagination>
<!--                <pagination :data="WarrantyList">-->
<!--                    <span slot="prev-nav">&lt; Previous</span>-->
<!--                    <span slot="next-nav">Next &gt;</span>-->
<!--                </pagination>-->


        <div class="modal fade" id="priceBox" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5>افزودن به لیست پیشنهاد شگفت انگیز</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="modal-body IncredibleOffers">
                        <div class="form-group">
                            <label for="">هزینه محصول :</label>
                            <cleave :options="options" v-model="formInput.price1" class="form-control left"></cleave>
                        </div>

                        <div class="form-group">
                            <label for="">هزینه محصول (برای فروش) :</label>
                            <cleave :options="options" v-model="formInput.price2" class="form-control left"></cleave>
                        </div>

                        <div class="form-group">
                            <label for="">تعداد موجودی (برای فروش) :</label>
                            <cleave :options="options" v-model="formInput.product_number" class="form-control left"></cleave>
                        </div>

                        <div class="form-group">
                            <label for="">تعداد قابل سفارش در سبد خرید :</label>
                            <cleave :options="options" v-model="formInput.product_number_cart" class="form-control left"></cleave>
                        </div>

                        <div class="form-group">
                            <label for="">تاریخ شروع :</label>
                            <input type="text" v-model="date1" id="pcal1" class="form-control pdate">
                        </div>

                        <div class="form-group">
                            <label for="">تاریخ پایان :</label>
                            <input type="text" v-model="date2" id="pcal2" class="form-control pdate">
                        </div>




                    </div>


                    <div class="modal-footer">
                        <div class="d-grid gap-2 col-6 mx-auto " style="text-align: center!important;">
                            <button type="submit" class="btn btn-warning " v-on:click="add()">     ثبت اطلاعات     <i class="fa fa-check"></i></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>

</template>

<script>
import axios from 'axios';
export default {
    name: "IncredibleOffers",

    data(){
        return{
            WarrantyList: {data:[]},
            page:1,
            formInput:{
                price1:'',
                price2:'',
                product_number:'',
                product_number_cart:'',
            },
            options:{
                numeral:true,
            },
            date1:'',
            date2:'',
            select_key:-1,
            warranty_id:-1,
            send_form:true
        }
    },
    mounted() {
        this.getWarrantyList(1);
    },
    methods:{
        getWarrantyList:function (page) {
            this.page=page;
            const url=this.$siteUrl+'/admin/ajax/getWarranty?page='+page;
            this.axios.get(url).then(response=>{
                this.WarrantyList=response.data;
            });
        },
        getRow:function (index) {
            ++index;
            let k=(this.page-1)*10;
            k=k+index;
            return this.replaceNumber(k);
        },
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
        show_box:function (item_id,key) {
            if (this.send_form==true)
            {
                this.warranty_id=item_id;
                this.select_key=key;
                this.formInput.price1=this.WarrantyList.data[key].price1;
                this.formInput.price2=this.WarrantyList.data[key].price2;
                this.formInput.product_number=this.WarrantyList.data[key].product_number;
                this.formInput.product_number_cart=this.WarrantyList.data[key].product_number_cart;
                this.date1=this.WarrantyList.data[this.select_key].offers_first_date;
                this.date2=this.WarrantyList.data[this.select_key].offers_last_date;
                $("#priceBox").modal('show');
            }

        },
        add:function (){
            this.date1=$("#pcal1").val();
            this.date2=$("#pcal2").val();
            this.send_form=false;

            const formData=new FormData();
            formData.append('price1',this.formInput.price1);
            formData.append('price2',this.formInput.price2);
            formData.append('product_number',this.formInput.product_number);
            formData.append('product_number_cart',this.formInput.product_number_cart);
            formData.append('date1',this.date1);
            formData.append('date2',this.date2);

             const url=this.$siteUrl+"/admin/add_incredible_offers/"+this.warranty_id;
            this.axios.post(url,formData).then(response=>{
                if(response.data=='ok')
                {
                    this.send_form=true;
                    $("#priceBox").modal('hide');
                    this.WarrantyList.data[this.select_key].offers=1;
                    this.WarrantyList.data[this.select_key].price1=this.formInput.price1;
                    this.WarrantyList.data[this.select_key].price2=this.formInput.price2;
                    this.WarrantyList.data[this.select_key].product_number=this.formInput.product_number;
                    this.WarrantyList.data[this.select_key].product_number_cart=this.formInput.product_number_cart;
                    this.WarrantyList.data[this.select_key].offers_first_date=this.date1;
                    this.WarrantyList.data[this.select_key].offers_last_date=this.date2;
                }
            });


        }




    }

}
</script>

<style scoped>

</style>
