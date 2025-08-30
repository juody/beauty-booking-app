require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const db = require('./models/pg.js');

const app = express();
const PORT = Number(process.env.PORT) || 4000;


app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

console.log('[BOOT] ENV snapshot:', {
  PORT: process.env.PORT,
  PGHOST: process.env.PGHOST,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
});


let transporter = null;
function getTransporter() {
  if (transporter) return transporter;

  const host = String(process.env.SMTP_HOST || '').toLowerCase();

  if (host.includes('gmail.com')) {
    
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,                 
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,                                
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  } else {
    
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,                 
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,                               
      requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      tls: { minVersion: 'TLSv1.2' },
    });
  }

  transporter.verify().then(
    () => console.log('[SMTP] transporter ready ✅'),
    (err) => console.warn('[SMTP] verify failed (server continues):', err?.message)
  );

  return transporter;
}


app.get('/', (_, res) => res.send('API is running ✅'));
app.get('/api/ping-db', async (_, res) => {
  try {
    const { rows } = await db.query('SELECT NOW() now');
    res.json({ ok: true, now: rows[0].now });
  } catch (e) {
    console.error('[PING-DB] error:', e);
    res.status(500).json({ ok: false, error: e.message });
  }
});
app.get('/api/debug-env', (_, res) => {
  res.json({
    PORT: process.env.PORT,
    PGHOST: process.env.PGHOST,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    HAS_SMTP_PASS: Boolean(process.env.SMTP_PASS),
  });
});



app.get('/api/test-mail', async (req, res) => {
  const to = String(req.query.to || '').trim();
  if (!to) return res.status(400).json({ ok: false, error: 'missing ?to=' });

  try {
    await getTransporter().sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to,
      subject: 'Test – Laser Couture Hamburg',
      text: 'هذه رسالة اختبار للتأكد من إعدادات الإيميل.',
      html: '<p>هذه رسالة <b>اختبار</b> للتأكد من إعدادات الإيميل.</p>',
    });
    return res.json({ ok: true });
  } catch (e) {
    console.error('[TEST MAIL] error:', e);
    return res.status(500).json({ ok: false, error: e.message });
  }
});


app.get('/api/appointments', async (_, res) => {
  try {
    const { rows } = await db.query(
      `SELECT id, full_name, email, phone, service,
              appointment_date, appointment_time, note, created_at
         FROM public.appointments
        ORDER BY id DESC`
    );
    res.json({ success: true, data: rows });
  } catch (e) {
    console.error('[GET /api/appointments] DB error:', e);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});


app.post('/api/appointments', async (req, res) => {
  try {
    let {
      full_name,
      email,
      phone,
      service,
      appointment_date,
      appointment_time,
      note,
    } = req.body;

    full_name = (full_name || '').trim();
    email = (email || '').trim();
    phone = (phone || '').trim();
    service = (service || '').trim();
    note = (note || '').trim();

    const missing = [];
    if (!full_name) missing.push('full_name');
    if (!phone) missing.push('phone');
    if (!appointment_date) missing.push('appointment_date');
    if (!appointment_time) missing.push('appointment_time');
    if (missing.length) {
      console.warn('[POST /api/appointments] 400 missing:', missing);
      return res.status(400).json({ success: false, error: 'Missing required fields.', missing });
    }

    
    const timeValue =
      appointment_time && appointment_time.length === 5
        ? `${appointment_time}:00`
        : appointment_time;

    let insert;
    try {
      insert = await db.query(
        `INSERT INTO public.appointments
         (full_name, email, phone, service, appointment_date, appointment_time, note, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
         RETURNING id`,
        [full_name, email || null, phone, service || null, appointment_date, timeValue, note || null]
      );
    } catch (dbErr) {
      if (dbErr && dbErr.code === '23505') {
        return res.status(409).json({
          success: false,
          error: 'Dieser Termin ist bereits vergeben. Bitte wählen Sie eine andere Uhrzeit.',
          code: 'SLOT_TAKEN',
        });
      }
      console.error('[POST /api/appointments] DB insert error:', dbErr);
      return res.status(500).json({ success: false, error: 'Database error' });
    }

    const bookingId = insert.rows[0].id;
    console.log('[BOOKING SAVED] id=', bookingId);

    
    (async () => {
      try {
        const prettyDate = new Date(`${appointment_date}T00:00:00`).toLocaleDateString('de-DE', {
          weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
        });
        const prettyTime = String(timeValue).replace(/:00$/, '');

        const subject = 'Ihre Terminbestätigung – Laser Couture Hamburg';
        const html = `
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#333">
            <p>Liebe/r ${full_name},</p>
            <p>vielen Dank für Ihre Buchung bei <strong>Laser Couture Hamburg</strong>.</p>

            <p><strong>Ihr Termin:</strong></p>
            <ul>
              <li><strong>Datum:</strong> ${prettyDate}</li>
              <li><strong>Uhrzeit:</strong> ${prettyTime}</li>
              <li><strong>Behandlung:</strong> ${service || '—'}</li>
            </ul>

            <p>Bitte erscheinen Sie pünktlich zu Ihrem Termin.
            Eine Absage ist nur bis 24 Stunden vorher möglich.
            Bei späterer Absage berechnen wir eine Ausfallgebühr von <strong>50 €</strong>.</p>

            <p>Wir freuen uns auf Sie!<br/>
            Ihr Team von Laser Couture Hamburg</p>

            <hr/>
            <p style="font-size:13px;color:#666;margin-top:8px">
              Laser Couture Hamburg · Frickestraße 49, 20251 Hamburg · Tel: 040 50691193
            </p>
            <p style="font-size:12px;color:#888">Buchungsnummer: ${bookingId}</p>
          </div>
        `;
        const text =
`Liebe/r ${full_name},

vielen Dank für Ihre Buchung bei Laser Couture Hamburg.

Ihr Termin:
- Datum: ${prettyDate}
- Uhrzeit: ${prettyTime}
- Behandlung: ${service || '—'}

Bitte erscheinen Sie pünktlich. Absagen nur bis 24h vorher; danach Ausfallgebühr 50 €.

Mit freundlichen Grüßen
Laser Couture Hamburg`;

        const to = [email, process.env.STUDIO_EMAIL].filter(Boolean).join(',');
        if (to) {
          await getTransporter().sendMail({
            from: process.env.FROM_EMAIL || process.env.SMTP_USER,
            to,
            subject,
            text,
            html,
          });
          console.log('[MAIL] sent to:', to);
        } else {
          console.log('[MAIL] skipped (no recipients)');
        }
      } catch (mailErr) {
        console.warn('[MAIL] failed (booking saved anyway):', mailErr.message);
      }
    })();

    return res.status(201).json({ success: true, bookingId });
  } catch (e) {
    console.error('[POST /api/appointments] fatal error:', e);
    return res.status(500).json({ success: false, error: e.message });
  }
});


app.delete('/api/appointments/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ success: false, error: 'Invalid id' });

  try {
    const { rowCount } = await db.query(
      'DELETE FROM public.appointments WHERE id = $1',
      [id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ success: false, error: 'Not found' });
    }
    return res.json({ success: true });
  } catch (e) {
    console.error('[DELETE /api/appointments/:id] DB error:', e);
    return res.status(500).json({ success: false, error: 'Database error' });
  }
});


