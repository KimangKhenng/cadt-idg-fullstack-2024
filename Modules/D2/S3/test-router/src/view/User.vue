<template>
  <p>User</p>
  <p>Id: {{ $route.params.userId }}</p>
  <p>Query: {{ $route.query }}</p>
  <router-link :to="`/user/${$route.params.userId}/setting`"
    >Setting</router-link
  >
  <router-view />
</template>
<script>
export default {
  mounted() {
    const param = this.$route.params.id;
    console.log(param);
  },
};
</script>