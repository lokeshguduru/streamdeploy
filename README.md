# StreamDeploy

StreamDeploy is a production-ready DevOps pipeline for deploying a scalable Node.js app on AWS ECS with Terraform, Docker, and GitHub Actions. It showcases cloud engineering and SRE skills through Infrastructure as Code (IaC), CI/CD automation, monitoring, and security best practices.

## Features
- **Infrastructure as Code**: Terraform provisions VPC, ECS, ALB, and IAM roles.
- **CI/CD**: GitHub Actions automates linting, testing, building, and deploying.
- **Containerization**: Dockerized Node.js app with multi-stage builds for efficiency.
- **Monitoring**: CloudWatch for logs and metrics.
- **Security**: Least privilege IAM, secrets management, and secure networking.

## Prerequisites
- AWS account with programmatic access (IAM user with ECS, EC2, ALB, IAM, CloudWatch permissions).
- Terraform (>= 1.5.0) installed locally.
- Docker installed locally.
- Node.js (>= 18.x) installed locally (optional, for non-Docker testing).
- GitHub repository set up with this code.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/lokeshguduru/streamdeploy.git
   cd streamdeploy
   ```

2. **Set Up AWS Credentials**:
   - Create an IAM user in AWS with necessary permissions.
   - Add `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION` (e.g., `us-east-1`) to GitHub Secrets for CI/CD.
   - Optionally, configure AWS CLI locally:
     ```bash
     aws configure
     ```

3. **Test the App Locally** (Optional):
   - Navigate to the app directory and run tests:
     ```bash
     cd app
     npm install
     npm test
     ```
   - Run the app without Docker:
     ```bash
     npm start
     ```
     Test at `http://localhost:3000/health`.

4. **Run the App with Docker**:
   - Build the Docker image:
     ```bash
     docker build -t streamdeploy:latest ./app
     ```
   - Run the container:
     ```bash
     docker run -d -p 3000:3000 streamdeploy:latest
     ```
   - Test at `http://localhost:3000/health` (expect `{"status":"OK","timestamp":"..."}`).

5. **Deploy Infrastructure with Terraform**:
   - Navigate to the Terraform directory:
     ```bash
     cd terraform
     terraform init
     terraform apply
     ```
   - Review the plan and type `yes` to provision the VPC, ECS cluster, ALB, and IAM roles.
   - Note the `alb_dns_name` output for accessing the app later.

6. **Trigger CI/CD Pipeline**:
   - Commit and push changes to the `main` branch:
     ```bash
     git add .
     git commit -m "Update app code"
     git push origin main
     ```
   - GitHub Actions will lint, test, build the Docker image, push to ECR, and deploy to ECS.
   - Monitor the workflow in the GitHub Actions tab.

7. **Access the Deployed App**:
   - Use the `alb_dns_name` from Terraform outputs (e.g., `http://<alb-dns>/health`).
   - Verify the app responds with `{"status":"OK","timestamp":"..."}`.

8. **Monitor Logs**:
   - Check ECS task logs in AWS CloudWatch under `/ecs/streamdeploy`.
   - View ALB metrics in the CloudWatch console.

## Project Structure
```
├── app/                    # Node.js application
│   ├── src/                # Source code
│   │   ├── index.js        # Main app logic
│   │   └── routes.js       # API routes
│   ├── tests/              # Unit tests
│   ├── package.json        # Dependencies
│   ├── Dockerfile          # Docker configuration
│   └── .dockerignore       # Docker ignore rules
├── terraform/              # Infrastructure as Code
│   ├── main.tf             # VPC and networking
│   ├── variables.tf        # Input variables
│   ├── outputs.tf          # Output values
│   ├── ecs.tf              # ECS cluster and service
│   ├── security.tf         # Security groups and IAM
│   ├── alb.tf              # Application Load Balancer
│   └── provider.tf         # AWS provider
├── .github/workflows/      # CI/CD pipeline
│   └── ci-cd.yml           # GitHub Actions workflow
├── scripts/                # Utility scripts
│   └── test-app.sh         # Local test script
├── README.md               # This file
└── .gitignore              # Git ignore rules
```

## Notes
- **AWS Costs**: Deploying to AWS may incur charges. Use a free-tier account and run `terraform destroy` after testing to minimize costs.
- **Local Testing**: The app can be tested locally with Docker or Node.js without AWS, making it easy to verify functionality.
- **Scalability**: The ECS service runs two tasks by default, with health checks for potential auto-scaling.

## Cleanup
To avoid AWS charges, destroy the infrastructure:
```bash
cd terraform
terraform destroy
```
