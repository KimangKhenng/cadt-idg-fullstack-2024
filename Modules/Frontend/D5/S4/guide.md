# D5 S4 : Debugging Vue 3 with Source Maps

Source maps are essential tools for debugging in modern JavaScript frameworks, including Vue 3. They allow you to view your original source code (e.g., your `.vue` files) in the browser's developer tools instead of the minified or transpiled code.

## Step-by-Step Guide

### 1. Enable Source Maps in Your Vue Project

1. **Vue CLI Projects**
   - If you are using Vue CLI, source maps are enabled by default in development mode. To ensure they are enabled in production, update your `vue.config.js`:
     ```javascript
     module.exports = {
       productionSourceMap: true
     };
     ```

2. **Vite Projects**
   - If you are using Vite, source maps are also enabled by default in development mode. To ensure they are enabled in production, update your `vite.config.js`:
     ```javascript
     import { defineConfig } from 'vite';
     import vue from '@vitejs/plugin-vue';

     export default defineConfig({
       plugins: [vue()],
       build: {
         sourcemap: true
       }
     });
     ```

### 2. Build Your Project with Source Maps

1. **Development Build**
   - For development builds, simply run:
     ```bash
     npm run serve   # For Vue CLI
     npm run dev     # For Vite
     ```

2. **Production Build**
   - For production builds, ensure source maps are included:
     ```bash
     npm run build
     ```

### 3. Debugging in the Browser

1. **Open Developer Tools**
   - Open the developer tools in your browser (e.g., Chrome DevTools, Firefox Developer Tools).

2. **Access the Source Panel**
   - Navigate to the "Sources" panel in Chrome DevTools or the equivalent in other browsers.

3. **Locate Your Source Files**
   - You should see your original source files (e.g., `.vue` files) listed in the sources tree. These are provided by the source maps.

### 4. Setting Breakpoints

1. **Set Breakpoints in Source Files**
   - Open the source file you want to debug (e.g., `HelloWorld.vue`) in the "Sources" panel.
   - Click on the line number where you want to set a breakpoint.

2. **Inspect Variables**
   - When your breakpoint is hit, you can inspect the values of variables in the "Scope" section of the developer tools.
   - Hover over variables in your code to see their current values.

### 5. Using Console Logs

1. **Add Console Logs**
   - Insert `console.log` statements in your `.vue` files to log information to the console:
     ```javascript
     console.log('Current count:', count.value);
     ```

2. **View Logs**
   - Open the "Console" panel in the developer tools to view your log messages.

### 6. Source Map Verification

1. **Verify Source Maps**
   - In the developer tools, you can verify that the source maps are working by checking the mappings from the original source to the compiled code.
   - Ensure that the source maps are correctly mapping the code by stepping through your breakpoints and observing the execution flow.

### 7. Handling Source Map Issues

1. **Common Issues**
   - **Source Maps Not Loading**: Ensure your server is serving the source map files. They usually have a `.map` extension.
   - **Incorrect Mapping**: Check the configuration in `vue.config.js` or `vite.config.js` and ensure the source map files are correctly generated.

### 8. Advanced Debugging Techniques

1. **Vue Devtools**
   - Use Vue Devtools for advanced component inspection, state management, and event tracking.
   - Install Vue Devtools as a browser extension and open it alongside the browser's native developer tools.

2. **Network Requests**
   - Use the "Network" panel in developer tools to inspect network requests and responses, including AJAX calls.

## Conclusion

By enabling and utilizing source maps, you can effectively debug your Vue 3 applications, viewing and interacting with your original source code directly in the browser's developer tools. This makes identifying and fixing issues much easier and more intuitive.

Happy debugging!
