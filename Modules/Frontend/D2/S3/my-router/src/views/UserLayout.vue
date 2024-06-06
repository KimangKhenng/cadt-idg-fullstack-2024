<template>
    <div class="user-layout">
      <h1>User Layout</h1>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserLayout'
  }
  </script>
  
  <style scoped>
  .user-layout {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  </style>
  