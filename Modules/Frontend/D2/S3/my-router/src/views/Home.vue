<template>
  <div class="home">
    <h1>Welcome to Our Website!</h1>
    <custom-button />
    <p>We are thrilled to have you here. Explore our services and products.</p>
    <router-link to="/about" class="btn">Learn More</router-link>
  </div>
</template>
  
  <script>
import CustomButton from "../components/CustomButton.vue";
export default {
  components: { CustomButton },
  name: "Home",
};
</script>
  
  <style scoped>
.home {
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
  