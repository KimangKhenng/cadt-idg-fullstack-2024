# D2 S1: Styling Vue 3 Components

Watch recorded class: https://youtu.be/kgmsSwKNSAY

In Vue 3, you have several options to style your components, including global styles, component-specific styles, scoped styles, and using preprocessors like Sass. Let's walk through each method and how to apply them.

## 1. Global vs Component Style

### Global Styles
Global styles are styles that apply to your entire application. You typically define these styles in your main CSS file, which is imported in your main entry file (e.g., `main.js`).

```css
/* global.css */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
}
```
```js
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import './global.css';

createApp(App).mount('#app');
```

### Component-Specific Styles

Component-specific styles are defined within the `.vue` file of the component. These styles will only apply to the specific component, unless scoped otherwise.
```vue
<template>
  <div class="my-component">
    <p>This is my component.</p>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
};
</script>

<style>
.my-component {
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
```

## 2. Scoped Styles
Scoped styles are styles that apply only to the component in which they are defined. This is useful for avoiding style conflicts between components.

### Using Scoped Styles

You can scope your styles by adding the `scoped` attribute to the `<style>` tag.
```vue
<template>
  <div class="my-component">
    <p>This is my component with scoped styles.</p>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
};
</script>

<style scoped>
.my-component {
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
```

## 3. Scoped Styles with Preprocessors

You can use preprocessors like Sass or Less in your Vue components. To do this, you'll need to install the corresponding loader (e.g., `sass-loader` for Sass).

### Using Scoped Styles with Sass

First, install the necessary dependencies:
```bash
npm install sass-loader sass --save-dev
```
Then, you can use Sass in your component styles:
```vue
<template>
  <div class="my-component">
    <p>This is my component with scoped styles and Sass.</p>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
};
</script>

<style scoped lang="scss">
.my-component {
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;

  p {
    color: blue;
  }
}
</style>
```

## 4. Vue Directives for Styling

Vue directives can be used to dynamically apply styles to your components. The `v-bind` directive is particularly useful for this purpose.

### Using v-bind for Dynamic Styles
You can bind inline styles dynamically using `v-bind:style` or the shorthand `:style`.
```vue
<template>
  <div :style="dynamicStyles">
    <p>This component uses dynamic styles.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicStyles: {
        color: 'blue',
        fontSize: '20px',
      },
    };
  },
};
</script>

<style scoped>
div {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
```
### Using v-bind for CSS Classes
You can also dynamically bind CSS classes using `v-bind:class` or the shorthand `:class`.
```vue
<template>
  <div :class="{ 'active': isActive }">
    <p>This component uses dynamic classes.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
    };
  },
};
</script>

<style scoped>
.active {
  background-color: yellow;
}
</style>
```