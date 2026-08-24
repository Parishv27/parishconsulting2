/* ============================================================
   POST /api/contact  —  Consultation request -> Resend -> inbox

   Replaces the old mailto: handoff in site/js/main.js, which
   depended on the visitor having a desktop mail client and gave
   neither party any confirmation that a request had been made.

   Environment variables (Vercel project settings):
     RESEND_API_KEY      required   Resend API key ("re_...")
     CONTACT_TO_EMAIL    optional   defaults to the address below
     CONTACT_FROM_EMAIL  optional   must be on a Resend-verified
                                    domain; defaults to Resend's
                                    shared onboarding sender, which
                                    only delivers to the Resend
                                    account owner's own address.
   ============================================================ */

import { Resend } from 'resend';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'parisheducationalconsultingllc@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
const FROM = `Parish Educational Consulting Website <${FROM_EMAIL}>`;

/* Length caps mirror the front-end maxlength attributes. They exist so a
   scripted POST cannot push an unbounded payload through to the inbox. */
const LIMITS = {
  name: 120, role: 120, district: 200,
  email: 254, phone: 40, area: 120, message: 4000,
};

const AREAS = [
  'Instructional Leadership & School Improvement',
  'Leadership Development',
  'Student Achievement & Intervention',
  'School Culture & Climate',
  'Alternative & Nontraditional Education',
  'Not sure yet',
];

/* Deliberately permissive: the real proof an address works is the reply.
   This only rejects input that could not be an address at all. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ').slice(0, max);
}

/* The submitted values land inside an HTML email, so they are escaped to
   keep a submission from injecting markup into the message we read. */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function row(label, value) {
  if (!value) return '';
  return `<tr>
      <td style="padding:10px 16px;border-bottom:1px solid #EAE6DB;font:700 12px/1.4 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#0A1F44;white-space:nowrap;vertical-align:top">${esc(label)}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #EAE6DB;font:400 15px/1.5 Arial,sans-serif;color:#333">${esc(value)}</td>
    </tr>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set on this deployment.');
    return res.status(500).json({
      ok: false,
      error: 'The contact form is not set up to send mail yet.',
    });
  }

  /* req.body is a lazy getter on Vercel: reading it parses the request, and it
     THROWS ApiError("Invalid JSON") on a malformed payload. Left unguarded that
     surfaces as FUNCTION_INVOCATION_FAILED rather than the 400 below, so the
     read itself has to be inside the try. A string can also still arrive when
     the content-type header is missing or unexpected. */
  let body;
  try {
    body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);
  } catch {
    body = null;
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Could not read the submitted form.' });
  }

  /* Honeypot: a field hidden from people but appealing to bots. A filled
     one is dropped silently so the bot cannot learn it was caught. */
  if (clean(body.website, 200)) {
    console.warn('[contact] Honeypot triggered; submission dropped.');
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const role = clean(body.role, LIMITS.role);
  const district = clean(body.district, LIMITS.district);
  const email = clean(body.email, LIMITS.email);
  const phone = clean(body.phone, LIMITS.phone);
  const area = clean(body.area, LIMITS.area);
  const message = clean(body.message, LIMITS.message);

  const fields = {};
  if (!name) fields.name = 'Please enter your name.';
  if (!district) fields.district = 'Please enter your district or school.';
  if (!email) fields.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email)) fields.email = 'Please enter a valid email address.';

  if (Object.keys(fields).length) {
    return res.status(400).json({ ok: false, error: 'Please check the highlighted fields.', fields });
  }

  const areaOut = AREAS.includes(area) ? area : 'Not specified';
  const subject = `Consultation Request: ${district}`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#F8F6F0">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#FFFEFA;border:1px solid #EAE6DB;border-radius:6px">
    <tr><td style="padding:22px 16px;background:#0A1F44;border-radius:6px 6px 0 0">
      <div style="font:700 18px/1.3 Georgia,serif;color:#F8F6F0">New Consultation Request</div>
      <div style="font:400 13px/1.5 Arial,sans-serif;color:#C9A646;padding-top:4px">Submitted through the website contact form</div>
    </td></tr>
    <tr><td style="padding:8px 0">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%">
        ${row('Name', name)}
        ${row('Role', role)}
        ${row('District / School', district)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Area of Need', areaOut)}
      </table>
    </td></tr>
    ${message ? `<tr><td style="padding:16px">
      <div style="font:700 12px/1.4 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#0A1F44;padding-bottom:8px">Message</div>
      <div style="font:400 15px/1.6 Arial,sans-serif;color:#333;white-space:pre-wrap">${esc(message)}</div>
    </td></tr>` : ''}
    <tr><td style="padding:14px 16px;border-top:1px solid #EAE6DB;font:400 13px/1.5 Arial,sans-serif;color:#6B6660">
      Reply directly to this email to reach ${esc(name)}.
    </td></tr>
  </table>
</body></html>`;

  const text = [
    'New Consultation Request',
    '',
    `Name: ${name}`,
    `Role: ${role || '-'}`,
    `District / School: ${district}`,
    `Email: ${email}`,
    `Phone: ${phone || '-'}`,
    `Area of need: ${areaOut}`,
    '',
    message || '(No message provided.)',
  ].join('\n');

  try {
    const { data, error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: FROM,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('[contact] Resend rejected the send:', error);
      return res.status(502).json({
        ok: false,
        error: 'We could not send your request just now.',
      });
    }

    console.log(`[contact] Sent ${data?.id} for ${district}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected failure:', err);
    return res.status(502).json({
      ok: false,
      error: 'We could not send your request just now.',
    });
  }
}
