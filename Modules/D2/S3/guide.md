# D2 S3: Vue Router

## Introduction to Vue Router
Vue Router is the official router for Vue.js. It deeply integrates with Vue.js core to make single-page application development a breeze.

## Installation and Configuration
To use Vue Router in your Vue 3 project, first, you need to install it via npm or yarn:

1. Open your terminal.
2. Navigate to the directory with existing the project.
   ```bash
   cd my-router
   ```
3. Install dependencies by running:
   ```bash
   npm install
   ```
4. Install vue router:
    ```bash
    npm install vue-router@4
    ```

After installation, you need to configure Vue Router in your main.js or entry point file:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Import your components
import Home from './views/Home.vue'
import About from './views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
```


## Router Link
`<router-link>` is a component provided by Vue Router for creating navigation links in your Vue application. It renders an anchor tag (`<a>`) with appropriate href attributes.

```html
<router-link to="/about">About</router-link>
```

## Router View
`router-view` will display the component that corresponds to the URL. You can put it anywhere to adapt it to your layout.

To see the changes, replace what's inside `template` in `App.vue` to `<router-view></router-vuew>`
```html
<template>
  <router-view></router-view>
</template>
```

## Folder Structure
In a Vue project, you typically organize your files into different folders such as `components`, `views`, `router`, etc. The `router` folder contains files related to routing configuration.

```
project
│   App.vue
│   main.js
│
└───router
│       index.js
│   
└───components
│       ...
│   
└───views
        ...
```

## Router Parameters
Router parameters allow you to create dynamic routes. You can define route parameters by placing a colon before the parameter name in the route path.

```javascript
const routes = [
  {
    path: '/user/:id',
    component: User
  }
]
```
To use router parameters inside your Vue components, you can access them through the `$route` object provided by Vue Router. This object contains information about the current route, including parameters defined in the route path.

Here's how you can access router parameters inside your Vue components:

```html
<template>
  <div>
    <h1>User Details</h1>
    <p>User ID: {{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserDetails',
  created() {
    // Access the route parameter in the created hook
    console.log('User ID:', this.$route.params.id)
  }
}
</script>
```
In the above example, we have a Vue component named `UserDetails`. Inside the template section, we use double curly braces `{{ }}` to interpolate and display the value of the id parameter from the route. We access this parameter using `$route.params.id`.

Additionally, you can access router parameters programmatically in the component's JavaScript section. For example, in the `created` hook, we access the `id` parameter using `this.$route.params.id`. This can be useful for performing actions or fetching data based on the router parameter.

## Dynamic Links and Nested Routes

Dynamic Links:
Dynamic links in Vue Router allow you to create links whose destinations are determined dynamically based on route parameters or other data. You can use router-link to create dynamic links.

```html
<router-link :to="'/user/' + userId">User Profile</router-link>
```

In this example, the `userId` variable is dynamic, and the link's destination is determined by the value of this variable.

Nested Routes:
Nested routes allow you to create hierarchical routing structures where routes are nested within each other. This is useful for creating layouts with multiple components.

```javascript
const routes = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: 'profile',
        component: UserProfile
      },
      {
        path: 'settings',
        component: UserSettings
      }
    ]
  }
]
```

In this example, the `/user` route has nested routes `/user/profile` and `/user/settings`. When navigating to `/user/profile`, the `UserProfile` component is rendered inside the `UserLayout` component. Similarly, navigating to `/user/settings` renders the `UserSettings` component inside the `UserLayout`.

Nested routes allow you to create more complex layouts and structures in your Vue application, making it easier to manage and organize your code.


## Programmatic Navigation
Vue Router provides methods for programmatic navigation. You can navigate to a different route using `router.push()`, `router.replace()`, or `router.go()` methods.

```javascript
// Push a new route onto the history stack
router.push('/about')

// Replace the current route in the history stack
router.replace('/about')

// Go back or forward in the history stack
router.go(-1)
```

## Navigation Guards (Back Later when Integrating Backend)
Navigation guards are functions provided by Vue Router to control navigation. They allow you to guard routes, perform authentication, and execute code before and after route navigation.

```javascript
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Perform authentication or other checks
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```
