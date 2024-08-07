# D3 S2 : Multiple Runner in Github Action

We can set job dependencies on jobs in Github action to make them execute in order by using `needs`:
```yml
name: CI/CD to EC2
on:
  push:
    branches:
      - test
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
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
    .
    .
    .
```