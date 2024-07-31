# D1 S3 : Testing GitHub Action

Suppose we have `.github/workflows/test.yml`

```yaml
# .github/workflows/test.yml
name: Test API
# When it's trigger
on:
  push:
    branches: main
  pull_request:
    branches: main
# Tasks
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    # To clone code to work on
    - name: Checkout repository
      uses: actions/checkout@v2
    - name: Set up Node.js 18
      uses: actions/setup-node@v2
      with:
        node-version: 18.x
    - name: Install dependencies
      # Use Unix commands
      run: npm install
    - name: Run tests
      run: npm test
```
Initialize a github repository and observe how it runs.
Sample repository with express server: https://github.com/KimangKhenng/devops-ex
