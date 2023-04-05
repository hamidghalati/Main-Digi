<template>
    <div class="favorite_list">
        <div v-for="item in FavoriteLists.data" v-bind:key="item.id" class="row">
            <div class="col-3">
                <i class="mdi mdi-trash-can-outline" v-on:click="remove_of_list( item.get_product.id)"></i>
                <img v-bind:src="$siteUrl+'files/thumb/'+item.get_product.image_url" alt="">
            </div>
            <div class="col-9">
                <div>
                    <a v-bind:href="$siteUrl+'/product/dkp-'+ item.get_product.id+'/'+ item.get_product.product_url">
                        {{ item.get_product.title }}
                    </a>
                </div>
                <div>
                    <div class="score">
                        <div class="gray">
                            <div class="red" :style="{width:getScoreValue(item.get_product)+'%'}"></div>
                        </div>
                    </div>
                </div>

                <div>
                        <span class="product_price" v-if="item.get_product.status==1">
                            {{ replaceNumber(number_format(item.get_product.price)) }} تومان
                        </span>
                    <span v-else class="product_price"></span>
                    <a class="btn btn-primary"
                       v-bind:href="$siteUrl+'/product/dkp-'+ item.get_product.id+'/'+ item.get_product.product_url">
                        مشاهده محصول
                    </a>
                </div>


            </div>
        </div>

        <pagination align="center" :data="FavoriteLists" @pagination-change-page="getList"></pagination>


        <div class="message_div" v-if="show_dialog_box">
            <div class="message_box" style="width: 428px!important;">
                <p id="msg">آیا مطمئنید که این محصول از لیست مورد علاقه شما حذف گردد؟</p>
                <a  class="alert alert-success" v-on:click="approve">بلی</a>
                <a  class="alert alert-danger" v-on:click="show_dialog_box=false;select_product=null;">خیر</a>
            </div>
        </div>

    </div>
</template>

<script>
import myMixin from "../myMixin";

export default {
    name: "FavoriteList",
    mixins: [myMixin],
    data() {
        return {
            FavoriteLists: {data: []},
            remove_id:0,
            show_dialog_box:false
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList: function (page=1) {

            $("#loading").show();
            const url=this.$siteUrl + "user/getFavoriteList?page="+page;
            this.axios.get(url).then(response => {
                $("#loading").hide();
                this.FavoriteLists = response.data;

            }).catch(error => {
                $("#loading").hide();
            });
        },
        getScoreValue: function (product) {
            let width = 0;
            if (product.score_count > 0) {
                width = product.score / (product.score_count * 6);
            }
            width *= 20;
            return width;
        },
        remove_of_list:function (id) {
            this.remove_id=id;
            this.show_dialog_box=true;
        },
        approve:function () {
            $("#loading").show();
            this.show_dialog_box=false;
            const url=this.$siteUrl + "user/favorite/removeProductOfList";
            const formData=new FormData();
            formData.append('product_id',this.remove_id);
            this.axios.post(url,formData).then(response => {
                $("#loading").hide();
                this.FavoriteLists = response.data;

            }).catch(error => {
                $("#loading").hide();
            });
        }
    }
}
</script>

<style scoped>

</style>
