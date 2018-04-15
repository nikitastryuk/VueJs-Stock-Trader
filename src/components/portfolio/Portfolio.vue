<template>
    <div>
        <div class="row justify-content-between m-4">
            <app-stock v-for="stock in stocks" :stock="stock" :key="stock.id"></app-stock>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    import StockSell from "./StockSell.vue";
    export default {
        computed: {
            ...mapGetters({
                stocks: 'stockPortfolio'
            }),
            // stocks() {
            //     return this.$store.getters.stockPortfolio;
            // }
        },
        components: {
            appStock: StockSell
        }
    }
</script>

<style scoped>
</style>