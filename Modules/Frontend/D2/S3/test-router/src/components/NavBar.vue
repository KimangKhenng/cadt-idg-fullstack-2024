<template>
  <router-link class="nav-item" to="/">Home</router-link>
  <router-link class="nav-item" to="/about">About</router-link>
  <router-link class="nav-item" to="/service">Service</router-link>
  <router-link class="nav-item" :to="`user/${userId}`">User</router-link>
</template>
<script>
export default {
  data() {
    return {
      userId: "23424 - 235253 - 523 - 5235",
    };
  },
};
</script>

<style scoped>
.nav-item {
  padding: 10px;
}
</style>