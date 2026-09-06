// Netlify Database Service (Powered by Netlify Functions & Netlify Blobs key-value document store)

export interface NetlifyDbRecord<T = Record<string, unknown>> {
  id: string;
  collection: string;
  tenantId?: string;
  data: T;
  createdAt: string;
  updatedAt: string;
}

const LOCAL_STORAGE_DB_KEY = 'ordersphere_netlify_db_v1';

// Initial local seeds
const LOCAL_SEEDS: NetlifyDbRecord[] = [
  {
    id: 'ik-ord-842',
    collection: 'orders',
    tenantId: 'iluvkeyks',
    data: {
      orderId: '#IK-842',
      customer: 'Carlos Miguel',
      items: '1x Spanish Latte (Iced, 50% Sweet, Oat Milk) + 1x Beef Tapa Meal',
      total: 345,
      channel: 'Delivery',
      status: 'Prepping',
      fulfillmentEta: '18 mins'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ik-ord-841',
    collection: 'orders',
    tenantId: 'iluvkeyks',
    data: {
      orderId: '#IK-841',
      customer: 'Dr. Angela Tan',
      items: '2x Matcha Latte (Hot, Almond Milk)',
      total: 310,
      channel: 'Pickup',
      status: 'Ready',
      fulfillmentEta: 'Store Counter'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ik-inv-beans',
    collection: 'inventory_audits',
    tenantId: 'iluvkeyks',
    data: {
      item: 'Espresso Arabica Beans',
      category: 'Raw Coffee',
      currentStock: 3.2,
      unit: 'kg',
      status: 'critical',
      lowThreshold: 6.0,
      criticalThreshold: 3.5,
      lastCountedBy: 'Lead Barista Carlos',
      lastCountedShift: 'Today, 05:30 PM (Evening Shift)',
      note: 'Supplier PO needed immediately'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ik-inv-milk',
    collection: 'inventory_audits',
    tenantId: 'iluvkeyks',
    data: {
      item: 'Fresh Dairy & Barista Oat Milk',
      category: 'Dairy & Milks',
      currentStock: 14.5,
      unit: 'L',
      status: 'low',
      lowThreshold: 24.0,
      criticalThreshold: 10.0,
      lastCountedBy: 'Lead Barista Carlos',
      lastCountedShift: 'Today, 05:30 PM (Evening Shift)',
      note: 'Approaching safety threshold'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'ik-inv-tubs',
    collection: 'inventory_audits',
    tenantId: 'iluvkeyks',
    data: {
      item: 'Signature Cake Tub Containers',
      category: 'Bakery Packaging',
      currentStock: 86,
      unit: 'pcs',
      status: 'normal',
      lowThreshold: 30,
      criticalThreshold: 15,
      lastCountedBy: 'Barista Maya',
      lastCountedShift: 'Today, 01:15 PM (Midday Count)',
      note: 'Adequate stock'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'hydra-ref-104',
    collection: 'water_refills',
    tenantId: 'hydra',
    data: {
      refillId: '#HYD-104',
      household: 'Alcantara Residence (Blk 4 Lot 12, Greenhills)',
      bottlesLoaned: 4,
      bottlesReturned: 4,
      waterType: 'Alkaline Ionized (pH 9.2, 12 ppm)',
      rider: 'Rider Marco V. (Fleet #1)',
      status: 'In Transit',
      eta: '12 mins'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

function getLocalRecords(): NetlifyDbRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_DB_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_DB_KEY, JSON.stringify(LOCAL_SEEDS));
      return LOCAL_SEEDS;
    }
    return JSON.parse(raw);
  } catch {
    return LOCAL_SEEDS;
  }
}

function saveLocalRecords(records: NetlifyDbRecord[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_DB_KEY, JSON.stringify(records));
  } catch {
    // ignore
  }
}

/**
 * Fetch records from Netlify Functions (or local fallback storage in preview)
 */
export async function fetchDatabaseRecords<T = Record<string, unknown>>(
  collection: string = 'all',
  tenantId?: string
): Promise<{ records: NetlifyDbRecord<T>[]; backend: 'netlify-blobs' | 'local-storage' }> {
  try {
    const params = new URLSearchParams();
    if (collection && collection !== 'all') params.set('collection', collection);
    if (tenantId) params.set('tenant', tenantId);

    const res = await fetch(`/api/database?${params.toString()}`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return {
          records: json.data as NetlifyDbRecord<T>[],
          backend: json.storageBackend === 'netlify-blobs' ? 'netlify-blobs' : 'local-storage'
        };
      }
    }
  } catch {
    // API not reachable in preview environment; fallback smoothly
  }

  // Fallback to local storage
  let local = getLocalRecords();
  if (collection && collection !== 'all') {
    local = local.filter(r => r.collection === collection);
  }
  if (tenantId) {
    local = local.filter(r => !r.tenantId || r.tenantId === tenantId);
  }

  return {
    records: local as unknown as NetlifyDbRecord<T>[],
    backend: 'local-storage'
  };
}

/**
 * Upsert a record to Netlify Database
 */
export async function saveDatabaseRecord<T = Record<string, unknown>>(
  collection: string,
  tenantId: string,
  data: T,
  existingId?: string
): Promise<{ record: NetlifyDbRecord<T>; backend: 'netlify-blobs' | 'local-storage' }> {
  const payload = {
    collection,
    tenantId,
    data,
    id: existingId || `rec_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/api/database', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.record) {
        return {
          record: json.record as NetlifyDbRecord<T>,
          backend: json.storageBackend === 'netlify-blobs' ? 'netlify-blobs' : 'local-storage'
        };
      }
    }
  } catch {
    // fallback
  }

  // Fallback to local storage
  const local = getLocalRecords();
  const existingIdx = local.findIndex(r => r.id === payload.id);
  const record: NetlifyDbRecord = {
    id: payload.id,
    collection: payload.collection,
    tenantId: payload.tenantId,
    data: payload.data as Record<string, unknown>,
    createdAt: payload.createdAt,
    updatedAt: payload.updatedAt
  };

  if (existingIdx >= 0) {
    local[existingIdx] = record;
  } else {
    local.unshift(record);
  }
  saveLocalRecords(local);

  return {
    record: record as unknown as NetlifyDbRecord<T>,
    backend: 'local-storage'
  };
}

/**
 * Delete a record from Netlify Database
 */
export async function deleteDatabaseRecord(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/database?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      return true;
    }
  } catch {
    // fallback
  }

  const local = getLocalRecords().filter(r => r.id !== id);
  saveLocalRecords(local);
  return true;
}

/**
 * Reset and re-seed database with demonstration multi-tenant data
 */
export function resetLocalDatabase(): NetlifyDbRecord[] {
  localStorage.setItem(LOCAL_STORAGE_DB_KEY, JSON.stringify(LOCAL_SEEDS));
  return LOCAL_SEEDS;
}
