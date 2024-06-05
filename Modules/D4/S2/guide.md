# D4 S2: File Upload

Watch recorded class:https://youtu.be/MnTM7hfnViA

This tutorial will guide you through the process of implementing a file upload feature in a Vue 3 application. We will cover the basic setup, creating a file input component, handling file selection, and uploading the file to a server.

## Creating the File Upload Component

1. **Generate a new component:**

    In your project directory, create a new file named `FileUpload.vue` inside the `src/components` directory.

2. **Add the basic structure with file extension and size checks:**

    ```vue
    <template>
      <div>
        <input type="file" @change="onFileChange" />
        <button @click="uploadFile">Upload</button>
      </div>
    </template>

    <script>
    import axios from 'axios';

    export default {
      data() {
        return {
          selectedFile: null,
          validExtensions: ['jpg', 'jpeg', 'png', 'gif'],
          maxSize: 2 * 1024 * 1024 // 2 MB
        };
      },
      methods: {
        onFileChange(event) {
          const file = event.target.files[0];
          if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!this.validExtensions.includes(fileExtension)) {
              alert("Invalid file type. Only jpg, jpeg, png, and gif files are allowed.");
              this.selectedFile = null;
              return;
            }
            if (file.size > this.maxSize) {
              alert("File size exceeds the 2 MB limit.");
              this.selectedFile = null;
              return;
            }
            this.selectedFile = file;
          }
        },
        uploadFile() {
          if (!this.selectedFile) {
            alert("Please select a valid file first!");
            return;
          }

          // Create a FormData instance
          const formData = new FormData();
          formData.append('file', this.selectedFile);

          // Make an API request to upload the file using Axios
          axios.post('https://example.com/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            console.log('File uploaded successfully:', response.data);
          })
          .catch(error => {
            console.error('Error uploading file:', error);
          });
        }
      }
    };
    </script>

    <style scoped>
    /* Add your styles here */
    </style>
    ```

### Multiple File Upload
```vue
<template>
  <Form @submit="handleSubmit">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <Field type="email" name="email" :rules="emailRule" v-model="email" />
      <ErrorMessage name="email" class="error" />
      <small id="emailHelp" class="form-text text-muted"
        >We'll never share your email with anyone else.</small
      >
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <Field
        type="password"
        name="password"
        :rules="passwordRule"
        v-model="password"
      />
      <ErrorMessage name="password" class="error" />
    </div>
    <div class="form-group">
      <label>Upload File</label>
      <input type="file" @change="handleFile" ref="fileUpload" multiple />
    </div>
    <button class="btn btn-primary">Submit</button>
  </Form>
</template>
<script>
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
export default {
  components: { Form, Field, ErrorMessage },
  data() {
    return {
      email: "",
      password: "",
      files: [],
      validExtensions: ["pdf", "png", "jpg"],
      maxSize: 300 * 1024 * 1024,
      emailRule: Yup.string().email().required(),
      passwordRule: Yup.string().min(6).required(),
    };
  },
  methods: {
    async handleSubmit() {
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("username", this.username);
      for (let i = 0; i < this.files.length; i++) {
        formData.append("files", this.files[i]);
      }
      const { data } = await axios.post(
        "http://172.23.128.93:3000/upload-multiple",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
    },
    handleFile(event) {
      // Logic to handle file check
      console.log(event.target.files);
      const myLists = [...event.target.files];
      console.log(myLists);
      myLists.forEach((file) => {
        if (file) {
          // check extension
          const fileExtension = file.name.split(".").pop().toLowerCase();
          if (!this.validExtensions.includes(fileExtension)) {
            alert(`${file.name} not allowed`);
            this.$refs.fileUpload.value = "";
          }
          if (file.size > this.maxSize) {
            alert(`${file.name} exceeded file size 2MB`);
            this.$refs.fileUpload.value = "";
          }
          this.files.push(file);
          // this.file = file;
          // console.log(file);
        }
      });
    },
  },
};
</script>
```