<template>
    <div>

        <div class="loading_box2" v-if="show_loading" style="right: 0!important;">
            <div class="load-10">
                <p>در حال بارگذاری...</p>
                <div class="bar"></div>
            </div>
        </div>

        <div class="alert alert-warning" v-if="error.length>0">
            <ul class="error_ul">
                <li v-for="(msg,key) in error" v-bind:key="key">
                    {{ msg }}
                </li>
            </ul>
        </div>

        <div style="padding-bottom: 20px">
            <div class="form-group" id="add_input_select">
                <label for="stockroom">انتخاب انبار :</label>
                <select v-model="stockroom_id" id="stockroom" class="selectpicker">
                    <option value="0">انتخاب انبار</option>
                    <option v-for="row in stockroom" v-bind:key="row.id" v-bind:value="row.id">{{ row.name }}</option>
                </select>
            </div>

            <div class="form-group textarea_field">
                <label for="stockroom"> توضیحات :</label>
                <textarea v-model="tozihat" class="form-control" placeholder=" توضیحات "></textarea>
            </div>


            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">افزودن
                محصول
            </button>

        </div>


        <p style="margin-top: 30px;margin-bottom: 20px">محصولات انتخاب شده</p>
        <table class="table table-striped">
            <thead>
            <tr>
                <th>ردیف</th>
                <th>تصویر محصول</th>
                <th>عنوان محصول</th>
                <th>فروشنده</th>
                <th>گارانتی</th>
                <th>رنگ</th>
                <th>تعداد</th>
                <th>عملیات</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,key) in selected_product" v-bind:key="key">
                <td style="width: 20px">{{ getRow(key) }}</td>
                <td>
                    <img v-bind:src="$siteUrl+'files/thumb/'+item.get_product_warranty.get_product.image_url" alt=""
                         class="product_pic stockroom_product">
                </td>
                <td>
                    <span>{{ item.get_product_warranty.get_product.title }}</span>

                </td>
                <td>
                    <span>{{ item.get_product_warranty.get_seller.brand_name }}</span>
                </td>
                <td style="font-size: 14px">
                    <span>{{ item.get_product_warranty.get_warranty.name }}</span>
                </td>
                <td style="width:150px">
                                    <span style="color: white" v-if="item.get_product_warranty.get_color.id>0" :style="{background:item.get_product_warranty.get_color.code}" class="color_td">
                                        <span style="color: white">{{ item.get_product_warranty.get_color.name }}</span>
                                    </span>
                </td>
                <td style="width:70px">
                    <input type="text" v-model="selected_product[key].product_number" placeholder="تعداد" class="form-control" style="width: 70px;text-align: center">
                </td>
                <td style="width:100px">
                    <!--                    <span v-if="checkInList(item.id)" style="color: #ef5661">اضافه شد</span>-->
                    <span class="remove_item" v-on:click="removeOfList(key)">حذف</span>
                </td>
            </tr>

            <tr v-if="selected_product.length==0">
                <td colspan="8">  محصولی انتخاب نشده </td>
            </tr>

            </tbody>
        </table>

        <button class="btn btn-success" v-on:click="send_data()">
            ثبت نهایی
        </button>


        <div class="modal fade bd-example-modal-lg product_list" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true" >
            <div class="modal-dialog modal-lg" >
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">لیست محصولات</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="loading_box2" v-if="get_data">
                        <div class="load-4">
                            <p>در حال بارگذاری...</p>
                            <div class="ring-1"></div>
                        </div>
                    </div>

                    <div class="modal-body">



                        <div class="box_header">
                            <div class="input_div">
                                <input type="text" class="form-control" v-model="search_text" placeholder="نام محصول ..."><a class="btn btn-primary" v-on:click="getList(1)" style="color:white;">جستجو</a>
                            </div>
                        </div>
                        <table class="table table-striped">
                            <tbody>
                            <tr v-for="(item,key) in ProductList.data" v-bind:key="key">
                                <td>{{ getRow(key) }}</td>
                                <td>
                                    <img v-bind:src="$siteUrl+'files/thumb/'+item.get_product_warranty.get_product.image_url" alt=""
                                         class="product_pic stockroom_product_pic">
                                </td>
                                <td>
                                    <span>{{ item.get_product_warranty.get_product.title }}</span>

                                </td>
                                <td>
                                    <span>{{ item.get_product_warranty.get_seller.brand_name }}</span>
                                </td>
                                <td style="font-size: 14px">
                                    <span>{{ item.get_product_warranty.get_warranty.name }}</span>
                                </td>
                                <td style="width:150px">
                                    <span style="color: white" v-if="item.get_product_warranty.get_color.id>0" :style="{background:item.get_product_warranty.get_color.code}" class="color_td">
                                        <span style="color: white">{{ item.get_product_warranty.get_color.name }}</span>
                                    </span>
                                </td>
                                <td style="width:70px">
                                    <input type="text" v-model="product_count[key]" placeholder="تعداد" class="form-control" style="width: 70px;text-align: center">
                                </td>
                                <td style="width:70px">
                                    <span v-if="checkInList(item.id)" style="color: #ef5661">اضافه شد</span>
                                    <span v-else class="select_item" v-on:click="add_product(item.get_product_warranty.id,key)">افزودن</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <pagination :data="ProductList" v-bind:showDisabled="true" icon="chevron" v-on:change-page="getList"></pagination>

                    </div>
                </div>
            </div>
        </div>


        <div class="message_div" v-if="show_message_box" style="display: block">
            <div class="message_box">
                <p id="msg">{{ msg }}</p>
                <a class="alert alert-success" v-on:click="add_product_to_stockroom()">بلی</a>
                <a class="alert alert-danger" v-on:click="show_message_box=false">خیر</a>
            </div>
        </div>

    </div>
