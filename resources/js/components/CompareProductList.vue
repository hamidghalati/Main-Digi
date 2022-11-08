<template>


    <div class="modal fade " id="product_list" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" style="padding-right: 40px!important;height: 45px!important;font-size: 15px!important; text-align: right!important;" v-model="search_text" placeholder="نام کالای مورد نظر خود را وارد کنید">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-secondary" type="button" data-toggle="dropdown">
                                <span>{{brand_text}}</span>
                                <span class="fa fa-angle-down"></span>
                            </button>

                            <div class="dropdown-menu">
                                <a class="dropdown-item" v-on:click="getBrandProduct(0,'تمام برندها')">تمام برندها</a>
                                <a v-for="row in this.brandList" class="dropdown-item" v-on:click="getBrandProduct(row.brand_id,row.get_brand.brand_name)">
                                    <span>{{row.get_brand.brand_name}}</span>
                                </a>
                            </div>

                        </div>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                 <div style="display:flex;flex-wrap: wrap" >
                     <div v-for="product in productList.data" class="select_product_for_compare" v-bind:data-id="product.id" v-on:click="add_compare_list(product.id)">
                         <img v-bind:src="$siteUrl+'files/thumb/'+product.image_url" alt="" v-if="product.image_url!=null">
                         <p>{{product.title}}</p>
                     </div>
                 </div>


                    <pagination align="center" :data="productList" @pagination-change-page="getProduct"></pagination>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "CompareProductList",
    data(){
        return{
            productList:{data:[]},
            brand_id:0,
            search_text:'',
            brandList:[],
            product_fail_request_count:0,
            brand_fail_request_count:0,
            brand_text:'تمام برندها'
        }
    },
    props:['cat_id'],
    mounted() {
        this.getProduct();
        this.getBrand();

    },
    methods:{
        getProduct:function (page=1) {
            const url=this.$siteUrl+"/get_compare_products?page="+page;
            const formData=new FormData();
            formData.append('brand_id',this.brand_id);
            formData.append('cat_id',this.cat_id);

            this.axios.post(url,formData).then(response=>{
                this.productList=response.data;
            }).catch(error=>{
                if (this.product_fail_request_count<2){
                    this.getProduct();
                    this.product_fail_request_count++;
                }

            });;
        },
        add_compare_list:function (product_id) {
            let url=window.location.href;
            if (url.split('/dkp-'+product_id).length==1)
            {
                url=url+"/dkp-"+product_id;
                window.location=url;
            }

        },
        getBrand:function () {
            const url=this.$siteUrl+"/site/getCatBrand";
            const formData=new FormData();
            formData.append('cat_id',this.cat_id);

            this.axios.post(url,formData).then(response=>{
                this.brandList=response.data;
            }).catch(error=>{
                if (this.brand_fail_request_count<2){
                    this.getBrand();
                    this.brand_fail_request_count++;
                }

            });
        },
        getBrandProduct:function (brand_id,brand_text) {
            this.brand_id=brand_id;
            this.brand_text=brand_text;
            this.getProduct(1);
        }
    }
}
</script>

<style scoped>

</style>
