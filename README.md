<div align="center">

# 🚀 Leave Management System

### Full-stack HR platform with React frontend, Spring Boot REST API, JWT security & role-based access control

[![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.12-brightgreen?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Security](https://img.shields.io/badge/Spring%20Security-JWT-blue?style=for-the-badge&logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Maven](https://img.shields.io/badge/Maven-Build-red?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![AWS Ready](https://img.shields.io/badge/AWS-Deployment%20Ready-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)

**A production-style full-stack application — React SaaS dashboard frontend, Spring Boot REST API backend, JWT authentication, role-based access control, and AWS-ready deployment.**

[Features](#-features) •
[Architecture](#-architecture) •
[Screenshots](#-screenshots) •
[API Reference](#-api-endpoints) •
[Setup](#-getting-started) •
[Deployment](#-deployment-ready)

</div>

---

## 📌 Overview

**Leave Management System (LMS)** is a full-stack application that digitizes the complete leave lifecycle — from employee application to manager approval/rejection, with real-time leave balance tracking.

The **React frontend** provides role-aware dashboards for employees and managers. The **Spring Boot backend** handles authentication, authorization, business logic, and persistence. Both are connected via a JWT-secured REST API.

Built as a **Final Year Project / portfolio-grade** application demonstrating industry practices: **stateless JWT authentication**, **RBAC**, **JPA persistence**, **profile-based configuration**, **Swagger API documentation**, and **AWS-ready deployment**.

> 🔐 Secure • 📦 Modular • 🧪 Validated • ☁️ Cloud-Ready • 🖥 Full-Stack

---

## 💡 Why This Project?

| Problem | Solution |
|---------|----------|
| Manual leave tracking via spreadsheets | Centralized full-stack app with persistent MySQL storage |
| No audit trail for approvals | Full leave request lifecycle with reviewer, timestamps & rejection reasons |
| Weak access control in demo apps | Three-tier RBAC: `ROLE_EMPLOYEE`, `ROLE_MANAGER`, `ROLE_ADMIN` |
| Hardcoded credentials in tutorials | Environment-variable-driven `dev` / `prod` Spring profiles |
| Generic 500 errors on failure | Structured `ErrorResponse` via `@RestControllerAdvice` |
| No API discoverability | Swagger UI auto-documents every endpoint |
| Manual leave balance setup | Auto-seeded balances on employee registration |

This project is designed to impress **recruiters**, **placement interviewers**, and **project evaluators** by going beyond CRUD — it showcases **security**, **workflow design**, **frontend architecture**, and **deployment readiness**.

---

## 🏗 Architecture

### Full-Stack Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         React Frontend (Vite + Tailwind)                     │
│                                                                              │
│  Login │ Employee Dashboard │ Apply Leave │ My Leaves │ Manager Dashboard    │
│  Pending Requests │ Approve/Reject │ Responsive UI │ Protected Routes        │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                │
                                │ HTTPS + Axios + JWT Bearer Token
                                ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                     Spring Boot REST API (Port 8080)                         │
│                                                                              │
│  Auth │ Employee │ Manager │ Swagger/OpenAPI Documentation                   │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                   Spring Security + JWT Authentication                       │
│                                                                              │
│  JwtAuthenticationFilter → SecurityContext → Role-Based Authorization        │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           Service Layer (Business Logic)                     │
│                                                                              │
│  AuthService │ LeaveService │ ManagerLeaveService │ BalanceSeedService       │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         Repository Layer (Spring Data JPA)                   │
│                                                                              │
│  UserRepository │ LeaveRequestRepository │ LeaveBalanceRepository            │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              MySQL Database                                  │
│                                                                              │
│  users │ leave_requests │ leave_balances                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Security Architecture

```
Request → JwtAuthenticationFilter → SecurityContextHolder
                ↓
         CustomUserDetailsService → User (UserDetails)
                ↓
         @PreAuthorize + URL-based SecurityFilterChain
```

### Leave Workflow

```mermaid
stateDiagram-v2
    [*] --> PENDING : Employee applies leave
    PENDING --> APPROVED : Manager approves
    PENDING --> REJECTED : Manager rejects
    APPROVED --> [*] : Balance deducted
    REJECTED --> [*] : No balance change
```

---


---

## ✨ Features

### 🖥 React Frontend
- Role-aware SaaS dashboard (Employee / Manager / Admin views)
- JWT login with session persistence via localStorage
- Protected routes with role-based redirect
- Apply leave form with client-side validation
- Leave history table with status badges
- Manager approval/rejection with confirmation modal
- Toast notifications for all user actions
- Responsive design (mobile, tablet, desktop)
- Loading states and empty states throughout

### 🔐 Authentication & Security
- JWT-based **stateless** authentication (JJWT 0.12.3)
- BCrypt password hashing
- `UserDetails` integration with custom `User` entity
- URL-level + method-level authorization (`@PreAuthorize`)

### 👥 Role-Based Access Control
| Role | Backend Access | Frontend |
|------|---------------|----------|
| `ROLE_EMPLOYEE` | Apply leave, view own requests & balances | Employee dashboard |
| `ROLE_MANAGER` | View team requests, approve/reject leave | Manager dashboard |
| `ROLE_ADMIN` | Admin dashboard endpoints | Admin dashboard |

### 📋 Leave Management
- Apply for leave (6 types: Casual, Sick, Earned, Maternity, Paternity, Unpaid)
- Auto-seeded leave balances on employee registration
- View personal leave history & current year balances
- Manager approval/rejection workflow with optional rejection reason
- Atomic leave balance deduction on approval (`@Transactional`)

### 🛡 Production Quality
- Jakarta Bean Validation on all request DTOs
- Custom exceptions (`UserNotFoundException`, `InvalidLeaveRequestException`, etc.)
- Global exception handler with structured JSON error responses
- Swagger/OpenAPI 3 auto-generated API documentation
- Profile-based config (`dev` / `prod`)
- Executable fat JAR via `spring-boot-maven-plugin`

---

## 🛠 Tech Stack

### Frontend
| Category | Technology |
|----------|------------|
| **Framework** | React 18 + Vite |
| **Styling** | Tailwind CSS v3 |
| **HTTP Client** | Axios |
| **State** | Context API + useReducer |
| **Routing** | React Router v6 |

### Backend
| Category | Technology |
|----------|------------|
| **Language** | Java 17 |
| **Framework** | Spring Boot 3.2.12 |
| **Security** | Spring Security + JWT (JJWT 0.12.3) |
| **Persistence** | Spring Data JPA / Hibernate |
| **Database** | MySQL 8 |
| **Validation** | Jakarta Bean Validation |
| **Build Tool** | Maven |
| **Utilities** | Lombok |

### Documentation & Deployment
| Category | Technology |
|----------|------------|
| **API Docs** | Swagger / OpenAPI 3 (springdoc-openapi) |
| **Deployment** | AWS EC2 + MySQL |

---

## 📁 Project Structure

```
leave-management-system/
├── lms-frontend/                          # React frontend
│   ├── src/
│   │   ├── api/                           # Axios API layer
│   │   ├── components/layout/             # AppShell, Sidebar, Topbar
│   │   ├── components/ui/                 # StatCard, StatusBadge, Toast...
│   │   ├── contexts/AuthContext.jsx        # JWT auth state
│   │   ├── hooks/                         # useLeaves, useManagerLeaves
│   │   ├── pages/                         # Employee, Manager, Admin pages
│   │   └── routes/                        # ProtectedRoute, AppRouter
│   ├── .env                               # VITE_API_URL
│   └── package.json
│
└── leave-management-backend/              # Spring Boot backend
    ├── src/main/java/com/lms/
    │   ├── LeaveManagementApplication.java
    │   ├── config/
    │   │   ├── SecurityConfig.java
    │   │   └── JwtAuthenticationFilter.java
    │   ├── controller/
    │   ├── dto/request/ + dto/response/
    │   ├── entity/
    │   ├── enums/
    │   ├── exception/
    │   ├── repository/
    │   ├── security/
    │   └── service/
    ├── src/main/resources/
    │   ├── application.properties
    │   ├── application-dev.properties
    │   └── application-prod.properties
    ├── .env.example
    └── pom.xml
```

---

## 📖 API Documentation

Swagger UI is automatically generated and documents every endpoint interactively.

**Local:**
```
http://localhost:8080/swagger-ui/index.html
```

**Production (after AWS deployment):**
```
http://YOUR_EC2_IP:8080/swagger-ui/index.html
```

Swagger lets you test every API endpoint directly from the browser — no Postman setup required for demos.

---

## 🔗 API Endpoints

### 🔓 Public — Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register new user (balances auto-seeded) | ❌ |
| `POST` | `/api/auth/login` | Login & receive JWT | ❌ |

### 👤 User Profile

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `GET` | `/api/user/me` | Current user profile | Any authenticated |
| `GET` | `/api/employee/profile` | Employee profile + access level | `ROLE_EMPLOYEE` |

### 🧑‍💼 Employee — Leave APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `POST` | `/api/employee/leaves/apply` | Submit leave request | `ROLE_EMPLOYEE` |
| `GET` | `/api/employee/leaves/my-requests` | List own leave requests | `ROLE_EMPLOYEE` |
| `GET` | `/api/employee/leaves/{id}` | Get own leave request by ID | `ROLE_EMPLOYEE` |
| `GET` | `/api/employee/leaves/my-balances` | Current year leave balances | `ROLE_EMPLOYEE` |

### 👔 Manager — Approval APIs

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `GET` | `/api/manager/leaves/pending` | Pending requests from direct reports | `ROLE_MANAGER` |
| `GET` | `/api/manager/leaves/all` | All requests from direct reports | `ROLE_MANAGER` |
| `PUT` | `/api/manager/leaves/{id}/approve` | Approve leave & deduct balance | `ROLE_MANAGER` |
| `PUT` | `/api/manager/leaves/{id}/reject` | Reject leave with optional reason | `ROLE_MANAGER` |

> **Authorization Header:** `Authorization: Bearer <your-jwt-token>`

<details>
<summary><b>📄 Sample Request — Apply Leave</b></summary>

```json
POST /api/employee/leaves/apply
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...

{
  "leaveType": "CASUAL",
  "startDate": "2026-06-01",
  "endDate": "2026-06-03",
  "reason": "Family function"
}
```

</details>

<details>
<summary><b>📄 Sample Response — Auth Login</b></summary>

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "role": "ROLE_EMPLOYEE",
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

</details>

<details>
<summary><b>📄 Sample Error Response</b></summary>

```json
{
  "timestamp": "2026-06-06T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Only PENDING requests can be approved",
  "path": "/api/manager/leaves/5/approve"
}
```

</details>

---

## 🔑 Authentication Flow

```
1. Client sends POST /api/auth/login { email, password }
2. AuthenticationManager validates credentials via DaoAuthenticationProvider
3. JwtService generates signed JWT (HS256) with role claim + email subject
4. Client stores token; React Axios interceptor injects it on every request
5. JwtAuthenticationFilter intercepts each request:
   ├── Extracts token from Authorization header
   ├── Validates signature & expiration
   ├── Loads UserDetails from database
   └── Sets SecurityContext authentication
6. @PreAuthorize + SecurityFilterChain enforce role-based access
7. On 401: Axios interceptor clears localStorage and redirects to /login
```

---

## 📊 Leave Workflow

```
EMPLOYEE                          MANAGER                         SYSTEM
   │                                 │                              │
   │── POST /leaves/apply ──────────►│                              │
   │                                 │                              │── Save as PENDING
   │                                 │                              │
   │                                 │◄── GET /leaves/pending ──────│
   │                                 │                              │
   │                                 │── PUT /{id}/approve ────────►│── APPROVED
   │                                 │                              │── Deduct balance
   │                                 │                              │
   │◄── GET /my-requests ────────────│                              │── Status updated
```

**Leave Types:** `CASUAL` • `SICK` • `EARNED` • `MATERNITY` • `PATERNITY` • `UNPAID`

**Leave Statuses:** `PENDING` → `APPROVED` | `REJECTED` | `CANCELLED`

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Java JDK | 17+ |
| Maven | 3.6.3+ |
| MySQL | 8.0+ |
| Node.js | 18+ |
| npm | 9+ |

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/leave-management-system.git
cd leave-management-system
```

### 2️⃣ Configure Backend Environment

```bash
cp .env.example .env
```

Edit `.env`:

```properties
SPRING_PROFILES_ACTIVE=dev
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_64_character_hex_jwt_secret_here
```

### 3️⃣ Create MySQL Database

```sql
CREATE DATABASE IF NOT EXISTS leave_management_db;
```

> Tables are auto-created via `spring.jpa.hibernate.ddl-auto=update`

### 4️⃣ Configure Frontend Environment

```bash
cd lms-frontend
cp .env.example .env
```

Edit `lms-frontend/.env`:
```
VITE_API_URL=http://localhost:8080
```

---

## ▶️ Run Locally

**Terminal 1 — Backend:**
```bash
mvn spring-boot:run
```
✅ API available at: **http://localhost:8080**
✅ Swagger UI at: **http://localhost:8080/swagger-ui/index.html**

**Terminal 2 — Frontend:**
```bash
cd lms-frontend
npm install
npm run dev
```
✅ App available at: **http://localhost:5173**

---

## 🧪 Demo Accounts

Register accounts via `POST /api/auth/register` or Swagger UI, then use:

| Role | Email | Password |
|------|-------|----------|
| Employee | employee@example.com | *(set on register)* |
| Manager | manager@example.com | *(set on register)* |
| Admin | admin@example.com | *(set on register)* |

> ⚠️ After registering an employee, set their `manager_id` in MySQL to the manager's user `id` so leave requests appear in the manager's queue.

---

## 📦 Build

**Backend JAR:**
```bash
mvn clean package -DskipTests
java -jar target/leave-management-system-0.0.1-SNAPSHOT.jar
```

**Frontend production build:**
```bash
cd lms-frontend
npm run build
# Output in lms-frontend/dist/
```

---

## ☁️ Deployment Ready

| Profile | Activate With | Use Case |
|---------|---------------|----------|
| `dev` | `SPRING_PROFILES_ACTIVE=dev` | Local development |
| `prod` | `SPRING_PROFILES_ACTIVE=prod` | AWS production |

### Production Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SPRING_PROFILES_ACTIVE` | ✅ | Set to `prod` |
| `DB_USERNAME` | ✅ | Database username |
| `DB_PASSWORD` | ✅ | Database password |
| `JWT_SECRET` | ✅ | 64+ char hex signing key |

### Live URLs *(after deployment)*

| Service | URL |
|---------|-----|
| Frontend | `http://YOUR_EC2_IP` |
| Backend API | `http://YOUR_EC2_IP:8080` |
| Swagger UI | `http://YOUR_EC2_IP:8080/swagger-ui/index.html` |

<details>
<summary><b>🗺 AWS Deployment Checklist</b></summary>

- [ ] Launch EC2 t2.micro (Ubuntu 22.04)
- [ ] Install Java 17 + MySQL 8 + Nginx on EC2
- [ ] Configure security group: port 22 (SSH), 80 (HTTP), 8080 (API)
- [ ] Set environment variables in `/home/ubuntu/.env`
- [ ] Upload backend JAR via SCP
- [ ] Configure systemd service for auto-restart
- [ ] Upload frontend `dist/` to `/var/www/html` and configure Nginx
- [ ] Verify: `http://EC2_IP/` loads React app
- [ ] Verify: `http://EC2_IP:8080/swagger-ui/index.html` loads Swagger

</details>

---

## 📮 Postman Collection

| Step | Request |
|------|---------|
| 1 | `POST /api/auth/register` — Create employee |
| 2 | `POST /api/auth/login` — Copy JWT token |
| 3 | Set collection variable `token` = JWT |
| 4 | `POST /api/employee/leaves/apply` — Apply leave |
| 5 | `GET /api/manager/leaves/pending` — Manager views queue |
| 6 | `PUT /api/manager/leaves/{id}/approve` — Approve |

> 📁 **Postman Collection:** `docs/Leave-Management-System.postman_collection.json`

---

## 🔮 Future Improvements

- [ ] Admin panel APIs (user management, balance seeding UI)
- [ ] Email notifications on approval/rejection (`Spring JavaMailSender`)
- [ ] Unit & integration test coverage (JUnit 5 + Mockito)
- [ ] Flyway/Liquibase database migrations
- [ ] Docker & Docker Compose setup
- [ ] CI/CD pipeline (GitHub Actions → AWS)
- [ ] Spring Boot Actuator health endpoints
- [ ] Leave cancellation by employee
- [ ] Overlapping leave detection

---

## 🎓 Learning Outcomes

| Area | Skills Demonstrated |
|------|---------------------|
| **React** | Hooks, Context API, protected routes, Axios interceptors, role-based UI |
| **Spring Ecosystem** | Boot 3, Security 6, Data JPA, Validation, OpenAPI |
| **Security** | JWT, BCrypt, RBAC, stateless sessions, filter chain |
| **Architecture** | Full-stack layered design, DTO pattern, custom hooks |
| **Database** | MySQL modeling, JPA relationships, transactional balance tracking |
| **API Design** | RESTful endpoints, HTTP status codes, Swagger documentation |
| **DevOps** | Maven builds, Vite builds, Spring profiles, AWS-ready configuration |
| **Best Practices** | Global exception handling, env-based secrets, responsive UI |

---

## 👨‍💻 Author

**Tanmay Kshirsagar**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tanmayy-k)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tanmay-kshirsagar-8188042b2/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tanmaykshirsagarrr@gmail.com)

> 📌 B.Tech Final Year Project | Java Developer | Open to Opportunities

---

<div align="center">

**⭐ If you found this project useful, please star the repository!**

Made with ☕ Java & ⚛️ React

</div>
