import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/view/Home.vue'
import About from '@/view/About.vue'
import User from '@/view/User.vue'
import Setting from '@/components/user/setting.vue'
import Profile from '@/components/user/profile.vue'

const routes = [
    { path: '/', component: Home, exact: true },
    { path: '/about', component: About },
    {
        path: '/user/:userId', component: User, children: [
            { path: '', component: Profile },
            { path: 'setting', component: Setting }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})

const app = createApp(App)
app.use(router)
app.mount('#app')
