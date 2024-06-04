# D4 S2: File Upload

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

