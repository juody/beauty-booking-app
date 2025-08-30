# Laser Couture Hamburg – Appointment Booking System

A full-stack web application for managing *laser treatment appointments*.  
The project allows clients to book, confirm, and cancel appointments online, with automatic email notifications and database storage.

---

## 🚀 Features

- *Multi-step booking flow* (service selection → date & time → personal data → review → confirmation).
- *Interactive calendar UI* to pick available appointment slots.
- *Form validation* with required fields (name, phone, date, time).
- *PostgreSQL database* to store all bookings.
- *Confirmation email* sent automatically to the client and the studio.
- *Cancellation system* with email notifications (50€ fee if less than 24h before).
- *Responsive frontend* built with React + Vite.

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- CSS (custom styles for booking steps)

### Backend
- Node.js + Express
- Nodemailer (SMTP with Outlook/Gmail App Password)
- PostgreSQL (via pg library)

---

## 📂 Project Structure


frontend/          → React app (steps, calendar, styles)
backend/
  ├── server.js    → Express API + mail logic
  ├── models/pg.js → Database connection
  └── .env         → Environment variables


---

## ⚙️ Environment Variables (.env)

Example setup:


# Server
PORT=4000

# PostgreSQL
PGHOST=localhost
PGPORT=5432
PGDATABASE=laser_booking
PGUSER=postgres
PGPASSWORD=yourpassword

# SMTP (Outlook / Gmail App Password)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password
STUDIO_EMAIL=studio@example.com
FROM_EMAIL=Laser Couture Hamburg <your-email@example.com>


---

## ▶️ Getting Started

### 1. Clone & Install
bash
git clone https://github.com/your-username/laser-booking.git
cd laser-booking


Install backend:
bash
cd backend
npm install


Install frontend:
bash
cd ../frontend
npm install


---

### 2. Run the App

Start backend (port 4000):
bash
cd backend
node server.js


Start frontend (port 5173):
bash
cd frontend
npm run dev


---

## 📧 Email Workflow

- When a booking is created:
  - Client receives *confirmation email*.
  - Studio receives a copy.
- When a booking is cancelled:
  - Client receives *cancellation email*.
  - Studio receives a copy.
- Late cancellations (< 24h) → system includes *50€ fee warning* in the email.

---

## 📸 Screenshots

(Add screenshots of your booking steps here – Step 6 calendar, Step 7 form, Step 9 review, Step 10 confirmation)

---

## 👩‍💻 Author

- *Amina Alfadawiee* – Developer & Designer  
- Project for *Laser Couture Hamburg*