<template>
    <div class="m-4">
        <h1>Current user: {{getUserEmail()}}</h1>
        <h6>You may Save & Load your Data</h6>
        <h6>Click on 'End Day' to begin a New Day!</h6>
        <hr>
        <p>Your Funds: {{ funds | currency}}</p>
    </div>
</template>

<script>
export default {
  computed: {
    funds() {
      return this.$store.getters.funds;
    }
  },
  methods: {
    getUserEmail() {
      if (!this.$store.getters.user) {
        return;
      }
      return this.$store.getters.user.email;
    }
  }
};
</script>