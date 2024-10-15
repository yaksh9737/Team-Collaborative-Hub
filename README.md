# Team Collaborative Hub

A comprehensive collaborative platform designed for teams to enhance communication, task management, and project tracking. This application offers an intuitive interface for team members to collaborate efficiently in real-time.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)


---

## ✨ Features
- **Real-Time Collaboration**: Instant updates and notifications for team activities.
- **Task Management**: Create, update, and delete tasks, assign them to team members, and track progress.
- **User Authentication**: Secure registration and login system with JWT-based authentication.
- **Chat Functionality**: Real-time messaging system for team communication.
- **File Sharing**: Upload and share files among team members.

---

## ️ Tech Stack
**Frontend**:
- React.js
- Tailwind CSS
- Axios

**Backend**:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Socket.IO for real-time communication
- JWT for authentication

---

## Installation

### Frontend
1. Clone the repository:
   ```bash
   git clone https://github.com/yaksh9737/Team-Collaborative-Hub.git
2. Navigate to the frontend directory:
    ```bash
    cd Team-Collaborative-Hub/frontend
3. Install dependencies:
     ```bash
     npm install
4. Start the frontend application:
    ```bash
    npm start
### Backend
1. Navigate to the backend directory:
    ```bash
    cd Team-Collaborative-Hub/frontend
2. Install dependencies:
     ```bash
     npm install
3. Run the backend server:
    ```bash
    npm start
## API Endpoints

### User Authentication

| Method | Endpoint              | Description                        |
|--------|----------------------|------------------------------------|
| POST   | `/api/auth/register` | Register a new user.              |
| POST   | `/api/auth/login`    | Log in a user.                    |

### Task Management

| Method | Endpoint             | Description                        |
|--------|---------------------|------------------------------------|
| GET    | `/api/tasks`        | Retrieve all tasks.               |
| POST   | `/api/tasks`        | Create a new task.                |
| PUT    | `/api/tasks/:id`    | Update a task by ID.              |
| DELETE | `/api/tasks/:id`    | Delete a task by ID.              |

### Chat Functionality

| Method | Endpoint               | Description                              |
|--------|-----------------------|------------------------------------------|
| GET    | `/api/chat/messages`  | Retrieve chat messages.                  |
| POST   | `/api/chat/send`      | Send a new chat message.                 |


## Environment Variables
- Create a .env file in the backend directory and add the following variables:
  ```makeafile
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret

## Testing

To run tests, execute:
```bash
npm test
