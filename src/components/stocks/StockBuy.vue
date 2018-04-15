<template>
  <div class="card m-3 col-sm-10 col-md-5 col-lg-3 text-white bg-dark">
    <div class="card-header text-center">{{stock.name}}</div>
    <div class="card-body">
      <h5 class="card-title">Price: {{stock.price | currency}}</h5>
      <input min="0" :class="{danger: insufficientFunds}" v-model="quantity" class="form-control" type="number">
      <button :disabled="insufficientFunds || quantity<=0" @click="buyStock" class="btn btn-block mt-2 btn-success">{{insufficientFunds?'Insufficient funds':'Buy'}}</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'stock'
    ],
    data() {
      return {
        quantity: 0
      }
    },
    computed: {
      funds() {
        return this.$store.getters.funds;
      },
      insufficientFunds() {
        return this.quantity * this.stock.price > this.funds
      }
    },
    methods: {
      buyStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: +this.stock.price,
          quantity: +this.quantity
        };
        this.$store.dispatch('buyStock', order);
        this.quantity = 0;
      }
    }
  }
</script>

<style scoped>
  .danger {
    border: 1px solid darkred;
  }
</style>