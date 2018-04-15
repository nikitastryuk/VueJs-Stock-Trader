<template>
  <div class="card m-3 col-sm-10 col-md-5 col-lg-3 text-white bg-dark">
    <div class="card-header">{{stock.name}}</div>
    <div class="card-body">
      <h5 class="card-title">Price: {{stock.price | currency}}</h5>
      <h5 class="card-title">Quantitiy: {{stock.quantity}}</h5>
      <input min="0" :class="{danger: insufficientQuantity}" v-model="quantity" class="form-control" type="number">
      <button :disabled="insufficientQuantity || quantity<=0" @click="sellStock" class="btn btn-block mt-2 btn-success">{{insufficientQuantity?'Insufficient quantity':'Sell'}}</button>
    </div>
  </div>
</template>

<script>
  import {
    mapActions
  } from 'vuex';
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
      insufficientQuantity() {
        return this.quantity > this.stock.quantity;
      }
    },
    methods: {
      ...mapActions({
        placeSellOrder: 'sellStock'
      }),
      sellStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        };
        // this.$store.dispatch('sellStock', order);
        this.placeSellOrder(order);
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