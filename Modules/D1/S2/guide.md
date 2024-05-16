## D1 S2: Creating a Small Project with Vue 3 as Widget (CDN)

In this exercise, you'll apply the concepts you've learned about Vue 3 CDN by creating a small interactive project. Let's build a simple to-do list application.

### Project Overview

The to-do list application should have the following functionalities:

- Display a list of to-do items.
- Allow users to add new to-do items.
- Allow users to mark to-do items as completed or delete them.

### Steps to Implement

1. **Setup:**
   - Create a new directory for your project.
   - Inside the directory, create the following files:
     - `index.html`
     - `app.js`

2. **HTML Setup:**
   - Open `index.html` and set up the basic HTML structure.
   - Include the Vue CDN script and link your `app.js` file.
   - Create input fields and buttons for adding new to-do items:
     ```html
     <input type="text" id="todoInput" v-model="newTodo">
     <button @click="addTodo">Add</button>
     ```
   - Display the list of to-do items:
     ```html
     <ul>
         <li v-for="(todo, index) in todos" :key="index">
             {{ todo }}
             <button @click="completeTodo(index)">Complete</button>
             <button @click="deleteTodo(index)">Delete</button>
         </li>
     </ul>
     ```

3. **Vue Instance and Data Setup:**
   - Open `app.js`.
   - Initialize a Vue instance and define data properties for managing to-do items:
     ```javascript
     const app = Vue.createApp({
         data() {
             return {
                 newTodo: '',
                 todos: []
             };
         }
     });
     ```

4. **Implement Methods:**
   - Implement methods for adding, completing, and deleting to-do items:
     ```javascript
     const app = Vue.createApp({
         data() {
             return {
                 newTodo: '',
                 todos: []
             };
         },
         methods: {
             addTodo() {
                 if (this.newTodo.trim() !== '') {
                     this.todos.push(this.newTodo);
                     this.newTodo = '';
                 }
             },
             completeTodo(index) {
                 this.todos.splice(index, 1);
             },
             deleteTodo(index) {
                 this.todos.splice(index, 1);
             }
         }
     });
     ```

5. **Testing:**
   - Open `index.html` in your browser.
   - Use the input field and "Add" button to add new to-do items.
   - Use the "Complete" button to mark to-do items as completed.
   - Use the "Delete" button to delete to-do items.