app.post('/api/appointments/:id/cancel', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ success: false, error: 'Invalid id' });

  try {
    const { rows } = await db.query(
      `SELECT id, full_name, email, appointment_date, appointment_time, service
         FROM public.appointments WHERE id = $1`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ success: false, error: 'Not found' });

    await db.query('DELETE FROM public.appointments WHERE id = $1', [id]);

    (async () => {
      try {
        const a = rows[0];
        const prettyDate = new Date(`${a.appointment_date}T00:00:00`).toLocaleDateString('de-DE', {
          weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
        });
        const prettyTime = String(a.appointment_time).replace(/:00$/, '');
        const subject = 'Stornierungsbestätigung – Laser Couture Hamburg';
        const html = `
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#333">
            <p>Liebe/r ${a.full_name},</p>
            <p>hiermit bestätigen wir die Stornierung Ihres Termins:</p>
            <ul>
              <li><strong>Datum:</strong> ${prettyDate}</li>
              <li><strong>Uhrzeit:</strong> ${prettyTime}</li>
              <li><strong>Behandlung:</strong> ${a.service || '—'}</li>
            </ul>
            <p>Bitte beachten Sie: Bei Absagen weniger als 24 Stunden vor dem Termin
            kann eine Ausfallgebühr von <strong>50 €</strong> anfallen.</p>
            <p>Mit freundlichen Grüßen<br/>Ihr Team von Laser Couture Hamburg</p>
          </div>
        `;
        const to = [a.email, process.env.STUDIO_EMAIL].filter(Boolean).join(',');
        if (to) {
          await getTransporter().sendMail({
            from: process.env.FROM_EMAIL || process.env.SMTP_USER,
            to,
            subject,
            html,
          });
          console.log('[MAIL cancel] sent to:', to);
        }
      } catch (err) {
        console.warn('[MAIL cancel] failed:', err.message);
      }
    })();

    return res.json({ success: true });
  } catch (e) {
    console.error('[POST /api/appointments/:id/cancel] DB error:', e);
    return res.status(500).json({ success: false, error: 'Database error' });
  }
});


process.on('unhandledRejection', (reason) => {
  console.error('[UNHANDLED REJECTION]', reason);
});
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err);
  process.exit(1);
});


app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});