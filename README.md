# 🚀 Nexus API - Production-Ready Backend Architecture

A scalable, production-ready RESTful API built with **Node.js, TypeScript, and Express**. This project demonstrates a robust microservices-like architecture utilizing **Docker**, an **Nginx** reverse proxy, and **PostgreSQL** with **Prisma ORM**.

This repository serves as a solid foundation for backend development, focusing on clean code, layered architecture, and modern deployment practices.

## ✨ Core Features
- **Layered Architecture:** Clear separation of concerns (Routes, Controllers, Services, Middlewares).
- **Authentication & Security:** Secure user registration and login using **JWT (JSON Web Tokens)** and **bcryptjs** for password hashing.
- **Type-Safe Database Access:** Utilizing **Prisma ORM** for strict typing and easy database migrations.
- **Containerized Infrastructure:** Fully dockerized environment containing the Node.js API, PostgreSQL database, and Nginx reverse proxy.
- **Reverse Proxy & Load Balancing Ready:** Nginx handles incoming traffic on port 80 and routes it to the Node API.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Infrastructure:** Docker & Docker Compose
- **Proxy Server:** Nginx
- **Security:** JWT, bcryptjs, CORS

## 📂 Project Structure
```text
nexus-api/
├── nginx/
│   └── nginx.conf           # Nginx reverse proxy configuration
├── prisma/
│   └── schema.prisma        # Database schema and models
├── src/
│   ├── config/              # Environment & DB configurations
│   ├── controllers/         # Request handlers (extracts data, sends responses)
│   ├── middlewares/         # Custom middlewares (e.g., JWT verification)
│   ├── routes/              # API route definitions
│   ├── services/            # Core business logic & database interactions
│   └── app.ts               # Express application entry point
├── docker-compose.yml       # Docker services orchestration
└── Dockerfile               # Node.js API container build instructions

Getting Started

1. Clone the repository
git clone [https://github.com/yourusername/nexus-api.git](https://github.com/yourusername/nexus-api.git)
cd nexus-api

2. Start the Docker containers
docker-compose up -d --build

3. Run Database Migrations
docker-compose exec api npx prisma migrate dev --name init

