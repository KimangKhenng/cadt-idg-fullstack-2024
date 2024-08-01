# D2 S1 : Running EC2 Instance

In this session, we are going to run a local AWS EC2 using AWS localstack.

Tools needed:
1.  AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
2.  AWS CLI Local: https://github.com/localstack/awscli-local

## Amazon EC2 (Elastic Compute Cloud)

Amazon EC2 is a web service that provides secure, resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers. Here are some key points about EC2:

- **Scalable**: You can increase or decrease the number of instances as needed.
- **Flexible**: Choose from a variety of instance types optimized for different use cases.
- **Cost-Effective**: Pay only for the compute capacity you use.
- **Secure**: Use security groups and other features to secure your instances.

### Key Features

- **Instances**: Virtual servers for running applications.
- **AMI (Amazon Machine Images)**: Pre-configured templates for your instances.
- **Storage**: Different storage options including Elastic Block Store (EBS) and instance storage.
- **Networking**: Connect instances securely using Virtual Private Cloud (VPC).
- **Monitoring**: Use CloudWatch to monitor and manage your instances.

## Security Groups

A security group acts as a virtual firewall for your EC2 instances to control incoming and outgoing traffic. Here are some key points about security groups:

- **Stateful**: Responses to allowed inbound traffic are automatically allowed to flow outbound.
- **Rules**: You can specify rules based on protocol, port number, and source/destination IP addresses.
- **Default Deny**: By default, all inbound traffic is denied and all outbound traffic is allowed.
- **Associated with Instances**: You can assign one or more security groups to an instance.

## Setup EC2 Instance:
### Create a key pair:
This command creates a new key pair named my-key and saves the private key to a file named key.pem. The private key is necessary for securely connecting to your EC2 instances. By storing it in a file, you ensure that you can use it later for SSH access to the instances.

```sh
awslocal ec2 create-key-pair \
    --key-name my-key \
    --query 'KeyMaterial' \
    --output text | tee key.pem
```

Ensure that the key.pem file has appropriate permissions to keep it secure. Typically, you should restrict the file's access so only your user can read it.
```sh
chmod 400 key.pem
```
### Add rules to your security group
```sh
awslocal ec2 authorize-security-group-ingress \
    --group-id default \
    --protocol tcp \
    --port 8000 \
    --cidr 0.0.0.0/0
```
### Run an EC2 instance
You can fetch the Security Group ID using the `DescribeSecurityGroups` API. Run the following command to fetch the Security Group ID:
```sh
awslocal ec2 describe-security-groups
```
You should see the following output:
```json
{
    "SecurityGroups": [
        {
            "Description": "default VPC security group",
            "GroupName": "default",
            ...
            "OwnerId": "000000000000",
            "GroupId": "sg-0372ee3c519883079",
            ...
        }
    ]
}
```
To start your Express Web Server in your locally emulated EC2 instance, you can use the following user script by saving it to a file named `user_script.sh`:
```sh
#!/bin/bash -xeu
apt update
apt install curl -y
apt install git -y
```
You can now run an EC2 instance using the `RunInstances` API. Run the following command to run an EC2 instance by adding the appropriate Security Group ID that we fetched in the previous step:
```sh
awslocal ec2 run-instances \
    --image-id ami-ff0fea8310f3 \
    --count 1 \
    --instance-type t3.nano \
    --key-name my-key \
    --security-group-ids '<SECURITY_GROUP_ID>' \
    --user-data file://./user_script.sh
```

### Test the Express server
You can now open the LocalStack logs to find the IP address of the locally emulated EC2 instance. Run the following command to open the LocalStack logs:
```sh
localstack logs
```
Suppose the output is like this:
```sh
2024-07-31T23:08:14.563  WARN --- [et.reactor-1] l.utils.docker_utils       : Unexpected error when attempting to determine container port status: 
2024-07-31T23:08:15.059  WARN --- [et.reactor-1] l.utils.docker_utils       : Unexpected error when attempting to determine container port status: 
2024-07-31T23:08:15.936  INFO --- [et.reactor-1] l.p.c.s.e.vmmanager.docker : Instance i-e85ff56f9a9683cf2 will be accessible via SSH at: 127.0.0.1:44022, 172.17.0.5:22
2024-07-31T23:08:15.936  INFO --- [et.reactor-1] l.p.c.s.e.vmmanager.docker : Instance i-e85ff56f9a9683cf2 port mappings (container -> host): {'8000/tcp': 49874, '22/tcp': 44022}
```


### SSH into our EC2
The instance is avalible with `127.0.0.1:44022`
```sh
ssh -p 44022 -i key.pem root@127.0.0.1
```

### Install node and run the server
As we are in EC2:
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 18
git clone https://github.com/KimangKhenng/devops-ex
cd devops-ex
npm install 
npm install pm2@latest -g
pm2 node app.js
```
### Accessing web server
We can try to access our web server:
```sh
curl 127.0.0.1:49874
```