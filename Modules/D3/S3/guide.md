# D3 S3: Using Pinia with Vue 3

Pinia is a state management library for Vue.js that is designed to work seamlessly with Vue 3. It provides a simple and intuitive API for managing application state, making it easy to share data between components and manage complex application state.

In this tutorial, we will walk through the steps of setting up and using Pinia with Vue 3 in a Vue project.

## Step 1: Setting up the Project & Install Pinia
1. Open your terminal.
2. Navigate to the directory with existing the project.
   ```bash
   cd state-management
   ```
3. Install dependencies by running:
   ```bash
   npm install
   ```
4.  you need to install Pinia in your Vue project. You can do this via npm or yarn:

```bash
npm install pinia
```

## Step 2: Setup Pinia in your Vue App

Once Pinia is installed, you need to set it up in your Vue app. This involves creating a Pinia store and using it to manage your application state.

Create a new file called `pinia.js` in your project's `src` directory:

```javascript
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
```

Next, import the Pinia instance into your main Vue app file (usually `main.js` or `App.vue`) and use it to provide Pinia to your entire Vue app:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './pinia.js'

const app = createApp(App)

app.use(pinia)

app.mount('#app')
```

## Step 3: Define and Use Pinia Stores

Now that Pinia is set up in your Vue app, you can define and use Pinia stores to manage your application state.

Create a new file called `counter.js` in your project's `src/store` directory:

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})
```

We have to ways of using Pinia store in our component, the first is to use 
simple option API with the help of helper. The second way is to use composition API with the help of setup function of `<script setup>`. Here, we try to use simple approach with option API. 
We can import `mapState` and `mapActions` from `pinia` and use in our component `computed` and `methods` property accordingly.

```html
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script>
import { useCounterStore } from '@/store/counter'
import { mapState, mapActions } from 'pinia'
export default {
  computed:{
    ...mapState(useCounterStore, ['count']),
  },
  methods:{
    ...mapActions(useCounterStore, ['increment','decrement']),
  }
}
</script>
```
