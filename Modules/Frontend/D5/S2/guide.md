# D5 S2 : Deploying a Vue Project to Netlify Using CLI

Watch recoded video: https://youtu.be/pC4pgVvyPl8

Deploying your Vue project to Netlify is straightforward and efficient using the Netlify CLI. Here’s a step-by-step guide to help you get started.

## Prerequisites

1. **Netlify Account**
   - Ensure you have a [Netlify account](https://www.netlify.com/).

2. **Node.js and npm**
   - Ensure you have [Node.js](https://nodejs.org/) and npm installed.

3. **Vue Project**
   - Have your Vue project ready for deployment.

## Step-by-Step Guide

### 1. Install Netlify CLI

1. **Install Globally**
   - Install the Netlify CLI globally using npm:
     ```bash
     npm install -g netlify-cli
     ```

### 2. Build Your Vue Project

1. **Build the Project**
   - Run the build command for your Vue project:
     ```bash
     npm run build
     ```
   - This will create a `dist` directory containing the production-ready files.

### 3. Log in to Netlify

1. **Authenticate with Netlify**
   - Log in to your Netlify account using the CLI:
     ```bash
     netlify login
     ```

### 4. Deploy the Project

1. **Initialize a New Site**
   - Navigate to your project directory and initialize a new Netlify site:
     ```bash
     netlify init
     ```

2. **Choose a Configuration**
   - Follow the prompts:
     - Select "Create & configure a new site".
     - Choose the team to deploy the site to.
     - Provide a name for your site or leave it blank to have Netlify generate a random name.
     - Set the build command to `npm run build`.
     - Set the publish directory to `dist`.

3. **Deploy the Site**
   - Deploy your site using the following command:
     ```bash
     netlify deploy --prod
     ```

### 5. Configure Continuous Deployment (Optional)

1. **Link Repository**
   - Link your Git repository to Netlify for continuous deployment:
     ```bash
     netlify link
     ```
   - Follow the prompts to link your repository.

2. **Configure Build Settings**
   - Ensure your build settings are correct on the Netlify dashboard:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Trigger Deploys Automatically**
   - Once linked, Netlify will automatically deploy your site on every push to the repository.

### 6. Verify Deployment

1. **Check the Deployed Site**
   - After deployment, Netlify will provide you with a URL where your site is hosted. You can visit this URL to see your deployed site.

### 7. Manage Site on Netlify Dashboard

1. **Access the Dashboard**
   - Go to the [Netlify dashboard](https://app.netlify.com/) to manage your site, view deployment logs, and configure domain settings.

## Conclusion

By following these steps, you can deploy your Vue project to Netlify using the CLI. Netlify’s powerful features like automatic builds and continuous deployment make it a great choice for hosting your Vue applications.

Enjoy your seamless deployment experience with Netlify!
