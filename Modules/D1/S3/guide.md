## D1 S3 More on Events

Welcome to the FullStack BootCamp D3! In this comprehensive guide, you will learn and practice various concepts in Vue 3, including Mouse Over event, Mouse Leave event, Double Click event, Mouse Move event, and Attribute Binding. Let's dive into each concept step by step.

Open your `index.html` and `app.js` files, and modify accordingly.

### Mouse Over Event

The mouseover event occurs when the mouse pointer enters the element. In Vue 3, you can handle this event using the @mouseover directive.
```html
<div @mouseover="handleMouseOver">Hover over me</div>
```
```javascript
const app = Vue.createApp({
    methods: {
        handleMouseOver() {
            console.log('Mouse over event occurred!');
        }
    }
});
```

### Mouse Leave Event

The mouseleave event occurs when the mouse pointer leaves the element. In Vue 3, you can handle this event using the @mouseleave directive.
```html
<div @mouseleave="handleMouseLeave">Mouse Leave me</div>
```
```javascript
const app = Vue.createApp({
    methods: {
        handleMouseLeave() {
            console.log('Mouse leave event occurred!');
        }
    }
});
```

### Double Click Event

The dblclick event occurs when the user double-clicks on an element. In Vue 3, you can handle this event using the @dblclick directive.
```html
<div @dblclick="handleDoubleClick">Double click me</div>
```
```javascript
const app = Vue.createApp({
    methods: {
        handleDoubleClick() {
            console.log('Double click event occurred!');
        }
    }
});
```
### Mouse Move Event

The mousemove event occurs when the mouse pointer is moved over an element. In Vue 3, you can handle this event using the @mousemove directive.

```html
<div @mousemove="handleMouseMove">Move mouse over me</div>
```
```javascript
const app = Vue.createApp({
    methods: {
        handleMouseMove() {
            console.log('Mouse move event occurred!');
        }
    }
});
```

### Attribute Binding
Attribute binding allows you to dynamically update HTML attributes based on Vue data.

#### a tag:
```html
<a :href="link">Click me</a>
```
```javascript
const app = Vue.createApp({
    data() {
        return {
            link: 'https://www.tfdevs.com'
        }
    }
});
```

#### image tag:
```html
<img :src="book.image" :alt="book.title" v-for="(book, index) in books" :key="index">
```
```javascript
const app = Vue.createApp({
    data() {
        return {
            books: [
                { title: 'Book 1', image: 'assets/book1.jpg' },
                { title: 'Book 2', image: 'assets/book2.jpg' },
                { title: 'Book 3', image: 'assets/book3.jpg' }
            ]
        }
    }
});
```