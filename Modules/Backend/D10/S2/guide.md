# D10 S2: Backend Frontend Integration

This week you are going to integrate your already-coded TwitterClone in Vue with Tailwind with our express server learned in the previous weeks.
## How to start?
Here is some steps to start:
1. Use your twitter clone project or use our project from [here](https://github.com/KimangKhenng/tw-clone-frontend)
2. You can either serve your frontend from express server or use `vue-cli-service` to serve your frontend.
3. For 1st option, you can use `express.static` to serve your frontend from express server with the following code:
    ```javascript
    app.use(express.static(path.join(__dirname, 'dist')));
    ```
   Of course, you need to build your frontend first using `npm run build` and `dist` folder will be created.
4. For 2nd option, you can use `vue-cli-service` to serve your frontend with the following code:
    ```bash
    npm run serve
    ```
   However, you need to configure `devServer` in `vue.config.js` to proxy your backend server. Here is an example of `vue.config.js`:
    ```javascript
    module.exports = {
      devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true
          }
        }
      }
    }
    ```
   We set the proxy to `/api` so that all requests to `/api` will be proxied to `http://localhost:3000`. `changeOrigin` is set to `true` to change the origin of the request to match the target URL.
5. Alternatively, you can install `cors` package in your express server and allow all origins with the following code:
    ```javascript
    const cors = require('cors');
    app.use(cors());
    ```
6. You can try request resources from frontend to backend by using `axios` or `fetch` in your frontend. Here is an example of using `axios`:
    ```javascript
    axios.get('/api/tweets')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    ```
## Source code for client and server
You can find client and server with already integrated in:
- [Client](https://github.com/KimangKhenng/tw-clone-frontend)
- [Server](https://github.com/KimangKhenng/web-server)