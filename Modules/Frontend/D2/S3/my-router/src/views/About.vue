<template>
    <div class="about">
      <h1>About Us</h1>
      <p>We are a passionate team dedicated to delivering exceptional products and services to our customers.</p>
      <router-link to="/" class="btn">Back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'About'
  }
  </script>
  
  <style scoped>
  .about {
    text-align: center;
    padding: 20px;
  }
  
  .btn {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  