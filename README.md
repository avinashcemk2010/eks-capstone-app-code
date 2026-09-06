# Application Repository (`app`)

This repository contains the source code for the **Python FastAPI Backend**, **Angular Frontend**, and **AWS CodeBuild** build files.

---

## Step 1: Run the Backend Microservice Locally

- **Intention**: Start the Python backend server on your computer so it can process greeting requests.
- **Command**:
  ```bash
  cd backend
  pip install -r requirements.txt
  uvicorn main:app --host 0.0.0.0 --port 8000
  ```
- **Verification command**:
  ```bash
  curl "http://localhost:8000/api/hello?name=Alice"
  ```
  *Expected Output*: `{"message":"hello Alice"}`

---

## Step 2: Build and Test the Backend Docker Image

- **Intention**: Package the backend code into a isolated Docker container to ensure it packages cleanly.
- **Command**:
  ```bash
  cd backend
  docker build -t hello-backend:local .
  docker run -d -p 8000:8000 --name backend-container hello-backend:local
  ```
- **Verification command**:
  ```bash
  docker ps --filter "name=backend-container"
  ```
  *Expected Output*: You will see `backend-container` listed with status `Up`.

---

## Step 3: Run the Frontend Microservice Locally

- **Intention**: Start the Angular website interface on your computer.
- **Command**:
  ```bash
  cd frontend
  npm install
  npm start
  ```
- **Verification command**:
  Open your web browser and navigate to: `http://localhost:4200`
  *Expected Output*: You will see the "Hello World App" webpage with a text box.

---

## Step 4: Build and Test the Frontend Docker Image

- **Intention**: Package the Angular website into a lightweight Nginx web server container.
- **Command**:
  ```bash
  cd frontend
  docker build -t hello-frontend:local .
  docker run -d -p 80:80 --name frontend-container hello-frontend:local
  ```
- **Verification command**:
  ```bash
  docker ps --filter "name=frontend-container"
  ```
  *Expected Output*: You will see `frontend-container` listed with status `Up`.

---

## Step 5: Trigger AWS CodeBuild Pipeline (Frontend or Backend)

- **Intention**: Automatically build new Docker images in AWS CodeBuild and push them to Amazon ECR.
- **Command**:
  ```bash
  # Trigger Frontend Build Pipeline
  aws codebuild start-build --project-name hello-frontend-build --region us-east-1

  # Trigger Backend Build Pipeline
  aws codebuild start-build --project-name hello-backend-build --region us-east-1
  ```
- **Verification command**:
  ```bash
  aws codebuild batch-get-builds --ids hello-frontend-build:8a3b2c1d-4e5f-6a7b-8c9d-0e1f2a3b4c5d --query "builds[0].buildStatus" --output text
  ```
  *Expected Output*: `SUCCEEDED`
