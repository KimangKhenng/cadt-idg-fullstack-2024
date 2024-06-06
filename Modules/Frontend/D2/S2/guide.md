# D2 S2: Migrating from HTML/CSS Project to Vue 3

Watch recorded class: https://youtu.be/6PmG9Co6qEU

This exercise will guide you through migrating a HTML/CSS project to a Vue 3 project. We'll break down the process into manageable steps to help you understand the core concepts of Vue and how to integrate your existing HTML and CSS.

## Exercise Steps

### Step 1: Set Up Your Vue 3 Project

1. **Install Vue CLI:**
   Make sure you have Node.js installed, then install Vue CLI globally:
   ```bash
   npm install -g @vue/cli
   ```

2. **Create a New Vue Project:**
   Create a new Vue 3 project using the Vue CLI:
   ```bash
   vue create my-vue-project
   ```

3. **Navigate to the Project Directory:**
   ```bash
   cd my-vue-project
   ```

4. **Start the Development Server:**
   ```bash
   npm run serve
   ```

### Step 2: Structure Your HTML into Vue Components

1. **Identify Sections of Your HTML:**
   Review your existing HTML file in `finexo-html` and identify logical sections that can be converted into Vue components. For example, a header, a main content area, and a footer.

2. **Create Component Files:**
   Create separate `.vue` files for each section identified. For example:
   - `src/components/Header.vue`
   - `src/components/MainContent.vue`
   - `src/components/Footer.vue`

3. **Move HTML Content to Components:**
   Transfer the relevant HTML content to the template section of each component file.

   ```html
   <!-- src/components/Header.vue -->
   <template>
     <header>
       <h1>My Website Header</h1>
       <nav>
         <ul>
           <li><a href="#">Home</a></li>
           <li><a href="#">About</a></li>
           <li><a href="#">Contact</a></li>
         </ul>
       </nav>
     </header>
   </template>

   <script>
   export default {
     name: 'Header',
   };
   </script>

   <style scoped>
   header {
     background-color: #333;
     color: white;
     padding: 10px;
   }
   </style>
   ```

### Step 3: Integrate CSS Styles

1. **Move CSS to Components:**
   Transfer relevant CSS styles to the `<style>` section of each Vue component. Ensure you use scoped styles to prevent CSS conflicts.

2. **Global Styles:**
   If you have global styles, create a `global.css` file in the `src/assets` directory and import it in `src/main.js`.

   ```css
   /* src/assets/global.css */
   body {
     font-family: Arial, sans-serif;
     background-color: #f0f0f0;
     margin: 0;
   }
   ```

   ```js
   // src/main.js
   import { createApp } from 'vue';
   import App from './App.vue';
   import './assets/global.css';

   createApp(App).mount('#app');
   ```

### Step 4: Compose the Main App Component

1. **Update App.vue:**
   Import and use your newly created components in `App.vue`.

   ```vue
   <template>
     <div id="app">
       <Header />
       <MainContent />
       <Footer />
     </div>
   </template>

   <script>
   import Header from './components/Header.vue';
   import MainContent from './components/MainContent.vue';
   import Footer from './components/Footer.vue';

   export default {
     name: 'App',
     components: {
       Header,
       MainContent,
       Footer,
     },
   };
   </script>

   <style>
   /* Optional: Add any global styles for the App component here */
   </style>
   ```

### Step 5: Add Dynamic Behavior

1. **Add Data and Methods:**
   Enhance your components with Vue's reactivity by adding data properties and methods.

   ```vue
   <!-- src/components/MainContent.vue -->
   <template>
     <main>
       <h2>{{ title }}</h2>
       <p>{{ content }}</p>
       <button @click="changeContent">Change Content</button>
     </main>
   </template>

   <script>
   export default {
     name: 'MainContent',
     data() {
       return {
         title: 'Welcome to My Website',
         content: 'This is the main content area.',
       };
     },
     methods: {
       changeContent() {
         this.content = 'The content has been changed!';
       },
     },
   };
   </script>

   <style scoped>
   main {
     padding: 20px;
     background-color: #fff;
     border: 1px solid #ccc;
   }
   </style>
   ```

### Step 6: Review and Refine

1. **Test Your Application:**
   Run your Vue development server and ensure that your application works as expected. Make any necessary adjustments to your components and styles.

2. **Optimize and Refactor:**
   Review your code for optimization opportunities. Ensure that your components are reusable and that your styles are maintainable.
