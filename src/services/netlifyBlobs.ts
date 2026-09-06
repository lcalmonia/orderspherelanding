// Netlify Blobs Client Service (Powered by @netlify/blobs)

export interface StoredBlobItem {
  key: string;
  name: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  tenantId?: string;
  category?: string;
  description?: string;
  previewUrl?: string;
}

const LOCAL_STORAGE_BLOBS_KEY = 'ordersphere_netlify_blobs_v1';

const INITIAL_BLOBS: StoredBlobItem[] = [
  {
    key: 'blob_hydra_cert_2026',
    name: 'Hydra-Pure-Water-Quality-Certificate-Q3.pdf',
    mimeType: 'application/pdf',
    size: 245800,
    uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    tenantId: 'hydra',
    category: 'Compliance & Safety',
    description: 'Monthly Department of Health Potability & TDS mineral spectrum certificate (12 ppm)'
  },
  {
    key: 'blob_ik_audit_receipt_842',
    name: 'iLuvKeyks-Shift-Physical-Inventory-Audit-Proof.png',
    mimeType: 'image/png',
    size: 182400,
    uploadedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    tenantId: 'iluvkeyks',
    category: 'Inventory Audit',
    description: 'Lead Barista signed physical count tally sheet verifying 3.2kg Arabica beans critical level'
  },
  {
    key: 'blob_ik_delivery_slip',
    name: 'Batch-Order-Receipt-IK-840-842.pdf',
    mimeType: 'application/pdf',
    size: 94200,
    uploadedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    tenantId: 'iluvkeyks',
    category: 'Dispatch Receipt',
    description: 'Lalamove & GrabExpress aggregated rider receipt manifest'
  }
];

function getLocalBlobs(): StoredBlobItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_BLOBS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_BLOBS_KEY, JSON.stringify(INITIAL_BLOBS));
      return INITIAL_BLOBS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BLOBS;
  }
}

function saveLocalBlobs(blobs: StoredBlobItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_BLOBS_KEY, JSON.stringify(blobs));
  } catch {
    // ignore
  }
}

/**
 * List blobs from Netlify Blobs (or local fallback in preview)
 */
export async function listNetlifyBlobs(tenantId?: string): Promise<{
  blobs: StoredBlobItem[];
  backend: 'netlify-blobs' | 'local-storage';
}> {
  try {
    const params = new URLSearchParams();
    if (tenantId) params.set('tenant', tenantId);

    const res = await fetch(`/api/blobs?${params.toString()}`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.blobs)) {
        return {
          blobs: json.blobs,
          backend: json.storageBackend === 'netlify-blobs' ? 'netlify-blobs' : 'local-storage'
        };
      }
    }
  } catch {
    // fallback
  }

  let local = getLocalBlobs();
  if (tenantId) {
    local = local.filter(b => !b.tenantId || b.tenantId === tenantId);
  }

  return {
    blobs: local,
    backend: 'local-storage'
  };
}

/**
 * Upload a file/blob to Netlify Blobs
 */
export async function uploadNetlifyBlob(
  file: File,
  meta: {
    tenantId?: string;
    category?: string;
    description?: string;
  } = {}
): Promise<{ blob: StoredBlobItem; backend: 'netlify-blobs' | 'local-storage' }> {
  // Convert file to Base64 dataUrl
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const payload = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    tenantId: meta.tenantId || 'general',
    category: meta.category || 'Uploaded Asset',
    description: meta.description || '',
    data: dataUrl
  };

  try {
    const res = await fetch('/api/blobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.blob) {
        return {
          blob: { ...json.blob, previewUrl: dataUrl },
          backend: json.storageBackend === 'netlify-blobs' ? 'netlify-blobs' : 'local-storage'
        };
      }
    }
  } catch {
    // fallback
  }

  // Local fallback storage
  const newBlob: StoredBlobItem = {
    key: `blob_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    uploadedAt: new Date().toISOString(),
    tenantId: meta.tenantId || 'general',
    category: meta.category || 'Uploaded Asset',
    description: meta.description || '',
    previewUrl: dataUrl
  };

  const local = getLocalBlobs();
  local.unshift(newBlob);
  saveLocalBlobs(local);

  return {
    blob: newBlob,
    backend: 'local-storage'
  };
}

/**
 * Delete blob from Netlify Blobs
 */
export async function deleteNetlifyBlob(key: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/blobs?key=${encodeURIComponent(key)}`, {
      method: 'DELETE',
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      return true;
    }
  } catch {
    // fallback
  }

  const local = getLocalBlobs().filter(b => b.key !== key);
  saveLocalBlobs(local);
  return true;
}
