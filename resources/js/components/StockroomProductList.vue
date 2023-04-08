<template>
    <div>
        <div style="padding-bottom: 20px">
            <div class="form-group">
                <label for="stockroom">انتخاب انبار :</label>
                <select v-model="stockroom_id" id="stockroom" class="selectpicker">
                    <option value="0">انتخاب انبار</option>
                    <option v-for="row in stockroom" v-bind:key="row.id">{{ row.name }}</option>
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

        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">لیست محصولات</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <tbody>
                            <tr v-for="(item,key) in ProductList.data" v-bind:key="key">
                                <td>{{ getRow(key) }}</td>
                                <td>
                                    <img v-bind:src="$siteUrl+'files/thumb/'+item.get_product.image_url" alt="" class="product_pic stockroom_product">
                                </td>
                                <td>
                                    <span>{{ item.get_product.title }}</span>
                                </td>
                                <td>
                                    <span>{{ item.get_seller.brand_name }}</span>
                                </td>
                                <td style="font-size: 14px">
                                    <span>{{ item.get_warranty.name }}</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import myMixin from "../myMixin";

export default {
    name: "StockroomProductList",
    props: ['stockroom'],
    mixins: [myMixin],
    data() {
        return {
            stockroom_id: 0,
            tozihat: '',
            ProductList: {data: []},
            page:1
        }
    },
    mounted() {
        this.getProductWarranty();
    },
    methods: {
        getProductWarranty: function (page = 1) {
            this.page=page;
            const url = this.$siteUrl + "/admin/stockroom/getProductWarranty?page=" + page;
            this.axios.get(url).then(response => {
                this.ProductList = response.data;
            });
        },
        getRow:function (key) {
            ++key;
            let k=(this.page-1)*5;
            k+=key;
            return this.replaceNumber(k);
        }
    }
}
</script>

<style scoped>

</style>
