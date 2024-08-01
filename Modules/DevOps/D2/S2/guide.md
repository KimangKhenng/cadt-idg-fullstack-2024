# D2 S2 : Using Github Action to access EC2

## Setup Workflow

Create `ec2.yml`
```yml
name: CI/CD to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up SSH agent
      uses: webfactory/ssh-agent@v0.5.3
      with:
        ssh-private-key: ${{ secrets.EC2_KEY }}

    - name: Run deployment script on EC2
      env:
        EC2_HOST: ${{ secrets.EC2_HOST }}
        EC2_USER: ${{ secrets.EC2_USER }}
        EC2_SSH_PORT: ${{ secrets.EC2_SSH_PORT }}
      run: |
        ssh -p $EC2_SSH_PORT -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST << 'EOF'
          set -e # Exit immediately if a command exits with a non-zero status
          echo "Pulling latest changes from git repository"
          cd /devops-ex
          git pull origin main
          echo "Installing dependencies"
          npm install
          echo "Building the application"
          pm2 restart all
        EOF

```

## Running the workflow locally
1. Copy the `key` of EC2 into project folder (Don't forget to git ignore it)
2. Suppose the localstack log is 
```sh
2024-07-31T22:50:23.029  INFO --- [et.reactor-0] l.p.c.s.e.vmmanager.docker : Instance i-0801bb39449e7b820 will be accessible via SSH at: 127.0.0.1:12717, 172.17.0.4:22
2024-07-31T22:50:23.029  INFO --- [et.reactor-0] l.p.c.s.e.vmmanager.docker : Instance i-0801bb39449e7b820 port mappings (container -> host): {'8000/tcp': 35598, '22/tcp': 12717}
```
We can run the test by: 
```sh
act -s EC2_KEY="$(cat kimang-key.pem)" -s EC2_HOST=127.0.0.1 -s EC2_USER=root -s EC2_SSH_PORT=12717
```