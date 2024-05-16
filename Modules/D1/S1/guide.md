# D1 S1: Getting Started with Vue 3 as Widget (CDN)

In this exercise, we'll be using Vue 3 as a CDN to understand some fundamental concepts. Ensure you have a basic understanding of HTML and JavaScript before proceeding.

## Setting Up Vue CDN

1. **Include Vue CDN:**
    - Open your `index.html` file.
    - Add the Vue 3 CDN script just before the closing `</head>` tag:
        ```html
        <head>
            ...
            ...
            <script src="https://unpkg.com/vue@3"></script>
        </head>
        ```
2. **Create `app.js` File:**
    - Create a new file called `app.js` to put your Vue logic.
    - Ensure to include this file in your `index.html` before closing 
    `</body>` tag:
        ```html
        <body>
            ...
            <script src="app.js"></script>
        </body>
        ```

## Understanding Vue Instances

1. **Creating a Vue Instance:**
    - Open your `app.js` file.
    - Initialize a Vue instance:
        ```javascript
        const app = Vue.createApp({
            // Options will go here
        });
        ```

## Template Syntax and Directives

1. **Writing Templates in Vue Instance:**

    When writing templates within the Vue instance, you define the HTML structure directly within the JavaScript code. 
    ```javascript
    const app = Vue.createApp({
    template: `
        <div>
            <h1>Hello, Vue!</h1>
            <p>{{ message }}</p>
        </div>
            `,
        data() {
            return {
                message: 'Welcome to Vue!'
            };
        }
    });
    app.mount('#app');
    ```
2. **Writing Templates in index.html File**

    Alternatively, you can write the template directly within the index.html file by using the Vue directives directly in your HTML.
    ```html
    <div id="app">
        <h1>Hello, Vue!</h1>
        <p>{{ message }}</p>
    </div>
    <script>
    const app = Vue.createApp({
        data() {
            return {
                message: 'Welcome to Vue!'
            };
        }
    });
    app.mount('#app');
    </script>
    ```
3. **Binding Data:**
    - Inside the Vue instance in `app.js`, define a `data` property with some values:
        ```javascript
        const app = Vue.createApp({
            data() {
                return {
                    message: 'Hello, Vue!'
                }
            }
        });
        ```
    - In your HTML, use double curly braces `{{ }}` to bind the data:
        ```html
        <h2>{{ message }}</h2>
        ```

4. **Using Directives:**
    - Add an input field to your HTML:
        ```html
        <input type="text" v-model="message">
        ```
    - This binds the input field's value to the `message` data property. Try changing the input value and see how it affects the displayed message.

## Handling User Input with v-model

1. **Creating Reactive Forms:**
    - Inside `app.js`, add another data property for form handling:
        ```javascript
        const app = Vue.createApp({
            data() {
                return {
                    userInput: ''
                }
            }
        });
        ```
    - Bind this property to an input field:
        ```html
        <input type="text" v-model="userInput">
        ```

## Handling Mouse Events

1. **Mouse Event Handling:**
    - Inside `app.js`, define methods to handle mouse events:
        ```javascript
        const app = Vue.createApp({
            data() {
                return {
                    counter: 0
                }
            },
            methods: {
                increment() {
                    this.counter++;
                },
                decrement() {
                    this.counter--;
                }
            }
        });
        ```
    - Bind these methods to HTML elements:
        ```html
        <button @click="increment">Increment</button>
        <button @click="decrement">Decrement</button>
        ```
    - This will increment or decrement the `counter` data property based on the button clicks.






