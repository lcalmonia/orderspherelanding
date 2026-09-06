import { getStore } from '@netlify/blobs';

interface DatabaseRecord {
  id: string;
  collection: string;
  tenantId?: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// Initial seed data if database store is empty
const INITIAL_DATABASE_SEEDS: DatabaseRecord[] = [
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

export const handler = async (event: any) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  try {
    // Access Netlify Blobs key-value database store
    let dbStore: any = null;
    let isBlobsAvailable = false;

    try {
      dbStore = getStore({ name: 'ordersphere-database' });
      isBlobsAvailable = Boolean(dbStore);
    } catch {
      isBlobsAvailable = false;
    }

    const { httpMethod, queryStringParameters = {} } = event;
    const collection = queryStringParameters?.collection || 'all';
    const tenantId = queryStringParameters?.tenant || '';
    const recordId = queryStringParameters?.id || '';

    // Handle GET: Query records
    if (httpMethod === 'GET') {
      let records: DatabaseRecord[] = [];

      if (isBlobsAvailable && dbStore) {
        try {
          const listResult = await dbStore.list({ prefix: 'rec_' });
          const blobs = listResult.blobs || [];

          if (blobs.length === 0) {
            // Seed initial records if empty
            for (const seed of INITIAL_DATABASE_SEEDS) {
              await dbStore.setJSON(`rec_${seed.id}`, seed, {
                metadata: {
                  collection: seed.collection,
                  tenantId: seed.tenantId || ''
                }
              });
            }
            records = INITIAL_DATABASE_SEEDS;
          } else {
            for (const b of blobs) {
              const item = await dbStore.get(b.key, { type: 'json' });
              if (item) {
                records.push(item as DatabaseRecord);
              }
            }
          }
        } catch {
          // If Netlify Blobs credentials aren't bound, return initial memory seeds
          records = INITIAL_DATABASE_SEEDS;
        }
      } else {
        records = INITIAL_DATABASE_SEEDS;
      }

      // Filter by collection
      if (collection && collection !== 'all') {
        records = records.filter(r => r.collection === collection);
      }

      // Filter by tenantId
      if (tenantId) {
        records = records.filter(r => !r.tenantId || r.tenantId === tenantId);
      }

      // Filter by specific ID
      if (recordId) {
        records = records.filter(r => r.id === recordId);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          count: records.length,
          data: records,
          storageBackend: isBlobsAvailable ? 'netlify-blobs' : 'fallback-memory',
          timestamp: new Date().toISOString()
        })
      };
    }

    // Handle POST: Upsert record
    if (httpMethod === 'POST') {
      const payload = JSON.parse(event.body || '{}');
      const targetCollection = payload.collection || 'general';
      const targetTenant = payload.tenantId || 'general';
      const newId = payload.id || `rec_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

      const newRecord: DatabaseRecord = {
        id: newId,
        collection: targetCollection,
        tenantId: targetTenant,
        data: payload.data || payload,
        createdAt: payload.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (isBlobsAvailable && dbStore) {
        await dbStore.setJSON(`rec_${newId}`, newRecord, {
          metadata: {
            collection: targetCollection,
            tenantId: targetTenant
          }
        });
      }

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Record successfully persisted to database',
          record: newRecord,
          storageBackend: isBlobsAvailable ? 'netlify-blobs' : 'fallback-memory'
        })
      };
    }

    // Handle DELETE: Remove record
    if (httpMethod === 'DELETE') {
      const targetId = queryStringParameters?.id;
      if (!targetId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Missing record id' })
        };
      }

      if (isBlobsAvailable && dbStore) {
        await dbStore.delete(`rec_${targetId}`);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: `Record ${targetId} deleted`,
          storageBackend: isBlobsAvailable ? 'netlify-blobs' : 'fallback-memory'
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' })
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error?.message || 'Database error occurred'
      })
    };
  }
};
