# D5 S2 Container Orchestration via Kubernetes (k8s)

Watch video: https://youtu.be/nhhYZfXBWh4

Kubernetes (k8s) is a powerful container orchestration tool that automates the deployment, scaling, and management of containerized applications. This tutorial will guide you through installing Kubernetes on MacOS and Linux, focusing on essential tools: `kubectl`, `minikube`, and `Kind`. Additionally, you'll learn about the Kubernetes architecture and the advantages of using a declarative approach to manage resources.

#### 1. **Installation Guide**

##### **MacOS & Linux**

1. **Install kubectl**:
   ```bash
   brew install kubectl
   ```

2. **Install minikube**:
   ```bash
   brew install minikube
   ```

3. **Install Kind**:
   ```bash
   brew install kind
   ```

#### 2. **Kubernetes Architecture Overview**

![Architecture](https://kubernetes.io/images/docs/kubernetes-cluster-architecture.svg)

Kubernetes follows a master-slave architecture to manage and control the cluster's state and workload distribution. Here's a brief explanation of the key components:

- **Master Node**: The control plane of the cluster that manages worker nodes. It includes:
  - **API Server**: The entry point for all administrative tasks in the Kubernetes cluster. It processes RESTful requests from users, operators, and other components.
  - **etcd**: A key-value store used for storing the configuration and state data of the cluster.
  - **Controller Manager**: Responsible for maintaining the desired state of the cluster by managing controllers that handle different aspects of the cluster, such as replication and node management.
  - **Scheduler**: Assigns workloads (pods) to worker nodes based on resource availability and constraints.

- **Worker Nodes**: The machines where application workloads are run. Each worker node has:
  - **Kubelet**: An agent that ensures the containers in pods are running and healthy according to the specifications provided by the master node.
  - **Kube-proxy**: Maintains network rules on the nodes, allowing network communication between pods across different nodes.
  - **Container Runtime**: The software responsible for running containers. Common examples include Docker and containerd.

- **Pods**: The smallest deployable units in Kubernetes, representing a single instance of a running process in your cluster. A pod can contain one or more containers that share storage and network resources.

#### 3. **Tools Overview**

- **kubectl**: The command-line tool for interacting with Kubernetes clusters. It allows you to deploy applications, inspect and manage cluster resources, and view logs.

- **minikube**: A tool that runs a single-node Kubernetes cluster on your local machine. It's ideal for development and testing.

- **Kind**: Stands for "Kubernetes IN Docker," a tool for running local Kubernetes clusters using Docker containers. It's lightweight and quick to set up, making it great for CI environments or quick local testing.

#### 4. **Getting Started with Minikube**

1. **Start Minikube**:
   ```bash
   minikube start
   ```

2. **Verify the Installation**:
   ```bash
   kubectl get nodes
   ```
   You should see a single node named `minikube`.

3. **Deploy a Sample Application**:
   ```bash
   kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.4
   ```

4. **Expose the Application**:
   ```bash
   kubectl expose deployment hello-minikube --type=NodePort --port=8080
   ```

5. **Access the Application**:
   ```bash
   minikube service hello-minikube
   ```

#### 5. **Getting Started with Kind**

1. **Create a Cluster**:
   ```bash
   kind create cluster
   ```

2. **Verify the Installation**:
   ```bash
   kubectl get nodes
   ```
   You should see a single node named `kind-control-plane`.

3. **Deploy a Sample Application**:
   ```bash
   kubectl create deployment hello-kind --image=nginx
   ```

4. **Expose the Application**:
   ```bash
   kubectl expose deployment hello-kind --port=80 --target-port=80 --type=NodePort
   ```

5. **Access the Application**:
   ```bash
   kubectl port-forward service/hello-kind 8080:80
   ```
   Now, visit `http://localhost:8080` in your browser.

#### 6. **Declarative Approach to Kubernetes**

While the commands shown above are imperative (executed immediately in response to specific commands), Kubernetes also supports a declarative approach, which is often preferred for managing clusters in a consistent and reproducible manner.

**Declarative vs. Imperative**

- **Imperative**: You directly issue commands to modify the cluster state, like `kubectl create deployment`.
- **Declarative**: You define the desired state of your resources in YAML or JSON files and apply them using `kubectl apply -f <file>`. Kubernetes then ensures that the actual state of the cluster matches the desired state specified in these files.

**Example of a Declarative Deployment**:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-declarative
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hello-declarative
  template:
    metadata:
      labels:
        app: hello-declarative
    spec:
      containers:
      - name: hello-declarative
        image: nginx
        ports:
        - containerPort: 80
```

Apply this configuration:
```bash
kubectl apply -f hello-declarative.yaml
```

**Benefits of Declarative Approach**:
- **Version Control**: YAML/JSON files can be stored in version control systems like Git, providing a history of changes.
- **Consistency**: Ensures that the cluster state matches the desired state, even if manual changes are made.
- **Automation**: Ideal for automating deployments and managing configurations across multiple environments.

In Kubernetes (k8s), deployment and service files are used to define how your application is deployed and accessed within a cluster. These files are typically written in YAML and describe the desired state of your application and its networking requirements.

### . **Deployment & Service Explaination**
A Kubernetes Deployment is a resource that helps you manage a set of replicated Pods (containers). It ensures that the desired number of Pods is always running and can automatically replace Pods if they fail.

Here's a basic example of a Deployment YAML file:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-deployment
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app-container
        image: my-app-image:latest
        ports:
        - containerPort: 80
```

**Explanation:**

- `apiVersion: apps/v1`: Specifies the API version of the Kubernetes object.
- `kind: Deployment`: Defines the type of object you're creating, which is a Deployment.
- `metadata`: Contains data that helps identify the object, like `name` and `labels`.
- `spec`: Defines the desired state of the object.
  - `replicas`: The number of desired Pods (in this case, 3).
  - `selector`: Used to select the Pods that belong to this Deployment, based on the `app: my-app` label.
  - `template`: Describes the Pods that will be created.
    - `metadata`: Contains labels that will be assigned to Pods.
    - `spec`: Describes the containers inside each Pod, including the container image and port.

### 2. **Service File**
A Kubernetes Service is an abstraction that defines a logical set of Pods and a policy by which to access them. Services allow your Pods to communicate with each other and with the outside world.

Here's a basic example of a Service YAML file:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

**Explanation:**

- `apiVersion: v1`: Specifies the API version for the Service.
- `kind: Service`: Defines the type of object, which is a Service.
- `metadata`: Contains identifying data like `name`.
- `spec`: Defines the desired state of the Service.
  - `selector`: Matches the Pods to this Service, using the `app: my-app` label.
  - `ports`: Defines the ports that will be exposed by the Service.
    - `protocol`: The network protocol (TCP in this case).
    - `port`: The port on which the Service will be exposed.
    - `targetPort`: The port on the Pod that the traffic will be forwarded to.
  - `type`: Specifies how the Service is exposed. `ClusterIP` means the Service is only accessible within the cluster (default).

### How They Work Together
- The **Deployment** defines how many instances of your application should run, ensuring they are always up and running.
- The **Service** provides a stable network endpoint (a DNS name) that points to the Pods created by the Deployment, allowing other services or users to interact with your application.

