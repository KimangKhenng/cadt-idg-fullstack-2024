# D2 S3 : Provisioning EC2 with Terraform

Terrafrom is a well known tools for IaC (Infrastructure as Code) which manage and maintain cloud infrastcture.

## Insatll Terraform CLI: 
```sh
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```
Then install Terraform Local: 
https://formulae.brew.sh/formula/terraform-local

## Provision S3 Bucket to hold Terraform's state configuration
```sh
awslocal s3api create-bucket --bucket tf-state
```
On successful creation of the S3 bucket, you will see the following output:
```json
{
    "Buckets": [
        {
            "Name": "tf-state",
            "CreationDate": "2023-07-18T06:36:25+00:00"
        }
    ],
    "Owner": {
        "DisplayName": "chaudara",
        "ID": "75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a"
    }
}
```
## Configure S3 as Backend
Create a new folder `tf` and a file named `backend.tf` and add a minimal S3 bucket configuration to it. The following contents should be added in the `backend.tf` file:
```tf
terraform {
  backend "s3" {
    bucket = "tf-state"
    key    = "tf"
    region = "us-east-1"
  }
}
```
## Migrate security group from Localstack
Since localstack only support `default security group`, we need to transfer control of the group to `terraform`
Make sure we have written the reource configuration for app's port:
```tf
resource "aws_security_group" "sg_1" {
  name = "default"

  ingress {
    description = "App Port"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```
Then we can run
```sh
tflocal import aws_security_group.sg_1 sg-166aa6d6335d17596
```
## Provisioning EC2 
Before provisioning, we also need to generate our own key-pair to access `ec2` later.
```sh
ssh-keygen -t rsa -b 2048 -f kimang-key
```
Create a file inside `tf` as `main.tf`. 
```tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "sg_1" {
  name = "default"

  ingress {
    description = "App Port"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_key_pair" "kimang_key" {
  key_name   = "kimang-key"
  public_key = "your own rsa key"
}

resource "aws_instance" "server_1" {
  ami  = "ami-ff0fea8310f3"
  instance_type = "t3.micro"
  count = 2
  key_name = aws_key_pair.kimang_key.key_name
  security_groups = [aws_security_group.sg_1.name]
  user_data = <<-EOF
              #!/bin/bash
              apt update
              apt install git -y
              apt install curl -y

              # Install NVM
              curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
              . ~/.nvm/nvm.sh

              # Install Node.js 18
              nvm install 18

              # Install PM2
              npm install pm2 -g

              # Clone Node.js repository
              git clone https://github.com/KimangKhenng/devops-ex /root/devops-ex

              # Navigate to the repository and start the app with PM2
              cd /root/devops-ex
              npm install
              pm2 start app.js --name node-app -- -p 8000
            EOF
  user_data_replace_on_change = true
}
```
## Planing and Applying
Planning will display the infrastructure to be modified or created.
First we need to change directory to `tf` folder (`cd tf`)
```sh
tflocal plan
``` 
Then we can apply to create the infrastructure
```sh
tflocal apply
```

## Showing existing infrastructure
```sh
tflocal show
```

## Destroying infrastructure
Terraform can also be used destroy the infrastucture
```sh
tflocal destroy
```