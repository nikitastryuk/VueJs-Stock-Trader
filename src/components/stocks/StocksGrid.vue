<template>
    <div class="row justify-content-around m-4">
        <app-stock v-for="stock in stocks" :key="stock.id" :stock="stock"></app-stock>
    </div>
</template>

<script>
    import StockBuy from "./StockBuy.vue";
    export default {
        components: {
            appStock: StockBuy
        },
        computed: {
            stocks() {
                return this.$store.getters.stocks;
            }
        }
    };
</script>

<style scoped>
</style>