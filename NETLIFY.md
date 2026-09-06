# Deploying Ordersphere to Netlify with Database & Blobs

This project is pre-configured and 100% production-ready for deployment on **Netlify** with built-in **Serverless Database** and **Netlify Blobs Object Storage** (`@netlify/blobs`).

---

## 1. Quick Deploy Instructions

### Option A: Via GitHub / Netlify Dashboard (Recommended)
1. Push this repository to GitHub or GitLab.
2. In your [Netlify Dashboard](https://app.netlify.com), click **Add new site > Import an existing project**.
3. Select your repository. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
   - **Functions Directory:** `netlify/functions`
4. Click **Deploy Site**.

### Option B: Via Netlify CLI
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to your Netlify account
netlify login

# Deploy directly to production
netlify deploy --prod
```

---

## 2. Architecture & Components

### 1. `netlify.toml`
Defines the deployment pipeline, SPA routing fallback (`/* -> /index.html`), API functions routing (`/api/* -> /.netlify/functions/:splat`), and enterprise security headers.

### 2. Netlify Functions
- `netlify/functions/database.ts`: Handles CRUD operations for multi-tenant collections (`orders`, `inventory_audits`, `water_refills`, `staff_logs`) backed by `@netlify/blobs`.
- `netlify/functions/blobs.ts`: Handles file and object storage (uploading delivery receipts, staff inventory photos, potability certificates, invoices) backed by `@netlify/blobs`.

### 3. Netlify Blobs (`@netlify/blobs`)
Netlify Blobs is automatically enabled with zero configuration on Netlify:
- **Database Store:** `ordersphere-database`
- **Object/Blob Store:** `ordersphere-blobs`

### 4. Client Services
- `src/services/netlifyDatabase.ts`: Type-safe queries, saves, and deletes with seamless fallback to local persistent store during offline or preview modes.
- `src/services/netlifyBlobs.ts`: Uploads, downloads, and lists binary assets with drag-and-drop support.

### 5. Interactive Netlify Manager UI
Users can click the **"Netlify DB & Blobs"** button in the navigation bar to:
- Inspect and query database collections across tenants (`iluvkeyks`, `hydra`).
- Upload, preview, and download real blobs and files.
- Export database backups as JSON.
- View real-time storage status and deployment diagnostics.
