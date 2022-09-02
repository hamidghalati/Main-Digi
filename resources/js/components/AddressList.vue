<template>
    <div>

        <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>

        <address-form></address-form>



    </div>

</template>

<script>
import AddressForm from "./AddressForm";
export default {
    name: "AddressList",
    components: {AddressForm},

}
</script>

<style scoped>

</style>
