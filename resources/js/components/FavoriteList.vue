<template>

</template>

<script>
export default {
    name: "FavoriteList",
    mounted() {
        app=this;
        app.getList();
    },
    methods:{
        getList:function () {
            $("#loading").show();
        }
    }
}
</script>

<style scoped>

</style>
