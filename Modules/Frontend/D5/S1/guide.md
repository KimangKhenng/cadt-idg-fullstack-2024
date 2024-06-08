# D5 S1: Using .env Files in Vue 3

Watch recorded: https://youtu.be/DRj1a091VP8

![Env variables](/Modules/Frontend/D5/S1/environment-variable-secret.jpg)

## Introduction
Environment variables are crucial in configuring your application for different environments such as development, testing, and production. Vue 3 provides a simple way to manage these variables using `.env` files.

## Setting Up .env Files

1. **Create .env Files**
   - At the root of your Vue 3 project, create `.env` files for each environment you need:
     - `.env` (default, used for all environments if not specified otherwise)
     - `.env.local` (local overrides, ignored by git)
     - `.env.development` (development environment)
     - `.env.production` (production environment)
     - `.env.test` (test environment)

2. **Define Variables**
   - Add your environment variables to these files. Each variable must start with `VITE_` to be accessible in your Vue application.
   - Example:
     ```ini
     VUE_APP_URL=https://api.example.com
     VUE_APP_NAME=MyVueApp
     ```

## Accessing Environment Variables in Your Vue Application

1. **Access Variables in JavaScript**
   - Use `process.env` to access your environment variables in your JavaScript code:
     ```javascript
     console.log(process.VUE_APP_URL);
     console.log(process.VUE_APP_NAME);
     ```

2. **Using Variables in Vue Components**
   - You can also use the environment variables directly in your Vue components:
     ```vue
     <template>
       <div>
         <h1>{{ appName }}</h1>
       </div>
     </template>

     <script>
     export default {
       data() {
         return {
           appName: process.env.VUE_APP_NAME,
         };
       },
     };
     </script>
     ```

## Different Types of Vue Environment Variables

1. **Base Variables**
   - Defined in the `.env` file and used across all environments unless overridden.
     ```ini
     VITE_API_URL=https://default.api.example.com
     ```

2. **Local Variables**
   - Defined in `.env.local` and used to override variables locally. These should not be committed to version control.
     ```ini
     VITE_API_URL=http://localhost:3000
     ```

3. **Environment-Specific Variables**
   - Defined in `.env.[mode]` files for specific environments.
     - For development (`.env.development`):
       ```ini
       VITE_API_URL=https://dev.api.example.com
       ```
     - For production (`.env.production`):
       ```ini
       VITE_API_URL=https://api.example.com
       ```
     - For testing (`.env.test`):
       ```ini
       VITE_API_URL=https://test.api.example.com
       ```

## Best Practices

1. **Prefix Variables with `VUE_APP_`**
   - Always prefix your variables with `VUE_APP_` to ensure they are exposed to your Vue app.

2. **Secure Sensitive Data**
   - Avoid putting sensitive data like API keys directly in your `.env` files. Consider using a server-side solution to handle such data securely.

3. **Commit Only Necessary Files**
   - Do not commit `.env.local` or any files containing sensitive data to your version control.

By following this guide, you can effectively manage and utilize environment variables in your Vue 3 application, ensuring that your app is configured correctly for different environments.

# Using Vite in Your Existing Vue 3 Project

Vite is a modern build tool that offers fast development and optimized production builds for Vue 3 projects. Here's how to integrate Vite into your existing Vue 3 project.

## Step-by-Step Guide

### 1. Install Vite

1. **Install Vite and Related Plugins**
   - In your existing Vue 3 project directory, run the following command to install Vite and the necessary plugins:
     ```bash
     npm install --save-dev vite @vitejs/plugin-vue
     ```

### 2. Update `package.json`

1. **Modify Scripts**
   - Update the `scripts` section in your `package.json` to use Vite for development and build:
     ```json
     {
       "scripts": {
         "dev": "vite",
         "build": "vite build",
         "serve": "vite preview"
       }
     }
     ```

### 3. Create Vite Configuration File

1. **Create `vite.config.js`**
   - At the root of your project, create a `vite.config.js` file to configure Vite:
     ```javascript
     import { defineConfig } from 'vite';
     import vue from '@vitejs/plugin-vue';

     export default defineConfig({
       plugins: [vue()],
       resolve: {
         alias: {
           '@': '/src',
         },
       },
       server: {
         port: 3000,
       },
     });
     ```

### 4. Update Project Structure

1. **Update HTML Template**
   - Move your existing HTML template to the `public` directory (if it's not already there). Vite uses `index.html` as the entry point:
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Vite Vue 3 App</title>
     </head>
     <body>
       <div id="app"></div>
       <script type="module" src="/src/main.js"></script>
     </body>
     </html>
     ```

2. **Update Main Entry File**
   - Ensure your main entry file (e.g., `src/main.js`) is set up to work with Vite:
     ```javascript
     import { createApp } from 'vue';
     import App from './App.vue';
     import router from './router';
     import store from './store';

     createApp(App).use(store).use(router).mount('#app');
     ```

### 5. Configure CSS and Assets

1. **Handle CSS Files**
   - Vite supports CSS out of the box. Ensure your CSS files are imported in your components or main entry file:
     ```javascript
     import './assets/styles.css';
     ```

2. **Static Assets**
   - Place static assets in the `public` directory. They can be referenced directly in your code:
     ```javascript
     <img src="/public/logo.png" alt="Logo">
     ```

### 6. Environment Variables

1. **Create .env Files**
   - Create `.env` files for different environments (`.env`, `.env.development`, `.env.production`):
     ```ini
     VITE_API_URL=https://api.example.com
     ```

2. **Access Variables**
   - Access these variables in your Vue components or JavaScript files using `import.meta.env`:
     ```javascript
     console.log(import.meta.env.VITE_API_URL);
     ```

### 7. Start Development Server

1. **Run Development Server**
   - Start the Vite development server:
     ```bash
     npm run dev
     ```

2. **Build for Production**
   - Build your project for production:
     ```bash
     npm run build
     ```

3. **Preview Production Build**
   - Preview the production build locally:
     ```bash
     npm run serve
     ```
