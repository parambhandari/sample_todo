# Collaborative Todo List Web Application

This is a real-time collaborative Todo List web application built with React, Node.js, Redux, and WebSockets. It allows multiple users to manage tasks collaboratively in real-time.

## Features

- **Real-time Task Updates:** Tasks are updated in real-time for all connected users via WebSocket.
- **Task Management:** Users can add, update, and delete tasks.
- **User Authentication:** Users can sign up, log in, and manage their accounts.
- **Offline Mode:** Local changes are queued for synchronization when offline.
- **Activity Logging:** View activity logs for each user.
- **Responsive UI:** Mobile-friendly and easy-to-use interface.

## Tech Stack

### Frontend
- **React:** JavaScript library for building user interfaces.
- **Redux:** For state management.
- **Material-UI:** For UI components.
- **WebSocket:** For real-time updates.

### Backend
- **Node.js:** JavaScript runtime used for the server.
- **Express:** Web framework for Node.js.
- **MongoDB:** NoSQL database for storing user and task data.
- **WebSocket:** For handling real-time communication between clients and the server.

## Installation

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/parambhandari/sample_todo.git
   
2. Navigate to the frontend directory: cd frontend
3. Install dependencies:npm install
4. Run the frontend:npm start

### Backend

1. Navigate to the backend directory:cd backend
2. Install dependencies:npm install
3. Set up your environment variables in a .env file:
PORT=your_port
MONGO_URI=your_mongo_db_uri
JWT_TOKEN=your_jwt_secret_key
4. Run the backend:npm start




