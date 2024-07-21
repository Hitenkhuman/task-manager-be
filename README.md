# Task Manager Backend

This is the backend for the Task Manager application. It provides APIs for user authentication and task management. The user authentication APIs include sign in, log in, and Google authentication. The task management APIs provide CRUD (Create, Read, Update, Delete) operations for tasks.

## Getting Started

To get started with Task Manager, make sure you have the following software installed:

- Node.js v18.16.0 or above
- npm v9.5.1 or above
- MongoDB v6 or above

Follow these steps:

1. Clone the repository.
2. Install dependencies by running `npm install`.
3. Clone .env.sample to .env and add your credentials.

## Running the Project

- To execute the code, run the following command `npm run start:dev`.

## Testing

- To run the unit tests, use the command `npm test`.

## API Endpoints

### User Authentication

- `POST /auth/signin`: Sign in a user
- `POST /auth/login`: Log in a user
- `POST /auth/google`: Authenticate a user with Google

### Task Management

- `POST /task`: Create a new task
- `GET /task`: Get all tasks
- `PATCH /task/:id`: Change task status by a task by ID
- `PUT /tasks/:id`: Update a task by ID
- `DELETE /tasks/:id`: Delete a task by ID
