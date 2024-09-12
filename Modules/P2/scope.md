# Project 2: Integrating Frontend, Backend ,and DevOps

#### **Project Scope:**
In this module, students will integrate their knowledge of frontend (Vuejs) and backend development with Express and MongoDB with DevOps skills to build and deploy a comprehensive web application. The project will involve designing, developing, and deploying a full-stack application, focusing on applying DevOps practices to automate and streamline the development lifecycle.

#### **Project Requirements:**

1. **Project Overview:**
   - **Application Type:** Develop a RESTful web application using Express.js for the backend and MongoDB for the database and Vuejs for frontend.
   - **Features:**
     - User authentication and authorization (sign-up, login, password reset).
     - CRUD operations for at least one major resource (e.g., blog posts, user profiles).
     - Basic API documentation.
     - Error handling and logging.

2. **DevOps Integration:**
   - **CI/CD Pipeline:** Set up a Continuous Integration and Continuous Deployment (CI/CD) pipeline using tools such as GitHub Actions, Jenkins, or GitLab CI.
     - Automate testing and deployment processes.
     - Ensure the application is automatically deployed to a staging environment upon successful tests.
   - **Containerization:** Containerize the application using Docker.
     - Create Dockerfiles for both the backend and the database.
     - Set up Docker Compose for multi-container orchestration.
   - **Infrastructure Management:**
     - Use Terraform to provision infrastructure for the application (e.g., EC2 instances, VPC, RDS if applicable).
     - Ensure that the infrastructure is reproducible and version-controlled.

3. **Deployment:**
   - **Serve Frontend from Backend:** Serve frontend as static assets from backend to avoid having 2 servers and cors issue.
   - **Cloud Deployment:** Deploy the application to a cloud provider (e.g., AWS, Azure, GCP). Alternatively, students can use LocalStack for cloud emulation.
   - **Domain and SSL:** Configure a custom domain name and SSL certificate for secure communication (if deploying to the cloud).

4. **Documentation:**
   - **Project Documentation:** Provide comprehensive documentation covering:
     - Setup and installation instructions.
     - API endpoints and usage.
     - Deployment steps and configurations.
   - **Code Documentation:** Use comments and documentation generators to describe key parts of the codebase.

5. **Testing:**
   - **Unit Tests:** Write unit tests for the backend code.
   - **Integration Tests:** Ensure the application integrates correctly with the database and other services.

#### **Expectations:**
- **Teamwork:** Collaborate effectively within a team. Share responsibilities and communicate clearly.
- **Code Quality:** Write clean, maintainable code adhering to best practices. Follow the Clean Code Standard for JavaScript: [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript).
- **DevOps Practices:** Demonstrate understanding and application of DevOps practices throughout the project lifecycle.
- **Project Management:** Manage the project timeline effectively, keeping track of milestones and deliverables.
- **Problem-Solving:** Address and resolve issues that arise during development and deployment.

#### **Submission:**
- **Source Code:** Provide access to the source code repository with all relevant branches and commits.
- **Documentation:** Submit the project documentation along with a live demo link or deployment details.
- **Presentation:** Prepare a short presentation or report summarizing the project, its architecture, and the DevOps practices implemented.