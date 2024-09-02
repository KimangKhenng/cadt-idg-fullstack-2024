# D5 S3 Setting Up Multi-Node Environment for K8S

Watch video: https://youtu.be/6GPH73iSwHQ

### Step 1: Install Docker
1. **Install Docker on all nodes**:
   ```bash
   sudo apt-get update
   sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   sudo apt-get update
   sudo apt-get install -y docker-ce
   sudo systemctl enable docker
   sudo systemctl start docker
   ```

### Step 2: Install kubeadm, kubelet, and kubectl
1. **Install Kubernetes components on all nodes**:
   ```bash
   sudo apt-get update && sudo apt-get install -y apt-transport-https curl
   curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
   cat <<EOF | sudo tee /etc/apt/sources.list.d/kubernetes.list
   deb https://apt.kubernetes.io/ kubernetes-xenial main
   EOF
   sudo apt-get update
   sudo apt-get install -y kubelet kubeadm kubectl
   sudo apt-mark hold kubelet kubeadm kubectl
   ```

### Step 3: Initialize the Control Plane Node
1. **Initialize the Kubernetes control plane on the master node**:
   ```bash
   sudo kubeadm init --pod-network-cidr=192.168.0.0/16
   ```

2. **Set up kubeconfig for kubectl on the control plane**:
   ```bash
   mkdir -p $HOME/.kube
   sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
   sudo chown $(id -u):$(id -g) $HOME/.kube/config
   ```

3. **Install a network plugin (e.g., Calico) on the control plane**:
   ```bash
   kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
   ```

4. **Save the join command output from `kubeadm init`**. You'll need it to join the worker nodes to the cluster.

### Step 4: Join Worker Nodes to the Cluster
1. **Run the join command on each worker node**:
   ```bash
   sudo kubeadm join <control-plane-IP>:<control-plane-port> --token <token> --discovery-token-ca-cert-hash sha256:<hash>
   ```

   Replace `<control-plane-IP>`, `<control-plane-port>`, `<token>`, and `<hash>` with the actual values obtained from the control plane setup.

### Step 5: Verify the Cluster
1. **On the control plane node, verify that all nodes are joined**:
   ```bash
   kubectl get nodes
   ```

   You should see the control plane and the two worker nodes listed with the status `Ready`.

### Step 6: Deploy an Application
1. **Deploy a simple application to verify the setup**:
   ```bash
   kubectl create deployment nginx --image=nginx
   kubectl expose deployment nginx --port=80 --type=NodePort
   ```

2. **Check the service to get the NodePort**:
   ```bash
   kubectl get services
   ```

3. **Access the application using the worker node IP and NodePort**.

### Additional Considerations
- **High Availability**: For a production environment, consider setting up multiple control plane nodes.
- **Storage**: Set up persistent storage using a storage provider.
- **Monitoring**: Implement monitoring solutions like Prometheus and Grafana.
- **Security**: Apply Role-Based Access Control (RBAC) and Network Policies.