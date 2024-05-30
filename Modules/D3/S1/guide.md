# D3 S1: Slots, Form Handling, and Custom Events

Watch recorded class: https://youtu.be/GfqMVFCA84E
## Slots

Slots allow you to compose components and reuse content in different parts of your application.

### Basic Slot

Let's create a `Card` component with a slot:

```html
<!-- Card.vue -->
<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card'
};
</script>
```
You can use this component like this:
```vue
<template>
  <Card>
    <h1>Title</h1>
    <p>This is some content inside the card.</p>
  </Card>
</template>

<script>
import Card from './components/Card.vue';

export default {
  components: {
    Card
  }
};
</script>
```
### Named Slots
You can define named slots for more complex content distribution:
```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```
Usage:
```vue
<template>
  <Card>
    <template v-slot:header>
      <h1>Header Content</h1>
    </template>
    <p>Main content goes here.</p>
    <template v-slot:footer>
      <p>Footer Content</p>
    </template>
  </Card>
</template>
```
## Form Handling
Handling forms in Vue.js is straightforward with the use of `v-model` for two-way data binding.
### Example Form Component

```vue
<!-- FormComponent.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <label for="name">Name:</label>
    <input type="text" v-model="formData.name" id="name" />

    <label for="email">Email:</label>
    <input type="email" v-model="formData.email" id="email" />

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'FormComponent',
  data() {
    return {
      formData: {
        name: '',
        email: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.formData);
      // Perform form submission tasks here
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 8px;
}
input {
  margin-bottom: 16px;
}
button {
  align-self: flex-start;
}
</style>
```
In Vue.js, the `@submit.prevent` directive is used to prevent the default behavior of form submission. By default, when a form is submitted, the browser reloads the page, which can be undesirable in a single-page application (SPA). Using `@submit.prevent` stops this default action, allowing you to handle the form submission in JavaScript without a page reload.

## Custom Events (emit)
Custom events allow child components to communicate with parent components.
### Child Component
```vue
<!-- ChildComponent.vue -->
<template>
  <button @click="sendMessage">Click Me</button>
</template>

<script>
export default {
  name: 'ChildComponent',
  methods: {
    sendMessage() {
      this.$emit('custom-event', 'Hello from Child');
    }
  }
};
</script>

<style scoped>
button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### Parent Component
The parent component listens for the custom event and handles it:
```vue
<template>
  <div>
    <ChildComponent @custom-event="handleCustomEvent" />
  </div>
</template>

<script>
import ChildComponent from './components/ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    handleCustomEvent(message) {
      alert(message);
    }
  }
};
</script>
```
### Passing Multiple Values
You can also emit multiple values with a custom event:
```vue
<!-- ChildComponent.vue -->
<template>
  <button @click="sendData">Send Data</button>
</template>

<script>
export default {
  name: 'ChildComponent',
  methods: {
    sendData() {
      const data = {
        message: 'Hello from Child',
        timestamp: Date.now()
      };
      this.$emit('data-event', data);
    }
  }
};
</script>

<!-- ParentComponent.vue -->
<template>
  <div>
    <ChildComponent @data-event="handleDataEvent" />
  </div>
</template>

<script>
import ChildComponent from './components/ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    handleDataEvent(data) {
      console.log('Received data:', data);
    }
  }
};
</script>
```

## Event Name Convention
When naming custom events, it's a good practice to use kebab-case (hyphen-delimited) for consistency and readability. This convention aligns with the HTML attribute naming style and avoids conflicts with built-in events.
### Examples
- `custom-event`
- `data-event`
- `form-submitted`
- `user-logged-in`
### Example with Convention
```vue
<!-- ChildComponent.vue -->
<template>
  <button @click="submitForm">Submit</button>
</template>

<script>
export default {
  name: 'ChildComponent',
  methods: {
    submitForm() {
      this.$emit('form-submitted', { username: 'user123' });
    }
  }
};
</script>
<!-- ParentComponent.vue -->
<template>
  <div>
    <ChildComponent @form-submitted="onFormSubmitted" />
  </div>
</template>

<script>
import ChildComponent from './components/ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    onFormSubmitted(data) {
      console.log('Form submitted with:', data);
    }
  }
};
</script>
```

