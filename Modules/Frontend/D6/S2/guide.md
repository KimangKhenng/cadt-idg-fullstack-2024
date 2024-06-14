# D6 S2: Optimzing Vue

Watch recorded video:https://youtu.be/OcnC_oRNOj0

Optimizing a Vue 3 project can significantly enhance its performance and user experience. In this tutorial, we'll cover how to implement lazy loading in your Vue 3 project.

## Lazy Load
Lazy loading helps reduce the initial load time by loading components only when needed.
```js
import { createRouter, createWebHistory } from 'vue-router';
const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home // Lazy loaded
    },
    {
        path: '/about',
        name: 'About',
        component: () => About  // Lazy loaded
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
```