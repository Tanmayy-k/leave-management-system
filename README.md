<div align="center">

# 🚀 Leave Management System

### Enterprise-grade REST API for employee leave management with JWT security & role-based access control

[![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.12-brightgreen?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Security](https://img.shields.io/badge/Spring%20Security-JWT-blue?style=for-the-badge&logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Maven](https://img.shields.io/badge/Maven-Build-red?style=for-the-badge&logo=apachemaven&logoColor=white)](https://maven.apache.org/)
[![AWS Ready](https://img.shields.io/badge/AWS-Deployment%20Ready-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)

**A production-style backend built with layered architecture, DTOs, validation, and centralized exception handling — ready for real-world deployment.**

[Features](#-features) •
[Architecture](#-architecture) •
[API Reference](#-api-endpoints) •
[Setup](#-getting-started) •
[Deployment](#-deployment-ready)

</div>

---

## 📌 Overview

**Leave Management System (LMS)** is a full-stack-ready **Spring Boot REST API** that digitizes the complete leave lifecycle — from employee application to manager approval/rejection, with real-time leave balance tracking.

Built as a **Final Year Project / portfolio-grade** application, it demonstrates industry practices used in enterprise Java backends: **stateless JWT authentication**, **RBAC**, **JPA persistence**, **profile-based configuration**, and **AWS-ready deployment**.

> 🔐 Secure • 📦 Modular • 🧪 Validated • ☁️ Cloud-Ready

---

## 💡 Why This Project?

| Problem | Solution |
|---------|----------|
| Manual leave tracking via spreadsheets | Centralized REST API with persistent MySQL storage |
| No audit trail for approvals | Full leave request lifecycle with reviewer, timestamps & rejection reasons |
| Weak access control in demo apps | Three-tier RBAC: `ROLE_EMPLOYEE`, `ROLE_MANAGER`, `ROLE_ADMIN` |
| Hardcoded credentials in tutorials | Environment-variable-driven `dev` / `prod` Spring profiles |
| Generic 500 errors on failure | Structured `ErrorResponse` via `@RestControllerAdvice` |

This project is designed to impress **recruiters**, **placement interviewers**, and **project evaluators** by going beyond CRUD — it showcases **security**, **workflow design**, and **deployment readiness**.

---

## 🏗 Architecture

### Layered Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Postman / Frontend)              │
└─────────────────────────────┬───────────────────────────────┘
                              │ HTTP + JWT Bearer Token
┌─────────────────────────────▼───────────────────────────────┐
│  Controller Layer    AuthController, LeaveController,      │
│                      ManagerController, UserController        │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│  Service Layer       AuthService, LeaveService,              │
│                      ManagerLeaveService, UserService         │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│  Repository Layer    UserRepository, LeaveRequestRepository,  │
│                      LeaveBalanceRepository (Spring Data JPA) │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│  Database            MySQL 8 (users, leave_requests,          │
│                      leave_balances)                          │
└─────────────────────────────────────────────────────────────┘
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

## ✨ Features

### 🔐 Authentication & Security
- JWT-based **stateless** authentication (JJWT 0.12.3)
- BCrypt password hashing
- `UserDetails` integration with custom `User` entity
- URL-level + method-level authorization (`@PreAuthorize`)

### 👥 Role-Based Access Control
| Role | Access |
|------|--------|
| `ROLE_EMPLOYEE` | Apply leave, view own requests & balances |
| `ROLE_MANAGER` | View team requests, approve/reject leave |
| `ROLE_ADMIN` | Admin dashboard endpoints |

### 📋 Leave Management
- Apply for leave (6 types: Casual, Sick, Earned, Maternity, Paternity, Unpaid)
- View personal leave history & balances
- Manager approval/rejection workflow
- Automatic leave balance deduction on approval

### 🛡 Production Quality
- Jakarta Bean Validation on all request DTOs
- Custom exceptions (`UserNotFoundException`, `InvalidLeaveRequestException`, etc.)
- Global exception handler with structured JSON errors
- Profile-based config (`dev` / `prod`)
- Executable fat JAR via `spring-boot-maven-plugin`

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Language** | Java 17 |
| **Framework** | Spring Boot 3.2.12 |
| **Security** | Spring Security + JWT (JJWT) |
| **Persistence** | Spring Data JPA / Hibernate |
| **Database** | MySQL 8 |
| **Validation** | Jakarta Bean Validation |
| **Build Tool** | Maven |
| **Utilities** | Lombok |
| **Deployment** | AWS (Elastic Beanstalk / ECS / EC2 ready) |

---

## 📁 Project Structure

```
leave-management-system/
├── src/main/java/com/lms/
│   ├── LeaveManagementApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   └── JwtAuthenticationFilter.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── LeaveController.java
│   │   ├── ManagerController.java
│   │   └── UserController.java
│   ├── dto/
│   │   ├── request/          # LoginRequest, RegisterRequest, LeaveRequestCreateDto...
│   │   └── response/         # AuthResponse, ErrorResponse, LeaveRequestResponseDto...
│   ├── entity/
│   │   ├── User.java
│   │   ├── LeaveRequest.java
│   │   └── LeaveBalance.java
│   ├── enums/
│   │   ├── Role.java
│   │   ├── LeaveType.java
│   │   └── LeaveStatus.java
│   ├── exception/
│   │   ├── GlobalExceptionHandler.java
│   │   └── Custom exceptions...
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── LeaveRequestRepository.java
│   │   └── LeaveBalanceRepository.java
│   ├── security/
│   │   ├── JwtService.java
│   │   └── CustomUserDetailsService.java
│   └── service/
│       ├── AuthService.java
│       ├── LeaveService.java
│       ├── ManagerLeaveService.java
│       └── UserService.java
├── src/main/resources/
│   ├── application.properties
│   ├── application-dev.properties
│   └── application-prod.properties
├── .env.example
├── pom.xml
└── README.md
```

---

## 🔗 API Endpoints

### 🔓 Public — Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login & receive JWT | ❌ |

### 👤 User Profile

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `GET` | `/api/user/me` | Current user profile | Any authenticated |
| `GET` | `/api/employee/profile` | Employee profile + access level | `ROLE_EMPLOYEE` |
| `GET` | `/api/manager/dashboard` | Manager dashboard stub | `ROLE_MANAGER` |
| `GET` | `/api/admin/dashboard` | Admin dashboard stub | `ROLE_ADMIN` |

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
4. Client stores token and sends: Authorization: Bearer <token>
5. JwtAuthenticationFilter intercepts each request:
   ├── Extracts token from header
   ├── Validates signature & expiration
   ├── Loads UserDetails from database
   └── Sets SecurityContext authentication
6. @PreAuthorize + SecurityFilterChain enforce role-based access
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
| Postman | Latest (optional) |

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/leave-management-system.git
cd leave-management-system
```

### 2️⃣ Configure Environment

```bash
cp .env.example .env
```

Edit `.env` or set environment variables:

```properties
SPRING_PROFILES_ACTIVE=dev
DB_HOST=localhost
DB_PORT=3306
DB_NAME=leave_management_db
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_64_character_hex_jwt_secret_here
```

> 💡 Alternatively, create `src/main/resources/application-local.properties` (gitignored) for local overrides.

### 3️⃣ Create MySQL Database

```sql
CREATE DATABASE IF NOT EXISTS leave_management_db;
```

> Tables are auto-created in `dev` profile via `spring.jpa.hibernate.ddl-auto=update`

---

## ▶️ Run Locally

```bash
# Set environment variables (PowerShell)
$env:DB_PASSWORD="your_mysql_password"
$env:JWT_SECRET="0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"

# Run with Maven
mvn spring-boot:run
```

**Or run the packaged JAR:**

```bash
mvn clean package -DskipTests
java -jar target/leave-management-system-0.0.1-SNAPSHOT.jar
```

✅ Application starts at: **http://localhost:8080**

---

## 📦 Maven Build

```bash
mvn clean package -DskipTests
```

**Expected output:**

```
[INFO] BUILD SUCCESS
[INFO] Replacing main artifact with repackaged archive...
```

**Verify JAR:**

```bash
dir target\leave-management-system-0.0.1-SNAPSHOT.jar    # Windows
ls -lh target/leave-management-system-0.0.1-SNAPSHOT.jar # Linux/Mac
```

---

## ☁️ Deployment Ready

This project supports **profile-based deployment** for AWS:

| Profile | Activate With | Use Case |
|---------|---------------|----------|
| `dev` | `SPRING_PROFILES_ACTIVE=dev` | Local development |
| `prod` | `SPRING_PROFILES_ACTIVE=prod` | AWS production |

### Production Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SPRING_PROFILES_ACTIVE` | ✅ | Set to `prod` |
| `DB_HOST` | ✅ | RDS endpoint |
| `DB_USERNAME` | ✅ | Database username |
| `DB_PASSWORD` | ✅ | Database password |
| `JWT_SECRET` | ✅ | 64+ char hex signing key |
| `DB_PORT` | ❌ | Default: `3306` |
| `DB_NAME` | ❌ | Default: `leave_management_db` |
| `SERVER_PORT` | ❌ | Default: `8080` |

### Deploy to AWS

```bash
# Build
mvn clean package -DskipTests

# Run on EC2 / EB / ECS
java -jar target/leave-management-system-0.0.1-SNAPSHOT.jar
```

<details>
<summary><b>🗺 AWS Deployment Checklist</b></summary>

- [ ] Create RDS MySQL instance
- [ ] Run database schema (prod uses `ddl-auto=validate`)
- [ ] Configure security groups (app → RDS port 3306)
- [ ] Set environment variables in EB/ECS/Parameter Store
- [ ] Generate strong `JWT_SECRET` (never reuse dev secret)
- [ ] Deploy fat JAR
- [ ] Verify health via `/api/auth/login`

</details>

---

## 📮 Postman Collection

Import the following base URL and test the full workflow:

| Step | Request |
|------|---------|
| 1 | `POST /api/auth/register` — Create employee |
| 2 | `POST /api/auth/login` — Copy JWT token |
| 3 | Set collection variable `token` = JWT |
| 4 | `POST /api/employee/leaves/apply` — Apply leave |
| 5 | `GET /api/manager/leaves/pending` — Manager views queue |
| 6 | `PUT /api/manager/leaves/{id}/approve` — Approve |

> 📁 **Postman Collection:** Add `postman/Leave-Management-System.postman_collection.json` to this repo *(coming soon)*

**Collection Auth Setting:** Bearer Token → `{{token}}`

---

## 📸 Screenshots

| Screenshot | Description |
|------------|-------------|
| ![Login](docs/screenshots/login.png) | JWT Login Response |
| ![Apply Leave](docs/screenshots/apply-leave.png) | Employee Leave Application |
| ![Manager Dashboard](docs/screenshots/manager-pending.png) | Manager Pending Requests |
| ![Approve Leave](docs/screenshots/approve-leave.png) | Leave Approval Flow |
| ![Error Handling](docs/screenshots/error-response.png) | Structured Error Response |

> 📷 *Add screenshots to `docs/screenshots/` and update paths above.*

---

## 🔮 Future Improvements

- [ ] Admin panel APIs (user management, balance seeding)
- [ ] Email notifications on approval/rejection
- [ ] Swagger / OpenAPI 3 documentation (`springdoc-openapi`)
- [ ] Flyway/Liquibase database migrations
- [ ] React / Angular frontend
- [ ] Docker & Docker Compose setup
- [ ] CI/CD pipeline (GitHub Actions → AWS)
- [ ] Unit & integration test coverage
- [ ] Spring Boot Actuator health endpoints
- [ ] Leave cancellation by employee

---

## 🎓 Learning Outcomes

By building this project, I gained hands-on experience with:

| Area | Skills Demonstrated |
|------|---------------------|
| **Spring Ecosystem** | Boot 3, Security 6, Data JPA, Validation |
| **Security** | JWT, BCrypt, RBAC, stateless sessions |
| **Architecture** | Layered design, DTO pattern, repository abstraction |
| **Database** | MySQL modeling, JPA relationships, balance tracking |
| **API Design** | RESTful endpoints, HTTP status codes, error contracts |
| **DevOps** | Maven builds, Spring profiles, AWS-ready configuration |
| **Best Practices** | Global exception handling, env-based secrets, `.gitignore` hygiene |

---

## 👨‍💻 Author

**Tanmay**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/YOUR_USERNAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/YOUR_PROFILE)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)

> 📌 B.Tech Final Year Project | Java Backend Developer | Open to Opportunities

---

<div align="center">

**⭐ If you found this project useful, please star the repository!**

Made with ☕ Java & 💚 Spring Boot

</div>
