# D2 S4: Apply Vue Router

Please go back to [Session #2](/Modules/D2/S2/guide.md) and apply `vue-router` there to navigate page.

## Step 1: Install Vue Router

1. **Install Vue Router:**
   ```bash
   npm install vue-router@4
   ```

## Step 2: Set Up Vue Router

1. **Create Router Configuration:**
   Create a `router/index.js` file and set up your routes.

   ```js
   // src/router/index.js
   import { createRouter, createWebHistory } from 'vue-router';
   import Home from '../components/Home.vue';
   import About from '../components/About.vue';
   import NotFound from '../components/NotFound.vue';

   const routes = [
     { path: '/', component: Home },
     { path: '/about', component: About },
     { path: '/:pathMatch(.*)*', component: NotFound }, // 404 route
   ];

   const router = createRouter({
     history: createWebHistory(),
     routes,
   });

   export default router;
   ```

2. **Update Main Entry File:**
   Import and use the router in your main entry file (`main.js`).

   ```js
   // src/main.js
   import { createApp } from 'vue';
   import App from './App.vue';
   import router from './router';

   createApp(App).use(router).mount('#app');
   ```

## Step 3: Create Components

1. **Create Home, About, and NotFound Components:**
   Create the components that will be used for routing.

   ```vue
   <!-- src/components/Home.vue -->
   <template>
     <div>
       <h1>Home Page</h1>
       <p>Welcome to the home page!</p>
     </div>
   </template>

   <script>
   export default {
     name: 'Home',
   };
   </script>

   <style scoped>
   /* Add any styles for the Home component here */
   </style>
   ```

   ```vue
   <!-- src/components/About.vue -->
   <template>
     <div>
       <h1>About Page</h1>
       <p>Learn more about us on this page.</p>
     </div>
   </template>

   <script>
   export default {
     name: 'About',
   };
   </script>

   <style scoped>
   /* Add any styles for the About component here */
   </style>
   ```

   ```vue
   <!-- src/components/NotFound.vue -->
   <template>
     <div>
       <h1>404 - Not Found</h1>
       <p>The page you are looking for does not exist.</p>
     </div>
   </template>

   <script>
   export default {
     name: 'NotFound',
   };
   </script>

   <style scoped>
   /* Add any styles for the NotFound component here */
   </style>
   ```

## Step 4: Use Router View in App Component

1. **Update App.vue:**
   Use the `<router-view>` to display the matched component for the current route.

   ```vue
   <!-- src/App.vue -->
   <template>
     <div id="app">
       <Header />
       <router-view />
       <Footer />
     </div>
   </template>

   <script>
   import Header from './components/Header.vue';
   import Footer from './components/Footer.vue';

   export default {
     name: 'App',
     components: {
       Header,
       Footer,
     },
   };
   </script>

   <style>
   /* Add any global styles for the App component here */
   </style>
   ```

## Step 5: Add Nested Routes (Optional)

1. **Set Up Nested Routes:**
   Update your router configuration to include nested routes if needed.

   ```js
   // src/router/index.js
   import { createRouter, createWebHistory } from 'vue-router';
   import Home from '../components/Home.vue';
   import About from '../components/About.vue';
   import NotFound from '../components/NotFound.vue';
   import Nested from '../components/Nested.vue';
   import NestedChild from '../components/NestedChild.vue';

   const routes = [
     { path: '/', component: Home },
     { path: '/about', component: About },
     { 
       path: '/nested', 
       component: Nested,
       children: [
         {
           path: 'child',
           component: NestedChild,
         },
       ],
     },
     { path: '/:pathMatch(.*)*', component: NotFound }, // 404 route
   ];

   const router = createRouter({
     history: createWebHistory(),
     routes,
   });

   export default router;
   ```

2. **Create Nested Components:**
   Create the parent and child components for the nested routes.

   ```vue
   <!-- src/components/Nested.vue -->
   <template>
     <div>
       <h2>Nested Page</h2>
       <router-view />
     </div>
   </template>

   <script>
   export default {
     name: 'Nested',
   };
   </script>

   <style scoped>
   </style>
   ```
