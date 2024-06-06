<template>
  <p>Hello from User setting</p>
  <button @click="goHome">GO HOME</button>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>