# D6 S3: NuxtJS

Watch recorded video:https://youtu.be/G8DaRVb0mXM

Nuxt 3 is a powerful framework for creating Vue.js applications, offering features like server-side rendering, static site generation, and more. Here's a step-by-step tutorial on how to bootstrap a Nuxt 3 project.

### Prerequisites

-   Node.js (version 14 or higher)
-   npm or yarn

### Step 1: Install Nuxt 3

First, you need to install Nuxt 3 using npm or yarn. Open your terminal and run the following command:

```bash
npx nuxi@latest init <project-name>
```

This will create a new directory called `<project-name>` with the default Nuxt 3 project structure.

### Step 2: Start the Development Server

Now, you can start the development server to see your Nuxt 3 application in action:

```bash
npm run dev
# or
yarn dev
```

Open your browser and go to `http://localhost:3000`. You should see the default Nuxt 3 welcome page.

### Step 3: Project Structure

Here is a brief overview of the default project structure:

-   `app/`: Application-level components, middleware, and plugins.
-   `assets/`: Uncompiled assets such as styles and images.
-   `components/`: Vue components.
-   `layouts/`: Application layouts.
-   `pages/`: Application pages, each file represents a route.
-   `public/`: Static files served directly.
-   `plugins/`: JavaScript plugins to be run before mounting the root Vue.js application.
-   `nuxt.config.ts`: Nuxt configuration file.

### Step 4: Create Your First Page

To create a new page, simply add a new file in the `pages` directory. For example, create `pages/about.vue` with the following content:

```vue
<template>
  <div>
    <h1>About Page</h1>
    <p>This is the about page of our Nuxt 3 application.</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
h1 {
  color: #007bff;
}
</style>
```

### Step 5: Navigating Between Pages

Nuxt 3 uses file-based routing. To navigate between pages, use the `<NuxtLink>` component:


```vue
<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to our Nuxt 3 application!</p>
    <NuxtLink to="/about">Go to About Page</NuxtLink>
  </div>
</template>

<script setup>
</script>

<style scoped>
h1 {
  color: #007bff;
}
</style>
```

Replace content `app.vue` with
```vue
<template>
  <NuxtPage></NuxtPage>
<template>
```

### Basic Concepts of Nuxt 3

#### 1\. **File-based Routing**

Nuxt 3 automatically generates routes based on the files in the `pages` directory. Each `.vue` file in this directory corresponds to a route.

#### 2\. **Server-Side Rendering (SSR) and Static Site Generation (SSG)**

Nuxt 3 supports SSR, which means that pages are pre-rendered on the server before being sent to the client, improving SEO and performance. It also supports SSG, where pages are generated at build time.

#### 3\. **Layouts**

Layouts are used to define common structures for pages. You can create a default layout or custom layouts in the `layouts` directory.

#### 4\. **Plugins**

Plugins allow you to add global functionalities to your application. They are defined in the `plugins` directory and can be used to add libraries or custom code.

#### 5\. **Store**

Nuxt 3 provides an optional store for state management, similar to Vuex in Vue.js. You can define the store in the `store` directory.

#### 6\. **Middlewares**

Middlewares are functions that run before rendering a page or layout. They can be used for authentication, logging, etc.

#### 7\. **Modules**

Nuxt 3 modules extend the core functionality of the framework. You can use community modules or create your own.