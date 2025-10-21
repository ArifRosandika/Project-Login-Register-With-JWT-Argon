# Project Login Register with JWT & Argon

**Secure, Seamless Access — Powering Your Digital Future**

![GitHub last commit](https://img.shields.io/github/last-commit/ArifRosandika/Project-Login-Register-With-JWT-Argon?color=blue)
![GitHub repo size](https://img.shields.io/github/repo-size/ArifRosandika/Project-Login-Register-With-JWT-Argon)
![GitHub language count](https://img.shields.io/github/languages/count/ArifRosandika/Project-Login-Register-With-JWT-Argon)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white)
![Gin](https://img.shields.io/badge/Gin-008ECF?logo=go&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)
![Argon2](https://img.shields.io/badge/Argon2-4B8BBE?logo=security&logoColor=white)

---

## 📘 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🧭 Overview
**Project-Login-Register-With-JWT-Argon** is a full-stack developer project designed to demonstrate secure user authentication and authorization using **JWT (JSON Web Tokens)** and **Argon2** for password hashing.  

The backend is built with **Go (Gin framework)**, while the frontend uses **TypeScript** for modern and type-safe development.  
It aims to provide a clean, scalable foundation for building authentication systems with a seamless user experience.

---

## ✨ Features
- 🔐 Secure user registration and login system  
- 🧠 Strong password hashing using **Argon2**  
- 🎫 Token-based authentication using **JWT**  
- ⚙️ RESTful API with **Go + Gin**  
- 🧩 Modular project structure (frontend + backend separation)  
- 🧾 Environment-based configuration  
- 📡 Easy integration with frontend apps (React, Next.js, etc.)

---

## 🧰 Technologies
| Layer | Technology | Description |
|-------|-------------|-------------|
| **Backend** | Go (Gin) | REST API, JWT, middleware, and database handling |
| **Frontend** | TypeScript | Type-safe code and modern web development |
| **Security** | Argon2 | Secure password hashing |
| **Authentication** | JWT | Stateless session handling |
| **Database** | PostgreSQL (configurable) | User storage |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have installed:
- [Go](https://go.dev/) (v1.20+)
- [Node.js](https://nodejs.org/) (v18+)
- npm or yarn
- PostgreSQL / MySQL database
- Git

---

### Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/ArifRosandika/Project-Login-Register-With-JWT-Argon.git
   cd Project-Login-Register-With-JWT-Argon

2. Backend Setup

cd backend
go mod tidy
# Create and configure your .env file
# Example:
# DB_HOST=localhost
# DB_USER=postgres
# DB_PASS=password
# DB_NAME=auth_db
# JWT_SECRET=your_secret_key
go run main.go


3. Frontend Setup

cd ../frontend
npm install
npm run dev


4. Open the App Go to http://localhost:3000 to access the frontend interface.




---

Usage

1. Register a new account using the registration form.


2. Login with your credentials to receive a JWT token.


3. Use the token in the Authorization: Bearer <token> header for protected routes.


4. Logout to invalidate the token (optional depending on your implementation).



Example API request:

curl -H "Authorization: Bearer <your_jwt_token>" http://localhost:8080/api/user/profile


---

🗂️ Project Structure

Project-Login-Register-With-JWT-Argon/
├── backend/
│   ├── main.go
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes
│   └── database/
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── login/
    │   ├── register/
    │   ├── dashboard/
    │   └── App.tsx
    ├── package.json
    └── tsconfig.json


---

🤝 Contributing

Contributions are welcome! To contribute:

1. Fork this repository


2. Create your feature branch (git checkout -b feature/my-feature)


3. Commit your changes (git commit -m "Add my new feature")


4. Push to the branch (git push origin feature/my-feature)


5. Open a Pull Request



Please ensure your code follows existing conventions and includes proper documentation or comments.


---

📄 License

This project is licensed under the MIT License.
See the LICENSE file for more details.
