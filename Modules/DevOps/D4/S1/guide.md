# D4 S1 Ansible Tutorial: Getting Started with EC2

Watch recorded video: https://youtu.be/6exmlKv-1kc

This tutorial will guide you through the process of using Ansible to manage and automate tasks on your EC2 instances. We'll assume you already have an EC2 instance running and an SSH key ready for access.

## Prerequisites

- **Ansible** installed on your local machine. You can install it using:
  
  ```bash
  sudo apt update
  sudo apt install ansible -y
  ```
  
  or, on macOS:

  ```bash
  brew install ansible
  ```

- **Python** installed on your local machine (Ansible is written in Python).
- **SSH key** that can access your EC2 instance.
- **EC2 instance** running in AWS.

## Step 1: Set Up Your Inventory File

Ansible uses an inventory file to define the servers it manages. Create an inventory file named `hosts.ini` in your project directory:

```ini
[ec2]
your-ec2-instance-public-ip ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/your-key.pem
```

Replace `your-ec2-instance-public-ip` with your EC2 instance's public IP address, and `~/.ssh/your-key.pem` with the path to your SSH private key.

## Step 2: Test Your Connection

Before running any playbooks, ensure that Ansible can connect to your EC2 instance:

```bash
ansible -i hosts.ini ec2 -m ping
```

If everything is set up correctly, you should see a response like:

```yaml
your-ec2-instance-public-ip | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

## Step 3: Write a Simple Playbook

Ansible uses playbooks written in YAML format to define automation tasks. Let's create a simple playbook named `setup.yml` to update the package list and install `nginx` on your EC2 instance:

```yaml
---
- name: Setup EC2 instance
  hosts: ec2
  become: yes
  tasks:
    - name: Update APT package list
      apt:
        update_cache: yes

    - name: Install Nginx
      apt:
        name: nginx
        state: present
```

## Step 4: Run Your Playbook

Execute the playbook to automate tasks on your EC2 instance:

```bash
ansible-playbook -i hosts.ini setup.yml
```

Ansible will connect to the EC2 instance, update the package list, and install `nginx`.

## Step 5: Verify the Nginx Installation

After the playbook runs successfully, verify that `nginx` is installed and running:

1. SSH into your EC2 instance:

   ```bash
   ssh -i ~/.ssh/your-key.pem ubuntu@your-ec2-instance-public-ip
   ```

2. Check the status of `nginx`:

   ```bash
   sudo systemctl status nginx
   ```

   You should see that `nginx` is active and running.

## Conclusion

You've successfully used Ansible to manage an EC2 instance. You can now expand your playbooks to perform more complex automation tasks, such as deploying applications, configuring environments, and more.

### Additional Resources

- [Ansible Documentation](https://docs.ansible.com/)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/index.html)

---

## Updating the Configuration

If you update the configuration in your Ansible playbook or the inventory file, you can simply re-run the playbook to apply the changes. Ansible is idempotent, meaning it will only make changes if necessary to achieve the desired state. Here’s how to handle updates:

### 1. Update the Playbook

Suppose you want to add a new configuration to your EC2 instance, like installing `git` alongside `nginx`. You can update your `setup.yml` playbook as follows:

```yaml
---
- name: Setup EC2 instance
  hosts: ec2
  become: yes
  tasks:
    - name: Update APT package list
      apt:
        update_cache: yes

    - name: Install Nginx
      apt:
        name: nginx
        state: present

    - name: Install Git
      apt:
        name: git
        state: present
```

### 2. Re-run the Playbook

After updating the playbook, run the following command to apply the new configuration:

```bash
ansible-playbook -i hosts.ini setup.yml
```

Ansible will check the current state of the EC2 instance and only install `git` if it is not already installed. If `nginx` is already installed, it won’t try to reinstall it.

### 3. Verify the Update

Once the playbook has run successfully, you can verify the changes by SSHing into your EC2 instance and checking if `git` is installed:

```bash
ssh -i ~/.ssh/your-key.pem ubuntu@your-ec2-instance-public-ip
```

Then, check if `git` is installed:

```bash
git --version
```

You should see the version of `git` installed on your system.

### Important Notes

- **Idempotency:** Ansible ensures that each task in your playbook only runs if the desired state is not already met. This prevents unnecessary changes.
  
- **Rolling Back Changes:** If you need to roll back a configuration change, you can modify the playbook to remove or update the relevant tasks, then re-run it. For example, to remove `nginx`, you would change its `state` to `absent` in the playbook.

### Conclusion

Updating your configuration with Ansible is straightforward. Just modify your playbook to reflect the desired state and re-run it. Ansible will take care of the rest, ensuring that your EC2 instance matches the new configuration.

---

## Removing Nginx Using Ansible

If you update your Ansible playbook to remove `nginx` from the configuration, Ansible can indeed automatically remove `nginx` from your EC2 instance. You just need to explicitly tell Ansible to ensure `nginx` is absent.

### 1. Update the Playbook to Remove Nginx

Modify your playbook to ensure that `nginx` is removed by changing its `state` to `absent`:

```yaml
---
- name: Setup EC2 instance
  hosts: ec2
  become: yes
  tasks:
    - name: Update APT package list
      apt:
        update_cache: yes

    - name: Remove Nginx
      apt:
        name: nginx
        state: absent

    - name: Install Git
      apt:
        name: git
        state: present
```

### 2. Re-run the Playbook

Execute the updated playbook:

```bash
ansible-playbook -i hosts.ini setup.yml
```

Ansible will connect to your EC2 instance, uninstall `nginx`, and ensure that `git` is installed.

### 3. Verify Nginx Removal

After running the playbook, you can verify that `nginx` has been removed:

1. SSH into your EC2 instance:

   ```bash
   ssh -i ~/.ssh/your-key.pem ubuntu@your-ec2-instance-public-ip
   ```

2. Check if `nginx` is still installed:

   ```bash
   dpkg -l | grep nginx
   ```

   If `nginx` has been successfully removed, this command should not return any output.

### Important Considerations

- **Idempotency:** Ansible will only remove `nginx` if it is currently installed. If `nginx` is not present, the task will do nothing.
- **Dependencies:** Be cautious if other applications on your server depend on `nginx`. Removing it might affect other services. Always ensure that removal does not break other configurations.
- **Cleanup:** When removing software like `nginx`, you might also want to remove associated configuration files or directories. You can add additional tasks to clean up these files.