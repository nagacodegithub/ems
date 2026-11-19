# Employee Management System

An Employee Management System built to manage employee records with secure admin-only access. Only authenticated administrators can create, view, update, and delete employee information.

## 🚀 Features

### Admin Authentication
- Admin login and authentication.
- Secure access to employee management features.
- Only administrators can manage employee records.

### Employee Management (Admin Only)
- Create new employee records.
- View employee details.
- Update existing employee information.
- Delete employee records.
- Upload and manage employee profile images.
- Form validation for employee information.

## 🛠️ Technologies Used

- **Frontend:** React.js, JavaScript, HTML, CSS, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Yup
- **File Upload:** Multer
- **API:** RESTful APIs

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd employee-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://localhost:27017/ems
ACCESS_SECRET = your_jwt_access_token_secret
REFRESH_SECRET = your_jwt_refresh_token_secret
CLIENT_URL = http://localhost:5173
BASE_URL = http://localhost:8000
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Access Control

| Role | Permissions |
|---|---|
| Admin | Login and manage employees |
| User  | Login and not allowed access manage employees |
| Employee | No login or management access |

All employee management operations are restricted to authenticated administrators.

## 📌 Main Functionalities

1. Admin logs into the system.
2. Admin accesses the employee management dashboard.
3. Admin creates new employee records.
4. Admin views the employee list and details.
5. Admin updates employee information.
6. Admin deletes employee records.

## 🎯 Project Objective

The main objective of this project is to develop a simple and secure employee management application that allows administrators to manage employee records efficiently through a user-friendly interface and REST APIs.

## 👨‍💻 Author

**Nagaraj A**
 Full-Stack Developer
