<template>
    <div class="user-profile">
      <h2>User Profile</h2>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserProfile',
    data() {
      return {
        user: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      };
    }
  }
  </script>
  
  <style scoped>
  .user-profile {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  </style>
  