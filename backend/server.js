// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models/pg"); // PostgreSQL client

const app = express();
const PORT = process.env.PORT || 3000; 

// 🛠️ Middlewares  
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // السماح للـ Vite
  })
);
app.use(express.json()); // لقراءة JSON من الطلبات

app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// ✅ Route جديد لتجربة الاتصال بقاعدة البيانات
app.get('/api/ping-pool', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.json({ ok: true, now: rows[0].now });
  } catch (e) {
    console.error('DB ping error:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

     
// 📌 جلب كل المواعيد من قاعدة البيانات
app.get("/api/appointments", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM appointments ORDER BY appointment_date DESC");
    res.json(result.rows); // رجّع البيانات JSON
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// 📌 إضافة موعد جديد
app.post("/api/appointments", async (req, res) => {
  const { name, phone, service, date } = req.body;

  try {
    await db.query(
      "INSERT INTO appointments (name, phone, service, appointment_date) VALUES ($1, $2, $3, $4)",
      [name, phone, service, date]
    );

    res.status(201).json({ success: true, message: "Appointment booked successfully" });
  } catch (err) {
    console.error("Error inserting appointment:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// 🚀 تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});