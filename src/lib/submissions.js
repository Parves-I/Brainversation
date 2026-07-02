// Client-side persistence for consultation form submissions.
// Stored in localStorage under a single key as a JSON array.
// NOTE: This is a frontend-only store (no backend). Submissions live in the
// browser they were created in. For a production multi-device setup, replace
// these functions with API calls to a real backend.

const KEY = 'brainversation_submissions';

export const STATUSES = ['New', 'Contacted', 'Scheduled', 'Completed', 'Archived'];

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function write(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
  // Notify listeners in the same tab (storage event only fires cross-tab).
  window.dispatchEvent(new Event('submissions:changed'));
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getSubmissions() {
  return read().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addSubmission(data) {
  const list = read();
  const entry = {
    id: uid(),
    createdAt: new Date().toISOString(),
    status: 'New',
    notes: '',
    ...data,
  };
  list.push(entry);
  write(list);
  return entry;
}

export function updateSubmission(id, patch) {
  const list = read().map((s) => (s.id === id ? { ...s, ...patch } : s));
  write(list);
}

export function deleteSubmission(id) {
  write(read().filter((s) => s.id !== id));
}

export function clearAll() {
  write([]);
}

// CSV export ---------------------------------------------------------------

const CSV_COLUMNS = [
  ['createdAt', 'Submitted'],
  ['fullName', 'Full Name'],
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['age', 'Age'],
  ['occupation', 'Occupation'],
  ['mode', 'Mode'],
  ['support', 'Support Areas'],
  ['concern', 'Concern'],
  ['status', 'Status'],
  ['notes', 'Notes'],
];

function csvCell(value) {
  const s = Array.isArray(value) ? value.join('; ') : value == null ? '' : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

export function exportCSV(rows) {
  const header = CSV_COLUMNS.map(([, label]) => csvCell(label)).join(',');
  const body = rows
    .map((r) => CSV_COLUMNS.map(([key]) => csvCell(r[key])).join(','))
    .join('\n');
  const csv = `${header}\n${body}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `brainversation-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Optional: seed a couple of demo entries so the dashboard isn't empty on first
// open. Only runs when the store is completely empty.
export function seedIfEmpty() {
  if (read().length > 0) return;
  const now = Date.now();
  const demo = [
    {
      id: uid(),
      createdAt: new Date(now - 1000 * 60 * 60 * 6).toISOString(),
      fullName: 'Ananya Sharma',
      phone: '+91 98840 12345',
      email: 'ananya.sharma@example.com',
      age: '28',
      occupation: 'Software Engineer',
      mode: 'Online',
      support: ['Anxiety & Stress', 'Personal Growth'],
      concern: 'Feeling overwhelmed with work deadlines and struggling to switch off in the evenings.',
      status: 'New',
      notes: '',
    },
    {
      id: uid(),
      createdAt: new Date(now - 1000 * 60 * 60 * 30).toISOString(),
      fullName: 'Rahul Menon',
      phone: '+91 90032 55678',
      email: 'rahul.menon@example.com',
      age: '41',
      occupation: 'Teacher',
      mode: 'In-Person',
      support: ['Grief & Loss'],
      concern: 'Recently lost a close family member and finding it hard to cope.',
      status: 'Contacted',
      notes: 'Called on 30th, prefers weekend slots.',
    },
  ];
  write(demo);
}
