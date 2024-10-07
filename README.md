# YouTube URL Saver Application

This is a full-stack CRUD application that allows users to save, list, retrieve, and delete YouTube URLs. The project is divided into two parts: a **frontend** (built with Next.js) and a **backend** (built with FastAPI).

## Features

- **Insert** and store YouTube URLs with associated names.
- **List** saved YouTube URLs.
- **Retrieve** a YouTube URL and display it via an embedded video player.
- **Delete** saved YouTube URLs.

## Improvements & Future Evolutions

- Implement authentication to associate links with individual users.
- Add unit tests for backend API routes.
- Expand pagination functionality with search and filtering options.

---

## Frontend (Next.js)

The frontend is a Next.js application that provides a user interface for interacting with the backend. It includes form components for adding YouTube URLs and displaying them in a card format.

### Technologies Used

- **Next.js**: React framework with server-side rendering.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Cypress**: End-to-end testing framework for UI tests.
- **Jest**: Testing framework for unit and integration tests.
- **Zustand**: State management library.

## Backend (FastAPI)

### Technologies Used

- **FastAPI**: Python-based web framework for building APIs.
- **PostgreSQL**: Relational database for storing YouTube link data.
- **Alembic**: Database migrations for managing schema changes.
- **Docker**: Containerization platform to run services.

### API Endpoints

The following API endpoints are available:

- **GET /links/**: List all saved YouTube links (with pagination support).
- **GET /links/{id}**: Retrieve a specific YouTube link by its ID.
- **POST /links/**: Create a new YouTube link.
- **DELETE /links/{id}**: Delete a YouTube link by its ID.

---

### Running the Application with Docker Compose

To run the backend and associated services (PostgreSQL) using Docker Compose:

```bash
docker-compose up --build
```

### Making Database Migrations

To create new database migrations after model changes:

```bash
alembic revision --autogenerate -m "name"
```

- To apply migrations to the database:

```bash
  alembic upgrade head
```

### Important Notes

- Ensure your `.env` files are correctly configured with the appropriate credentials and URLs for both backend and frontend.
- Apply database migrations using Alembic.

## Deployment

This is a simple guide to deploy the **YouTube URL Saver** application (Frontend, Backend, and PostgreSQL) using Docker Compose.

## Steps to Deploy on AWS

### 1. **Launch an EC2 Instance**
   - Log into your AWS Console and navigate to the **EC2** service.
   - Launch a new EC2 instance using an **Ubuntu** or **Amazon Linux 2** AMI (Amazon Machine Image).
   - Choose an instance type (e.g., **t2.micro** for a free-tier instance or **t3.medium** for more traffic).
   - Configure security groups to allow traffic on:
     - **Port 22** (for SSH access).
     - **Port 80** (for HTTP traffic).
     - **Port 443** (for HTTPS traffic, if applicable).
     - **Port 3000** (for your Next.js app).
     - **Port 8000** (for your FastAPI backend).
     - **Port 5432** (for PostgreSQL, if using inside Docker).

### 2. **Install Docker and Docker Compose**
   - SSH into your EC2 instance.
   - Install Docker and Docker Compose on the EC2 instance. These tools are necessary to containerize and manage your application services (Frontend, Backend, PostgreSQL).

### 3. **Clone the Repository**
   - Clone your project repository from GitHub (or your chosen version control platform) to the EC2 instance.
   - Navigate to the project directory.

### 4. **Set Up Environment Variables**
   - Create `.env` files for the backend and frontend to configure the database connection and API URLs.
   - For example, set `DATABASE_URL` in the backend and `NEXT_PUBLIC_API_URL` in the frontend.
   - If using **RDS**, make sure the `DATABASE_URL` points to your RDS instance.

### 5. **Run the Application with Docker Compose**
   - Use Docker Compose to build and run the services (Frontend, Backend, and PostgreSQL) on the EC2 instance.
   - This will start:
     - The Next.js frontend on port `3000`.
     - The FastAPI backend on port `8000`.
     - PostgreSQL on port `5432` (if using a containerized version).

### 6. **Configure PostgreSQL (If Using RDS)**
   - If using **RDS** for PostgreSQL, set up an RDS instance with PostgreSQL and configure the security group to allow access from the EC2 instance.
   - Update your backend `.env` file to point to the RDS instance as the database.

### 7. **Apply Database Migrations**
   - After setting up PostgreSQL (whether containerized or via RDS), apply the database migrations using Alembic.
   - This ensures that your database schema is ready for the application to run.

### 8. **Configure a Reverse Proxy with Nginx (Optional)**
   - Install **Nginx** on your EC2 instance.
   - Configure Nginx to serve as a reverse proxy, directing traffic to your frontend and backend services running on Docker.
   - Optionally, use **Certbot** to set up SSL certificates for HTTPS.

### 9. **Set Up Monitoring and Scaling (Optional)**
   - Configure **AWS CloudWatch** to monitor the health and performance of your EC2 instance.
   - Optionally, set up an **Auto Scaling Group** if you expect the need for horizontal scaling.

### 10. **Configure Domain (Optional)**
   - If using a custom domain, configure **AWS Route 53** to point your domain to your EC2 instance.
   - Set up DNS records (A, CNAME, etc.) to map the domain to the IP of your EC2 instance.

---

## Summary of Services Needed

1. **EC2**: For hosting the Dockerized application (Frontend, Backend, and optionally PostgreSQL).
2. **ECR (Optional)**: For storing Docker images if you're using a CI/CD pipeline with AWS.
3. **RDS (Optional)**: For a managed PostgreSQL database in production.
4. **S3 (Optional)**: For static file storage (if needed).
5. **Route 53 (Optional)**: For managing a custom domain name and routing traffic.
6. **CloudWatch (Optional)**: For monitoring the health and performance of your application.

---

## Final Steps

Once your application is running:
- Test the frontend by visiting the EC2 public IP or your domain on port `3000`.
- Test the backend API by visiting the EC2 public IP or your domain on port `8000`.
- Monitor performance and logs using AWS CloudWatch (if enabled).
- Secure the application using HTTPS via Nginx and Certbot (optional).