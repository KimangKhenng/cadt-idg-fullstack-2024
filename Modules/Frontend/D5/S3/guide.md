# D5 S3 : Migrating to `<script setup>` in Vue 3

Watch recorded video: https://youtu.be/RC3tGEgm1pI

Vue 3 introduces the `<script setup>` syntax, which is a more concise way to use the Composition API. It simplifies component setup and can lead to more readable and maintainable code.

## Introduction

The `<script setup>` syntax allows you to write composition logic directly inside the `<script>` tag without exporting a default object. It automatically handles the component's setup and reactivity.

## Step-by-Step Migration Guide

### 1. Basic Setup

1. **Starting Point (Options API)**
   - Assume you have a Vue component written using the Options API:
     ```vue
     <template>
       <div>
         <h1>{{ title }}</h1>
         <button @click="increment">Increment</button>
         <p>{{ count }}</p>
       </div>
     </template>

     <script>
     export default {
       data() {
         return {
           title: 'Hello, World!',
           count: 0
         };
       },
       methods: {
         increment() {
           this.count++;
         }
       }
     };
     </script>
     ```

### 2. Convert to `<script setup>`

1. **Setup Script Block**
   - Use the `<script setup>` block to define reactive state and methods directly:
     ```vue
     <template>
       <div>
         <h1>{{ title }}</h1>
         <button @click="increment">Increment</button>
         <p>{{ count }}</p>
       </div>
     </template>

     <script setup>
     import { ref } from 'vue';

     const title = ref('Hello, World!');
     const count = ref(0);

     const increment = () => {
       count.value++;
     };
     </script>
     ```

### 3. Using Computed Properties

1. **Add Computed Properties**
   - Define computed properties using the `computed` function:
     ```vue
     <template>
       <div>
         <h1>{{ title }}</h1>
         <button @click="increment">Increment</button>
         <p>{{ doubledCount }}</p>
       </div>
     </template>

     <script setup>
     import { ref, computed } from 'vue';

     const title = ref('Hello, World!');
     const count = ref(0);

     const increment = () => {
       count.value++;
     };

     const doubledCount = computed(() => count.value * 2);
     </script>
     ```

### 4. Lifecycle Hooks

1. **Use Lifecycle Hooks**
   - Utilize lifecycle hooks like `onMounted` within the `<script setup>` block:
     ```vue
     <script setup>
     import { ref, onMounted } from 'vue';

     const title = ref('Hello, World!');
     const count = ref(0);

     const increment = () => {
       count.value++;
     };

     onMounted(() => {
       console.log('Component has been mounted');
     });
     </script>
     ```

### 5. Watchers

1. **Add Watchers**
   - Implement watchers using the `watch` function:
     ```vue
     <script setup>
     import { ref, watch } from 'vue';

     const title = ref('Hello, World!');
     const count = ref(0);

     const increment = () => {
       count.value++;
     };

     watch(count, (newValue, oldValue) => {
       console.log(`Count changed from ${oldValue} to ${newValue}`);
     });
     </script>
     ```

### 6. Template Refs

1. **Using Template Refs**
   - Access template refs by defining them in the `<script setup>` block and binding them in the template:
     ```vue
     <template>
       <div>
         <h1>{{ title }}</h1>
         <button @click="increment">Increment</button>
         <p ref="countRef">{{ count }}</p>
       </div>
     </template>

     <script setup>
     import { ref, onMounted } from 'vue';

     const title = ref('Hello, World!');
     const count = ref(0);
     const countRef = ref(null);

     const increment = () => {
       count.value++;
     };

     onMounted(() => {
       console.log(countRef.value); // Access the DOM element
     });
     </script>
     ```
