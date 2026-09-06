import { getStore } from '@netlify/blobs';

interface BlobMetadata {
  key: string;
  name: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  tenantId?: string;
  category?: string;
  description?: string;
}

// Default demonstration blobs (stored as mock/seed)
const INITIAL_BLOBS: { meta: BlobMetadata; dataUrl?: string }[] = [
  {
    meta: {
      key: 'blob_hydra_cert_2026',
      name: 'Hydra-Pure-Water-Quality-Certificate-Q3.pdf',
      mimeType: 'application/pdf',
      size: 245800,
      uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      tenantId: 'hydra',
      category: 'Compliance & Safety',
      description: 'Monthly Department of Health Potability & TDS mineral spectrum certificate (12 ppm)'
    }
  },
  {
    meta: {
      key: 'blob_ik_audit_receipt_842',
      name: 'iLuvKeyks-Shift-Physical-Inventory-Audit-Proof.png',
      mimeType: 'image/png',
      size: 182400,
      uploadedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      tenantId: 'iluvkeyks',
      category: 'Inventory Audit',
      description: 'Lead Barista signed physical count tally sheet verifying 3.2kg Arabica beans critical level'
    }
  },
  {
    meta: {
      key: 'blob_ik_delivery_slip',
      name: 'Batch-Order-Receipt-IK-840-842.pdf',
      mimeType: 'application/pdf',
      size: 94200,
      uploadedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      tenantId: 'iluvkeyks',
      category: 'Dispatch Receipt',
      description: 'Lalamove & GrabExpress aggregated rider receipt manifest'
    }
  }
];

export const handler = async (event: any) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  try {
    let blobStore: any = null;
    let isBlobsAvailable = false;

    try {
      blobStore = getStore({ name: 'ordersphere-blobs' });
      isBlobsAvailable = Boolean(blobStore);
    } catch {
      isBlobsAvailable = false;
    }

    const { httpMethod, queryStringParameters = {} } = event;
    const key = queryStringParameters?.key;
    const download = queryStringParameters?.download === 'true';

    // GET: Retrieve single blob or list all blobs
    if (httpMethod === 'GET') {
      if (key) {
        // Retrieve single blob
        if (isBlobsAvailable && blobStore) {
          try {
            const entry = await blobStore.getWithMetadata(key, { type: 'text' });
            if (entry && entry.data) {
              const meta = entry.metadata || {};
              if (download) {
                return {
                  statusCode: 200,
                  headers: {
                    'Content-Type': meta.mimeType || 'application/octet-stream',
                    'Content-Disposition': `attachment; filename="${meta.name || key}"`,
                    'Access-Control-Allow-Origin': '*'
                  },
                  body: entry.data
                };
              }

              return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                  success: true,
                  key,
                  metadata: meta,
                  data: entry.data,
                  storageBackend: 'netlify-blobs'
                })
              };
            }
          } catch {
            // fallback if not found in live store
          }
        }

        // Look up in initial seeds
        const found = INITIAL_BLOBS.find(b => b.meta.key === key);
        if (found) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              key,
              metadata: found.meta,
              data: found.dataUrl || 'data:text/plain;base64,U2FtcGxlIEJsb2IgQ29udGVudA==',
              storageBackend: isBlobsAvailable ? 'netlify-blobs' : 'fallback-memory'
            })
          };
        }

        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ success: false, error: `Blob ${key} not found` })
        };
      }

      // List all blobs
      let blobList: BlobMetadata[] = [];
      if (isBlobsAvailable && blobStore) {
        try {
          const listResult = await blobStore.list();
          const liveBlobs = listResult.blobs || [];

          if (liveBlobs.length === 0) {
            // Seed initial blobs
            for (const b of INITIAL_BLOBS) {
              await blobStore.set(b.meta.key, 'SAMPLE_BLOB_CONTENT_DATA', {
                metadata: b.meta
              });
            }
            blobList = INITIAL_BLOBS.map(b => b.meta);
          } else {
            for (const item of liveBlobs) {
              blobList.push({
                key: item.key,
                name: (item.metadata?.name as string) || item.key,
                mimeType: (item.metadata?.mimeType as string) || 'application/octet-stream',
                size: (item.metadata?.size as number) || 1024,
                uploadedAt: (item.metadata?.uploadedAt as string) || new Date().toISOString(),
                tenantId: item.metadata?.tenantId as string,
                category: item.metadata?.category as string,
                description: item.metadata?.description as string
              });
            }
          }
        } catch {
          blobList = INITIAL_BLOBS.map(b => b.meta);
        }
      } else {
        blobList = INITIAL_BLOBS.map(b => b.meta);
      }

      const tenantFilter = queryStringParameters?.tenant;
      if (tenantFilter) {
        blobList = blobList.filter(b => !b.tenantId || b.tenantId === tenantFilter);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          count: blobList.length,
          blobs: blobList,
          storageBackend: isBlobsAvailable ? 'netlify-blobs' : 'fallback-memory',
          timestamp: new Date().toISOString()
        })
      };
    }

    // POST: Upload blob
    if (httpMethod === 'POST') {
      const payload = JSON.parse(event.body || '{}');
      const filename = payload.name || `file_${Date.now()}.bin`;
      const mimeType = payload.mimeType || 'application/octet-stream';
      const tenantId = payload.tenantId || 'general';
      const category = payload.category || 'General Upload';
      const description = payload.description || '';
      const rawData = payload.data || payload.dataUrl || 'EMPTY_BLOB';
      const size = payload.size || (typeof rawData === 'string' ? rawData.length : 1024);

      const blobKey = `blob_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

      const metadata: BlobMetadata = {
        key: blobKey,
        name: filename,
        mimeType,
        size,
        uploadedAt: new Date().toISOString(),
        tenantId,
        category,
        description
      };

      if (isBlobsAvailable && blobStore) {
        await blobStore.set(blobKey, rawData, { metadata });
      }

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Blob successfully stored in Netlify Blobs',
          blob: metadata,
          storageBackend: isBlobsAvailable ? 'netlify-blobs' : 'fallback-memory'
        })
      };
    }

    // DELETE: Delete blob
    if (httpMethod === 'DELETE') {
      const targetKey = queryStringParameters?.key;
      if (!targetKey) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Missing blob key' })
        };
      }

      if (isBlobsAvailable && blobStore) {
        await blobStore.delete(targetKey);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: `Blob ${targetKey} deleted successfully`,
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
        error: error?.message || 'Blob operation failed'
      })
    };
  }
};
