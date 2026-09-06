import { getStore } from '@netlify/blobs';
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

const store = getStore({ name: 'ordersphere-partner-leads', consistency: 'strong' });
const TOKEN_TTL_SECONDS = 60 * 60 * 8;

interface PartnerLead {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  partnershipType: string;
  monthlyOrders: string;
  launchWindow: string;
  goals: string;
  status: 'new' | 'reviewing' | 'contacted' | 'meeting' | 'proposal' | 'won' | 'lost';
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json' }
});

const clean = (value: unknown, max = 1000) => String(value ?? '').trim().slice(0, max);

function tokenForAdmin() {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error('ADMIN_PASSWORD is not configured in Netlify environment variables.');
  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
  const payload = `admin.${exp}`;
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function isAdmin(request: Request) {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  const authorization = request.headers.get('authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'admin') return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = createHmac('sha256', secret).update(`${parts[0]}.${parts[1]}`).digest('base64url');
  const a = Buffer.from(parts[2]);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function sendLeadEmail(lead: PartnerLead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !to || !from) return { sent: false, reason: 'Email environment variables are not configured.' };

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
      <h2>New Ordersphere Partner Application</h2>
      <p>A new business has submitted a partnership application.</p>
      <table cellpadding="7" cellspacing="0" style="border-collapse:collapse">
        <tr><td><b>Business</b></td><td>${escapeHtml(lead.businessName)}</td></tr>
        <tr><td><b>Contact</b></td><td>${escapeHtml(lead.contactName)}</td></tr>
        <tr><td><b>Email</b></td><td>${escapeHtml(lead.email)}</td></tr>
        <tr><td><b>Phone</b></td><td>${escapeHtml(lead.phone)}</td></tr>
        <tr><td><b>Website</b></td><td>${escapeHtml(lead.website)}</td></tr>
        <tr><td><b>Partnership</b></td><td>${escapeHtml(lead.partnershipType)}</td></tr>
        <tr><td><b>Monthly Volume</b></td><td>${escapeHtml(lead.monthlyOrders)}</td></tr>
        <tr><td><b>Launch Window</b></td><td>${escapeHtml(lead.launchWindow)}</td></tr>
      </table>
      <h3>Requested Workflows</h3>
      <p>${escapeHtml(lead.goals).replace(/\n/g, '<br>')}</p>
      <p><a href="https://ordersphere.app/admin">Open Ordersphere Admin</a></p>
    </div>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New Ordersphere Partner Application — ${lead.businessName}`,
      html,
      reply_to: lead.email
    })
  });

  if (!response.ok) return { sent: false, reason: `Email provider returned ${response.status}.` };
  return { sent: true };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char] || char));
}

export default async function handler(request: Request) {
  try {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204 });

    if (request.method === 'POST') {
      const body = await request.json().catch(() => null) as Record<string, unknown> | null;
      if (!body) return json({ error: 'Invalid request.' }, 400);
      if (clean(body.website, 300) === '__HONEYPOT__') return json({ success: true });

      const lead: PartnerLead = {
        id: randomUUID(),
        businessName: clean(body.businessName, 160),
        contactName: clean(body.contactName, 160),
        email: clean(body.email, 200),
        phone: clean(body.phone, 80),
        website: clean(body.website, 300),
        partnershipType: clean(body.partnershipType, 80),
        monthlyOrders: clean(body.monthlyOrders, 100),
        launchWindow: clean(body.launchWindow, 100),
        goals: clean(body.goals, 3000),
        status: 'new',
        adminNotes: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (!lead.businessName || !lead.contactName || !lead.email) {
        return json({ error: 'Business name, contact name, and email are required.' }, 422);
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
        return json({ error: 'Please provide a valid email address.' }, 422);
      }

      await store.setJSON(`lead-${lead.id}.json`, lead);
      const email = await sendLeadEmail(lead);
      return json({ success: true, leadId: lead.id, emailNotification: email.sent });
    }

    if (!isAdmin(request)) return json({ error: 'Unauthorized.' }, 401);

    if (request.method === 'GET') {
      const listed = await store.list({ prefix: 'lead-' });
      const leads: PartnerLead[] = [];
      for (const item of listed.blobs) {
        const lead = await store.get(item.key, { type: 'json' }) as PartnerLead | null;
        if (lead) leads.push(lead);
      }
      leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return json({ leads });
    }

    if (request.method === 'PATCH') {
      const body = await request.json().catch(() => null) as Record<string, unknown> | null;
      const id = clean(body?.id, 100);
      if (!id) return json({ error: 'Lead id is required.' }, 400);
      const key = `lead-${id}.json`;
      const existing = await store.get(key, { type: 'json' }) as PartnerLead | null;
      if (!existing) return json({ error: 'Lead not found.' }, 404);

      const updated: PartnerLead = {
        ...existing,
        status: (clean(body?.status, 30) || existing.status) as PartnerLead['status'],
        adminNotes: clean(body?.adminNotes, 5000),
        updatedAt: new Date().toISOString()
      };
      await store.setJSON(key, updated);
      return json({ lead: updated });
    }

    if (request.method === 'DELETE') {
      const body = await request.json().catch(() => null) as Record<string, unknown> | null;
      const id = clean(body?.id, 100);
      if (!id) return json({ error: 'Lead id is required.' }, 400);
      await store.delete(`lead-${id}.json`);
      return json({ success: true });
    }

    return json({ error: 'Method not allowed.' }, 405);
  } catch (error) {
    console.error('partner-leads error', error);
    return json({ error: 'Server error.' }, 500);
  }
}

export async function login(request: Request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return json({ error: 'Admin password is not configured.' }, 503);
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const password = String(body?.password ?? '');
  if (!password || password !== configured) return json({ error: 'Invalid admin password.' }, 401);
  return json({ token: tokenForAdmin(), expiresIn: TOKEN_TTL_SECONDS });
}
