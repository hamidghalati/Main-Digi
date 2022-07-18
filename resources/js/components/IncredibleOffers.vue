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
            <tr v-for="(item,key) in WarrantyList">
                <th scope="row">{{(++key)}}</th>
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
            </tr>


            </tbody>
        </table>
    </div>

</template>

<script>
export default {
    name: "IncredibleOffers",
    data(){
        return{
            WarrantyList:[]
        }
    },
    mounted() {
        this.getWarranty();
    },
    methods:{
        getWarranty:function (item) {

            const url=this.$siteUrl+'/admin/ajax/getWarranty'
            this.axios.get(url).then(response=>{
                this.WarrantyList=response.data;
            })
        }
    }

}
</script>

<style scoped>

</style>