</template>

<script>
import myMixin from "../myMixin";

export default {
    name: "StockroomOutputList",
    props: ['stockroom'],
    mixins: [myMixin],
    data() {
        return {
            stockroom_id: 0,
            tozihat: '',
            ProductList: {data: []},
            page: 1,
            product_count:[],
            selected_product:[],
            show_message_box:false,
            select_id:0,
            select_key:0,
            msg:'آیا از خروج این محصول از انبار مطمئن هستید؟',
            get_data:false,
            search_text:'',
            error:[],
            show_loading:false
        }
    },
    mounted() {
    },
    methods: {
        getList: function (page = 1) {
            this.page = page;
            this.get_data=true;
            const url = this.$siteUrl + "/admin/stockroom/getInventory?page=" + page+'&search_text='+this.search_text+"&stockroom_id="+this.stockroom_id;
            this.axios.get(url).then(response => {
                for (let i=0;i<response.data.data.length;i++)
                {
                    this.product_count[i]=response.data.data[i].product_count;
                }
                this.ProductList = response.data;
                this.get_data=false;
            }).catch(error=>{
                this.get_data=false;
            });
        },
        getRow: function (key) {
            ++key;
            let k = (this.page - 1) * 5;
            k += key;
            return this.replaceNumber(k);
        },
        checkInList:function (id) {
            let result=false;
            this.selected_product.forEach(function (row) {
                if (row.id==id)
                {
                    result=true;
                }
            });
            return result;
        },
        add_product:function (id,key) {
            this.show_message_box=true;
            this.select_id=id;
            this.select_key=key;
        },
        add_product_to_stockroom:function () {
            this.show_message_box=false;
            const n=this.product_count[this.select_key];
            const maxCount=this.ProductList.data[this.select_key].product_count;
            if (parseInt(n)>0)
            {
                const count= n<=maxCount ? n : maxCount;
                let item=this.ProductList.data[this.select_key];
                item.product_number=count;
                this.selected_product.push(item);
            }
        },
        removeOfList:function (key) {
            this.$delete(this.selected_product,key);
        },
        send_data:function () {
            this.error=[];
            let send=true;
            if (this.stockroom_id==0)
            {
                send=false;
                this.error.push('لطفا انبار را انتخاب کنید');
            }
            if (this.selected_product.length==0)
            {
                send=false;
                this.error.push('محصولاتی را که باید به انبار ارسال شود را انتخاب نمایید');
            }

            if (send)
            {
                this.show_loading=true;
                let string='';
                this.selected_product.forEach(function (row) {
                    string=string+"@"+row.get_product_warranty.id+"_"+row.product_number;
                });
                const url=this.$siteUrl+"/admin/stockroom/add_product";
                const formData=new FormData();
                formData.append('list',string);
                formData.append('stockroom_id',this.stockroom_id);
                formData.append('tozihat',this.tozihat);
                formData.append('type',"output");
                this.axios.post(url,formData).then(response=>{
                    this.show_loading=false;
                    if (response.data=='ok')
                    {
                        window.location=this.$siteUrl+"admin/stockroom/output";
                    }
                    else {
                        $("#server_error_box").show();
                        setTimeout(function () {
                            $("#server_error_box").hide();
                        },5000);
                    }
                }).catch(error=>{
                    this.show_loading=false;
                    $("#server_error_box").show();
                    setTimeout(function () {
                        $("#server_error_box").hide();
                    },5000);
                });

            }
        }
    },
    watch:{
        stockroom_id:function () {
            this.getList();
        }
    }
}
</script>

<style scoped>

</style>
