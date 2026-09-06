import React, { useState, useEffect } from 'react';
import {
  Database,
  Cloud,
  Layers,
  FileText,
  Upload,
  Trash2,
  Download,
  Copy,
  Check,
  RefreshCw,
  Plus,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  FileBox,
  HardDrive,
  Cpu,
  X,
  ChevronRight,
  Filter
} from 'lucide-react';
import {
  fetchDatabaseRecords,
  saveDatabaseRecord,
  deleteDatabaseRecord,
  resetLocalDatabase,
  NetlifyDbRecord
} from '../services/netlifyDatabase';
import {
  listNetlifyBlobs,
  uploadNetlifyBlob,
  deleteNetlifyBlob,
  StoredBlobItem
} from '../services/netlifyBlobs';

interface NetlifyManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetlifyManagerModal: React.FC<NetlifyManagerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'database' | 'blobs' | 'deploy'>('database');

  // Database State
  const [dbRecords, setDbRecords] = useState<NetlifyDbRecord[]>([]);
  const [dbLoading, setDbLoading] = useState<boolean>(true);
  const [dbBackend, setDbBackend] = useState<string>('local-storage');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedTenant, setSelectedTenant] = useState<string>('all');
  const [inspectRecord, setInspectRecord] = useState<NetlifyDbRecord | null>(null);

  // New Record Form State
  const [isAddingRecord, setIsAddingRecord] = useState<boolean>(false);
  const [newRecCollection, setNewRecCollection] = useState<string>('inventory_audits');
  const [newRecTenant, setNewRecTenant] = useState<string>('iluvkeyks');
  const [newRecJson, setNewRecJson] = useState<string>(
    JSON.stringify({ item: 'Matcha Powder', currentStock: 4.5, unit: 'kg', status: 'low' }, null, 2)
  );

  // Blobs State
  const [blobs, setBlobs] = useState<StoredBlobItem[]>([]);
  const [blobsLoading, setBlobsLoading] = useState<boolean>(true);
  const [blobsBackend, setBlobsBackend] = useState<string>('local-storage');
  const [uploadCategory, setUploadCategory] = useState<string>('Inventory Audit Proof');
  const [uploadTenant, setUploadTenant] = useState<string>('iluvkeyks');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Status & Notification
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const loadData = async () => {
    setDbLoading(true);
    setBlobsLoading(true);

    try {
      const dbRes = await fetchDatabaseRecords();
      setDbRecords(dbRes.records);
      setDbBackend(dbRes.backend);

      const blobRes = await listNetlifyBlobs();
      setBlobs(blobRes.blobs);
      setBlobsBackend(blobRes.backend);
    } catch {
      // ignore
    } finally {
      setDbLoading(false);
      setBlobsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const notify = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(newRecJson);
      await saveDatabaseRecord(newRecCollection, newRecTenant, parsedData);
      setIsAddingRecord(false);
      notify(`Record added to collection '${newRecCollection}'!`);
      loadData();
    } catch {
      alert('Invalid JSON format in record payload.');
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (confirm('Delete this database record?')) {
      await deleteDatabaseRecord(id);
      notify('Record deleted from database.');
      loadData();
    }
  };

  const handleResetDb = () => {
    if (confirm('Reset database to default seed state?')) {
      resetLocalDatabase();
      notify('Database reset to initial demonstration records.');
      loadData();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadNetlifyBlob(file, {
        tenantId: uploadTenant,
        category: uploadCategory,
        description: `Uploaded via Netlify Blobs Manager for tenant: ${uploadTenant}`
      });
      notify(`File "${file.name}" uploaded to Netlify Blobs!`);
      loadData();
    } catch {
      alert('Failed to upload file to Netlify Blobs.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteBlob = async (key: string) => {
    if (confirm(`Delete blob "${key}"?`)) {
      await deleteNetlifyBlob(key);
      notify('Blob deleted from store.');
      loadData();
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleExportDbJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dbRecords, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ordersphere-netlify-db-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    notify('Database JSON backup downloaded!');
  };

  if (!isOpen) return null;

  // Filtered DB records
  const filteredRecords = dbRecords.filter(r => {
    if (selectedCollection !== 'all' && r.collection !== selectedCollection) return false;
    if (selectedTenant !== 'all' && r.tenantId !== selectedTenant) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#020408]/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#050811] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/40 overflow-hidden text-slate-200 font-sans">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-blue-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Netlify Deployment, Database & Blobs Engine
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
                  Netlify Blobs + Serverless DB
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Production-ready configuration with <code className="text-cyan-300">netlify.toml</code>, Netlify Functions, and persistent object storage.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Notice Toast */}
        {actionNotice && (
          <div className="px-6 py-2 bg-cyan-950/80 border-b border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-cyan-400" />
              <span>{actionNotice}</span>
            </div>
            <span className="text-[10px] text-cyan-400/80">Active</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-white/10 bg-black/30 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-2 py-2.5">
            <button
              onClick={() => setActiveTab('database')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'database'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>1. Database Collections ({dbRecords.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blobs')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'blobs'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileBox className="w-4 h-4" />
              <span>2. Netlify Blobs Object Storage ({blobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('deploy')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'deploy'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>3. Netlify Deploy & TOML Config</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Storage: {dbBackend === 'netlify-blobs' ? 'Netlify Blobs Live' : 'Auto Hybrid (Local + Serverless Sync)'}</span>
          </div>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB 1: DATABASE EXPLORER */}
          {activeTab === 'database' && (
            <div className="space-y-4">
              
              {/* Controls bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Filter className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Collection:</span>
                    <select
                      value={selectedCollection}
                      onChange={(e) => setSelectedCollection(e.target.value)}
                      className="bg-black/60 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="all">All Collections</option>
                      <option value="orders">orders (Sales & Barista KDS)</option>
                      <option value="inventory_audits">inventory_audits (Owner Stock Status)</option>
                      <option value="water_refills">water_refills (Hydra Gallon Ledger)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Tenant:</span>
                    <select
                      value={selectedTenant}
                      onChange={(e) => setSelectedTenant(e.target.value)}
                      className="bg-black/60 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="all">All Tenants</option>
                      <option value="iluvkeyks">iLuvKeyks Coffee & Bakery</option>
                      <option value="hydra">Hydra Pure Water Logistics</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddingRecord(!isAddingRecord)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Record</span>
                  </button>
                  <button
                    onClick={handleExportDbJson}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Export all database records as JSON file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </button>
                  <button
                    onClick={handleResetDb}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
                    title="Re-seed demo database records"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Add Record Drawer */}
              {isAddingRecord && (
                <form onSubmit={handleCreateRecord} className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
                      Insert New Record into Netlify Database
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingRecord(false)}
                      className="text-slate-400 hover:text-white text-xs"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Target Collection</label>
                      <input
                        type="text"
                        value={newRecCollection}
                        onChange={(e) => setNewRecCollection(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                        placeholder="e.g. inventory_audits"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Tenant ID</label>
                      <input
                        type="text"
                        value={newRecTenant}
                        onChange={(e) => setNewRecTenant(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                        placeholder="e.g. iluvkeyks or hydra"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Payload JSON Data</label>
                    <textarea
                      value={newRecJson}
                      onChange={(e) => setNewRecJson(e.target.value)}
                      rows={4}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow cursor-pointer"
                    >
                      Save to Netlify Database
                    </button>
                  </div>
                </form>
              )}

              {/* Records List Table */}
              <div className="rounded-xl border border-white/5 bg-black/40 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/[0.02] border-b border-white/5 text-slate-400 font-mono">
                      <tr>
                        <th className="py-2.5 px-4">Record ID</th>
                        <th className="py-2.5 px-4">Collection</th>
                        <th className="py-2.5 px-4">Tenant</th>
                        <th className="py-2.5 px-4">Payload Summary</th>
                        <th className="py-2.5 px-4">Timestamp</th>
                        <th className="py-2.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-500 font-mono">
                            No records found for current filters.
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((r) => (
                          <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 px-4 font-mono text-cyan-400 font-semibold truncate max-w-[120px]">
                              {r.id}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-mono text-[10px]">
                                {r.collection}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono text-[10px]">
                                {r.tenantId || 'global'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-300 font-mono text-[11px] max-w-xs truncate">
                              {JSON.stringify(r.data)}
                            </td>
                            <td className="py-3 px-4 text-slate-500 font-mono text-[10px] whitespace-nowrap">
                              {new Date(r.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setInspectRecord(r)}
                                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-mono cursor-pointer"
                                >
                                  Inspect
                                </button>
                                <button
                                  onClick={() => handleDeleteRecord(r.id)}
                                  className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inspect Record Modal */}
              {inspectRecord && (
                <div className="p-4 rounded-xl bg-slate-900/95 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      Record Inspection: {inspectRecord.id}
                    </span>
                    <button
                      onClick={() => setInspectRecord(null)}
                      className="text-slate-400 hover:text-white text-xs"
                    >
                      Close
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-black text-cyan-400 text-xs font-mono overflow-x-auto max-h-48 border border-white/5">
                    {JSON.stringify(inspectRecord, null, 2)}
                  </pre>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: NETLIFY BLOBS OBJECT STORAGE */}
          {activeTab === 'blobs' && (
            <div className="space-y-5">
              
              {/* Blobs Uploader Box */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-dashed border-cyan-500/40 hover:border-cyan-400 transition-all">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-bold text-white">Upload Asset to Netlify Blobs</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        store: ordersphere-blobs
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Store physical inventory audit proofs, water potability laboratory certificates, dispatch slips, and invoices.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={uploadTenant}
                      onChange={(e) => setUploadTenant(e.target.value)}
                      className="bg-black/80 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    >
                      <option value="iluvkeyks">iLuvKeyks Cafe</option>
                      <option value="hydra">Hydra Water Station</option>
                      <option value="general">Global / Operations</option>
                    </select>

                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="bg-black/80 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    >
                      <option value="Inventory Audit Proof">Inventory Audit Proof</option>
                      <option value="Water Quality Certificate">Water Quality Cert</option>
                      <option value="Dispatch Receipt">Dispatch Receipt</option>
                      <option value="Supplier Invoice">Supplier Invoice</option>
                    </select>

                    <label className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow flex items-center gap-2 cursor-pointer">
                      <Plus className="w-4 h-4" />
                      <span>{isUploading ? 'Uploading...' : 'Choose File'}</span>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Blobs List Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Persisted Netlify Blobs ({blobs.length})</span>
                  <span>Direct Key-Value Object Storage</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {blobs.map((blob) => {
                    const isPdf = blob.mimeType.includes('pdf');
                    const isImage = blob.mimeType.includes('image');

                    return (
                      <div
                        key={blob.key}
                        className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                                {isPdf ? <FileText className="w-4 h-4" /> : isImage ? <FileCheck className="w-4 h-4" /> : <FileBox className="w-4 h-4" />}
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-white truncate" title={blob.name}>
                                  {blob.name}
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono">
                                  {(blob.size / 1024).toFixed(1)} KB • {blob.mimeType}
                                </div>
                              </div>
                            </div>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 shrink-0">
                              {blob.tenantId || 'global'}
                            </span>
                          </div>

                          {blob.description && (
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {blob.description}
                            </p>
                          )}
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                          <button
                            onClick={() => handleCopyKey(blob.key)}
                            className="text-cyan-400 hover:text-cyan-300 font-mono text-[10px] flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === blob.key ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{blob.key.slice(0, 14)}...</span>
                              </>
                            )}
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                alert(`Blob key: ${blob.key}\nStored name: ${blob.name}\nMIME: ${blob.mimeType}`);
                              }}
                              className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                              title="Inspect blob details"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlob(blob.key)}
                              className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                              title="Delete blob"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: NETLIFY DEPLOYMENT & TOML CONFIGURATION */}
          {activeTab === 'deploy' && (
            <div className="space-y-5">
              
              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Check className="w-4 h-4" />
                    <span>netlify.toml Created</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Configured with Vite build, SPA routing redirects, and security headers.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <Check className="w-4 h-4" />
                    <span>Netlify Functions Ready</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    <code className="text-cyan-300">/netlify/functions/database.ts</code> & <code className="text-cyan-300">blobs.ts</code>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1">
                  <div className="flex items-center gap-2 text-blue-400 font-bold">
                    <Check className="w-4 h-4" />
                    <span>@netlify/blobs Configured</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Zero-config automated binding on Netlify deployment.
                  </p>
                </div>
              </div>

              {/* Netlify TOML viewer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 font-mono">netlify.toml Configuration</span>
                  <span className="text-slate-500 font-mono text-[10px]">Root Project File</span>
                </div>

                <pre className="p-4 rounded-xl bg-black text-cyan-300 text-xs font-mono border border-white/5 overflow-x-auto leading-relaxed">
{`[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20"

# Route API requests to Netlify serverless functions
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

# Single Page Application fallback for React client routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Production Security & Performance Headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"`}
                </pre>
              </div>

              {/* 3-Step Deployment Guide */}
              <div className="space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  How to Deploy to Netlify in 3 Simple Steps:
                </h4>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0">1</span>
                    <div>
                      <span className="font-semibold text-white">Push to GitHub or Deploy via Netlify CLI:</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Run <code className="text-cyan-300 bg-black/60 px-1.5 py-0.5 rounded font-mono">npm run build</code>, then connect your Git repository in the Netlify Dashboard (or run <code className="text-cyan-300 bg-black/60 px-1.5 py-0.5 rounded font-mono">npx netlify deploy --prod</code>).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0">2</span>
                    <div>
                      <span className="font-semibold text-white">Netlify Blobs Automatic Binding:</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Netlify automatically binds the <code className="text-cyan-300 font-mono">@netlify/blobs</code> context inside your deployed serverless functions with zero manual token configuration.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0">3</span>
                    <div>
                      <span className="font-semibold text-white">Environment Variables (Optional):</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        In your Netlify Site Settings &gt; Environment Variables, specify any third-party keys or custom domain endpoints if required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Netlify Production Ready: Functions, Database, Blobs & Static CDN</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
