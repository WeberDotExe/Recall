# 🚀 Recall

Recall is a production-ready MERN Notes API designed with scalability, security, and clean architecture in mind. It allows users to securely manage personal notes through a RESTful API featuring JWT authentication, refresh tokens, validation, logging, API documentation, and cloud deployment.

This project is being developed as a portfolio-quality full-stack application following real-world software engineering practices rather than tutorial-style implementation.

---

# ✨ Features

## Authentication

* User Registration
* User Login
* JWT Access Token Authentication
* Refresh Token Authentication
* Secure Logout
* Protected Routes

## Notes Management

* Create Notes
* View All Notes
* View Single Note
* Update Notes
* Delete Notes

## Additional Features

* Search Notes
* Pagination
* Sorting
* Input Validation
* Global Error Handling

## Security

* JWT Authentication
* Password Hashing (bcrypt)
* Helmet
* CORS
* HTTP-only Refresh Token Cookies
* Rate Limiting
* Request Validation using Zod

## Production Features

* MongoDB Atlas
* Render Deployment
* Swagger API Documentation
* Structured Logging using Pino
* Environment Variable Management
* Clean Folder Architecture

---

# 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Authentication

* JWT
* bcrypt

### Validation

* Zod

### Security

* Helmet
* Express Rate Limit
* Cookie Parser
* CORS

### Logging

* Pino
* pino-http

### Documentation

* Swagger UI
* swagger-jsdoc

### Deployment

* Render
* GitHub

---

# 📁 Project Structure

```text
Recall/
│
├── Backend/
│   ├── server.js
│   │
│   ├── src/
│   │   ├── app.js
│   │   │
│   │   ├── config/
│   │   │   ├── db.config.js
│   │   │   ├── logger.js
│   │   │   └── swagger.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── note.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── logger.middleware.js
│   │   │   ├── rateLimit.middleware.js
│   │   │   └── validate.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── notes.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── note.routes.js
│   │   │
│   │   ├── utils/
│   │   │   ├── apiError.js
│   │   │   ├── asyncHandler.js
│   │   │   ├── cookieOptions.js
│   │   │   └── generateTokens.js
│   │   │
│   │   └── validations/
│   │       ├── auth.validation.js
│   │       └── note.validation.js
│   │
│   └── package.json
│
└── Frontend/ (Coming Soon)
```

---

# 🏗 Architecture

The backend follows a layered architecture to keep responsibilities separated.

* **Routes** define API endpoints.
* **Middleware** handles authentication, validation, logging, and security.
* **Controllers** contain business logic.
* **Models** manage database interaction.
* **Utilities** provide reusable helper functions.
* **Config** centralizes application configuration.

---

# 🔐 Authentication Flow

1. User logs in.
2. Server verifies credentials.
3. Access Token is generated and returned.
4. Refresh Token is stored as an HTTP-only cookie.
5. Protected APIs require a valid Access Token.
6. When the Access Token expires, the Refresh Token is used to obtain a new Access Token.
7. Logout clears the Refresh Token and invalidates the session.

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/api/auth/register` | Register a new user       |
| POST   | `/api/auth/login`    | Login                     |
| POST   | `/api/auth/refresh`  | Generate new access token |
| POST   | `/api/auth/logout`   | Logout                    |

---

## Notes

| Method | Endpoint        | Description     |
| ------ | --------------- | --------------- |
| POST   | `/api/note`     | Create note     |
| GET    | `/api/note`     | Get all notes   |
| GET    | `/api/note/:id` | Get single note |
| PATCH  | `/api/note/:id` | Update note     |
| DELETE | `/api/note/:id` | Delete note     |

---

# 📖 API Documentation

Swagger documentation is available in both local and production environments.

Local:

`http://localhost:5000/api-docs`

Production:

`<your-render-url>/api-docs`

---

# ⚙ Environment Variables

Create a `.env` file inside the Backend directory.

```env
PORT=

MONGO_URI=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRE=

JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRE=

CLIENT_URL=

SERVER_URL=
```

---

# 🚀 Running Locally

Clone the repository

```bash
git clone <repository-url>
```

Move into the backend

```bash
cd Recall/Backend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

# 🌍 Deployment

Backend is deployed using **Render**.

Database is hosted on **MongoDB Atlas**.

Source code is managed using **GitHub**.

Frontend will be deployed on **Vercel**.

---

# 📌 Current Status

### Backend

* ✅ Complete

### Frontend

* 🚧 In Development

---

# 🔮 Future Improvements

* React Frontend
* Rich Text Editor
* Note Categories
* File Attachments
* Dark Mode
* Profile Management
* Password Reset
* Email Verification
* Automated Testing
* CI/CD Pipeline
* Docker Support
* Redis Caching
* Monitoring & Observability

---

# 👨‍💻 Author

**Taufique Chaudhary**

Backend & Full-Stack Software Engineering Portfolio Project

Built with a focus on production-ready architecture, clean code, scalability, and industry best practices.
