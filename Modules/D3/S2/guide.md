# D3 S2: Practice form submission & Advanced Validation

Use the file `register.html` and its style `index.css` to integrate into our `finexo-vue` to create a user registration component and submit the form into our dummy backend.

## Using VeeValidate for Form Validation

### Introduction
VeeValidate is a popular library for form validation in Vue.js applications.

## Installation

First, you need to install VeeValidate and its dependencies:

```bash
npm install vee-validate yup
```
`yup` is a JavaScript schema builder for value parsing and validation, used alongside VeeValidate.

### Basic Setup
Create a Vue 3 component and set up VeeValidate for basic form validation.

### Setting Up VeeValidate
- Import necessary modules from `vee-validate` and `yup`.

- Define the validation schema using `yup`.

- Create the form using VeeForm, Field, and ErrorMessage components.

- Use useForm for form handling and useField for individual field handling.
 ### Example
 ```vue
 <!-- FormComponent.vue -->
<template>
  <VeeForm @submit="handleSubmit">
    <div>
      <label for="name">Name:</label>
      <Field name="name" id="name" />
      <ErrorMessage name="name" />
    </div>

    <div>
      <label for="email">Email:</label>
      <Field name="email" id="email" />
      <ErrorMessage name="email" />
    </div>

    <button type="submit">Submit</button>
  </VeeForm>
</template>

<script>
import { VeeForm, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import * as yup from 'yup';

export default {
  name: 'FormComponent',
  components: {
    VeeForm,
    Field,
    ErrorMessage
  },
  data() {
    return {
      schema: yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Email must be valid').required('Email is required')
      })
    };
  },
  methods: {
    handleSubmit(values) {
      console.log(values);
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
div {
  margin-bottom: 16px;
}
label {
  margin-bottom: 8px;
}
input {
  margin-bottom: 8px;
}
button {
  align-self: flex-start;
}
</style>
 ```

## Advanced Usage
### Custom Validation Rules
You can define custom validation rules if the built-in ones do not meet your needs.
```js
import { defineRule } from 'vee-validate';

defineRule('username', value => {
  if (!value || value.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  return true;
});
```
### Using Custom Validation Rule in the Form
```vue
<!-- FormComponent.vue -->
<template>
  <VeeForm @submit="handleSubmit">
    <div>
      <label for="username">Username:</label>
      <Field name="username" id="username" rules="username" />
      <ErrorMessage name="username" />
    </div>

    <button type="submit">Submit</button>
  </VeeForm>
</template>

<script>
import { VeeForm, Field, ErrorMessage, defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';

defineRule('username', value => {
  if (!value || value.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  return true;
});

export default {
  name: 'FormComponent',
  components: {
    VeeForm,
    Field,
    ErrorMessage
  },
  methods: {
    handleSubmit(values) {
      console.log(values);
      // Perform form submission tasks here
    }
  }
};
</script>
```
### Cross-Field Validation
Assuming you want to create a rule that verifies that a field matches another, like a password confirmation scenario. Because globally defined rules do not have scope access to other values you may have in the component, `vee-validate` sends a third argument to your global validators which is a `ValidationContext` that carries useful information about the form and field being validated.

So assuming you want to build a `confirmed` rule, you would make it configurable by accepting the target field name and you can use the `ValidationContext.form` object to access its value:
```js
import { defineRule } from 'vee-validate';
defineRule('confirmed', (value, [target]) => {
  if (value === target) {
    return true;
  }
  return 'Passwords must match';
});
```
using with `Field`:
```vue
<Form>
  <Field name="password" type="password" />
  <Field name="confirmation" type="password" rules="confirmed:@password" />
</Form>
```
