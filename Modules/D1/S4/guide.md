# D1 S4: Vue 3 Project using Vue CLI

In this tutorial, we'll walk through the steps to bootstrap a Vue 3 project using Vue CLI (Command Line Interface). Vue CLI is a standard tooling for Vue.js development, providing a set of pre-configured build setups and a user-friendly command-line interface.

## Prerequisites

Before we begin, ensure you have the following installed on your system:

- Node.js and npm (Node Package Manager): You can download and install them from [here](https://nodejs.org/).
- Vue CLI: Install it globally using npm by running `npm install -g @vue/cli`.

## Step 1: Create a New Vue Project

Open your terminal and navigate to the directory where you want to create your Vue project. Then, run the following command:

```bash
vue create my-vue-project
```

Replace my-vue-project with your preferred project name. This command will prompt you to select a preset. Choose the default preset (default Vue 3 features).

## Step 2: Project Structure

Once the project is created, you'll see a directory structure similar to the following:

```
my-vue-project/
│
├── node_modules/ # Dependencies
│
├── public/ # Public assets
│ ├── favicon.ico # Favicon
│ └── index.html # Main HTML file
│
├── src/ # Source code
│ ├── assets/ # Assets such as images, fonts, etc.
│ ├── components/ # Vue components
│ ├── App.vue # Main Vue component
│ └── main.js # Main entry file
│
├── .gitignore # Git ignore file
├── babel.config.js # Babel configuration
├── package-lock.json # npm package lock file
├── package.json # npm package configuration
├── README.md # Project README
└── vue.config.js # Vue CLI configuration
```

- node_modules/: This directory contains all the dependencies installed for your project.
- public/: This directory holds the static assets of your application, including the index.html file, which serves as the entry point of your app.
- src/: This directory contains the source code of your application.
- assets/: Here, you can place static assets like images, fonts, etc.
- components/: Vue components go here.
- App.vue: This is the main Vue component that serves as the root of your application.
- main.js: This file is the main entry point of your application, where you initialize Vue and mount the main Vue component.
- .gitignore: Specifies intentionally untracked files to ignore when using Git.
- babel.config.js: Babel configuration file for transpiling JavaScript.
- package-lock.json: Automatically generated for any operations where npm modifies either the node_modules tree or package.json.
- package.json: Configuration file for npm, specifying dependencies, scripts, etc.
- README.md: README file for your project.
- vue.config.js: Vue CLI configuration file, which allows you to tweak the webpack configuration and other settings of your Vue project.

## Understanding Vue 3 Concepts: Component Communication, Lifecycle Hooks, and Methods

In Vue 3, several key concepts govern how components interact with each other, manage their lifecycle, and encapsulate logic within themselves. Let's delve into these concepts step by step.

### Component Communication

#### Props

Props allow you to pass data from a parent component to a child component. Here's how to use props:

1. **Parent Component**: Define props in the parent component's template when using the child component:

   ```html
   <template>
     <child-component :message="parentMessage"></child-component>
   </template>

   <script>
   import ChildComponent from './ChildComponent.vue';

   export default {
     components: {
       ChildComponent
     },
     data() {
       return {
         parentMessage: 'Hello from parent'
       };
     }
   }
   </script>
   ```

2. **Child Component**: Declare props in the child component's script section:

   ```html
   <script>
     export default {
       props: ['message']
     }
   </script>```
   ```

#### Events and Custom Events

Events and custom events enable communication from child to parent components. Here's how to emit events from child components:

1. **Child Component**: Define props in the parent component's template when using the child component:

   ```html
   <template>
      <button @click="emitEvent">Click me</button>
   </template>
   <script>
   export default {
     methods: {
       emitEvent() {
         this.$emit('custom-event', eventData);
       }
     }
   }
   </script>
   ```

2. **Parent Component**: Listen for the event and handle it:

  ```html
  <template>
    <child-component @custom-event="handleEvent"></child-component>
  </template>

  <script>
  import ChildComponent from './ChildComponent.vue';

  export default {
    components: {ChildComponent},
    methods: {
      handleEvent(eventData) {
        // Handle the event data
      }
    }
  }
  </script>
   ```

### Component Lifecycle Hooks

Vue components have various lifecycle hooks that allow you to perform actions at specific stages of the component's lifecycle. Here are some common lifecycle hooks:

- beforeCreate: Called synchronously after the instance has just been initialized, before data observation and event/watcher setup.
- created: Called synchronously after the instance is created. At this stage, the instance has finished processing the options.
- mounted: Called synchronously after the instance has been mounted, where el is replaced by the newly created vm.$el.
- updated: Called when a reactive property or computed value has changed, and the component needs to re-render.
- beforeUnmount: Called synchronously immediately before a Vue instance is unmounted.
- unmounted: Called synchronously after a Vue instance has been unmounted.

# Scenario: Lifecycle Hook Observation

## Objective

The objective of this scenario is to understand and observe the behavior of each Vue 3 lifecycle hook by creating a simple Vue component and logging messages at different stages of its lifecycle.

## Steps

1. **Setup Vue Project**:

   - Initialize a new Vue project using Vue CLI.
   - Create a new component named `LifecycleComponent.vue`.

2. **Define Lifecycle Hooks**:

   - In the `LifecycleComponent.vue` file, define the following lifecycle hooks:
     - `beforeCreate`
     - `created`
     - `beforeMount`
     - `mounted`
     - `beforeUpdate`
     - `updated`
     - `beforeUnmount`
     - `unmounted`

3. **Log Messages**:

   - Within each lifecycle hook, log a message indicating the hook has been triggered. For example:

     ```javascript
     beforeCreate() {
       console.log('beforeCreate hook triggered');
     }
     ```

4. **Create an Instance**:

   - Instantiate the `LifecycleComponent` in the `App.vue` file.
   - Render the `LifecycleComponent` within the template of `App.vue`.

5. **Observe Console Output**:

   - Run the Vue development server (`npm run serve`) and open the browser console.
   - Observe the sequence of log messages printed in the console as the component goes through its lifecycle.
   - Take note of the order in which the lifecycle hooks are triggered.

6. **Modify Component Data**:

   - Introduce changes to the component's data or props to trigger updates.
   - Observe how the lifecycle hooks related to updates (`beforeUpdate` and `updated`) are triggered when data changes.

7. **Unmount Component**:
   - Add logic to remove the `LifecycleComponent` instance in the template of `App.vue` using `v-if`.
   - Observe the log messages related to unmounting (`beforeUnmount` and `unmounted`) when the component is removed from the DOM.
