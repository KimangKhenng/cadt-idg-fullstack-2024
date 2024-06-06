# D4 S3: Vue I18n Internationalization plugin for Vue.js

Watch recorded class:https://youtu.be/9Jvxo1x20mk

Internationalization (i18n) is essential for creating applications that support multiple languages and locales. In this tutorial, we'll walk through the process of setting up and using `vue-i18n` with Vue 3.


## Install Package

```sh [npm]
npm install vue-i18n@9
```

When using with a module system, you must explicitly install the `vue-i18n`
via `app.use()`:


```js
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // something vue-i18n options here ...
})

const app = createApp({
  // something vue options here ...
})

app.use(i18n)
app.mount('#app')
```


## Direct Download

<https://unpkg.com/vue-i18n@9>

[unpkg.com](https://unpkg.com) provides a npm-based CDN links. The above link will always point to the latest release on npm.

### Global import

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-i18n@9"></script>
```

You can also use a specific version/tag via URLs like <https://unpkg.com/vue-i18n@9.12.0/dist/vue-i18n.global.js>

## Configure `vue-i18n`

Create an `i18n` configuration file. You can do this in a new file called `i18n.js` in the `src` directory:
```js
// src/i18n.js
import { createI18n } from 'vue-i18n'

// Define messages for each locale
const messages = {
  en: {
    welcome: 'Welcome',
    message: 'Hello World'
  },
  fr: {
    welcome: 'Bienvenue',
    message: 'Bonjour le monde'
  }
}

// Create i18n instance with options
const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})

export default i18n
```

## Integrate `i18n` with Vue 3
Update your `main.js` file to use the i18n instance:

```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'

const app = createApp(App)
app.use(i18n)
app.mount('#app')
```

## Switch Locales
To switch between locales, you can modify the `locale` property of the i18n instance. For example, you can add buttons to switch locales in your component:
```vue
<template>
  <div id="app">
    <p>{{ $t('welcome') }}</p>
    <p>{{ $t('message') }}</p>
    <button @click="changeLocale('en')">English</button>
    <button @click="changeLocale('fr')">Français</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale
    }
  }
}
</script>
```