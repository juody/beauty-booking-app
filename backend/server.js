require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models/pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ['http://localhost:5173','http://127.0.0.1:5173'] }));
app.use(express.json());

// فحص السيرفر فقط
app.get('/', (_, res) => res.send('API is running ✅'));

// فحص اتصال DB
app.get('/api/ping-db', async (_, res) => {
  try {
    const { rows } = await db.query('SELECT NOW() as now');
    res.json({ ok: true, now: rows[0].now });
  } catch (e) {
    console.error('DB ping error:', e);
    res.status(500).json({ ok: false, error: e.message }); 
  }
}); 

// جلب المواعيد
app.get('/api/appointments', async (_, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM public.appointments ORDER BY id DESC'
    );
    res.json(rows);
  } catch (e) {
    console.error('Error fetching appointments:', e);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// إضافة موعد
app.post('/api/appointments', async (req, res) => {
  const { full_name, email, phone, service, appointment_date, appointment_time, note } = req.body;

  try {
    await db.query(
      `INSERT INTO public.appointments
       (full_name, email, phone, service, appointment_date, appointment_time, note, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7, NOW())`,
      [full_name, email || null, phone, service || null, appointment_date, appointment_time, note || null]
    );

    res.status(201).json({ success: true });
  } catch (e) {
    // ملاحظة: لو عندك unique index على (appointment_date, appointment_time) ممكن يعطي duplicate key
    console.error('Error inserting appointment:', e);
    res.status(500).json({ success: false, error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});