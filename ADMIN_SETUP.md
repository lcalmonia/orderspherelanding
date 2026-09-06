# Ordersphere Partner Admin Setup

The public partner form now stores applications in Netlify Blobs and the private dashboard is available at `/admin`.

## 1. Configure Netlify environment variables

In Netlify: Site configuration → Environment variables, add:

- `ADMIN_PASSWORD` — a long, unique administrator password.
- `ADMIN_EMAIL` — the email address that should receive new partner alerts.
- `RESEND_API_KEY` — Resend API key.
- `RESEND_FROM_EMAIL` — a sender address using a domain verified in Resend, for example `Ordersphere <notifications@ordersphere.app>`.

Do not put real secrets in GitHub.

## 2. Admin URL

Open:

`https://ordersphere.app/admin`

Sign in with `ADMIN_PASSWORD`.

The dashboard supports:
- New / Reviewing / Contacted / Meeting Scheduled / Proposal Sent / Won / Lost statuses
- Search and filtering
- Customer contact details
- Internal admin notes
- Email Customer action
- Permanent deletion of a lead

## 3. Customer flow

A visitor clicks Partner With Us → completes the application → the application is saved server-side → the customer sees a confirmation screen → if Resend is configured, the admin receives an email alert with the application details.

## 4. Storage

Applications are stored as individual JSON blobs in the `ordersphere-partner-leads` Netlify Blobs store. They are not stored in browser localStorage and are not exposed to visitors.
