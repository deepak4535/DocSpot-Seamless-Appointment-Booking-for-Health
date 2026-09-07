# MediCareBook — Book a Doctor (MERN Stack)

A full-stack doctor appointment booking platform with three roles — **Patient**,
**Doctor**, and **Admin** — built on MongoDB, Express, React, and Node (MERN).

This is a completed, runnable version of the DocSpot project: the original
backend/frontend code has been kept, three real bugs were fixed (status
updates being silently reverted, and protected routes not registering after
login), and the missing environment/config files were added so it runs out
of the box.

## Features

- **Patients**: register/login, browse approved doctors, book an appointment
  (with an optional document upload), track appointment status, in-app
  notifications.
- **Doctors**: apply for a doctor profile, wait for admin approval, view and
  approve incoming appointments, download patient documents.
- **Admins**: approve/reject doctor applications, view all users, view all
  appointments across the platform.
- JWT authentication, bcrypt password hashing, Multer file uploads.

## Tech Stack

- **Frontend**: React 18, React Router 6, Ant Design, React-Bootstrap, MDB
  React UI Kit, Axios.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Multer.

## Project Structure

```
project/
├── backend/
│   ├── config/connectToDB.js
│   ├── controllers/          # adminC, doctorC, userC
│   ├── middlewares/authMiddleware.js
│   ├── routes/                # adminRoutes, doctorRoutes, userRoutes
│   ├── schemas/                # userModel, docModel, appointmentModel
│   ├── uploads/                 # uploaded appointment documents
│   ├── .env.example
│   └── index.js
└── frontend/
    └── src/
        ├── components/
        │   ├── common/   (Home, Login, Register, Notification)
        │   ├── user/     (UserHome, DoctorList, ApplyDoctor, UserAppointments)
        │   └── admin/    (AdminHome, AdminUsers, AdminDoctors, AdminAppointments)
        └── App.js
```

## Setup & Run

### 1. Prerequisites
- Node.js and npm
- A MongoDB instance (local `mongod` or MongoDB Atlas)

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_DB to your connection string, and JWT_KEY to a random secret
npm start
```
Backend runs at `http://localhost:8001`.

### 3. Frontend

```bash
cd frontend
npm install
npm start
```
Frontend runs at `http://localhost:3000` and talks to the backend at
`http://localhost:8001`.

### 4. First-time use

1. Go to `/register` and create **one account with role "Admin"** (this is
   who approves doctors) and one or more accounts with role "User".
2. As a User, use **Apply Doctor** from the sidebar to submit a doctor
   profile.
3. Log in as the Admin, open **Doctor**, and approve the application.
4. Log back in as that user — they can now see other doctors' listings, and
   any user can book an appointment with the approved doctor (uploading a
   document is optional).
5. Log in as the doctor to approve/track their appointments from
   **Appointments**.

## Fixes made to the original code

- `adminC.js` (approve/reject doctor) and `doctorC.js` (update doctor
  profile) were calling `findOneAndUpdate` **without** `{ new: true }` and
  then re-saving the *stale, pre-update* document — which silently
  overwrote the just-applied status change. Fixed by returning the updated
  document and dropping the redundant re-save.
- `App.js` computed "is the user logged in" once, at the very first render,
  to decide which routes to register. Since logging in doesn't remount the
  app, the `/userhome`/`/adminhome` routes never actually appeared after a
  normal client-side login. Replaced with a `PrivateRoute` guard that checks
  login state on every render, and switched the post-login redirect to a
  full navigation so the app state is fresh.
- Added `app.use("/uploads", express.static(...))` and a `.env.example` so
  the backend is runnable immediately after `npm install`.
