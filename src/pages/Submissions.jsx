import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LogOut, Search, Download, Trash2, Users, Sparkles, CalendarCheck,
  CheckCircle2, Phone, Mail, Briefcase, Clock, Lock, User, Eye, EyeOff,
  ArrowLeft, ClipboardList,
} from 'lucide-react';
import { isAuthed, login, logout } from '../lib/auth';
import {
  getSubmissions, updateSubmission, deleteSubmission, exportCSV, seedIfEmpty, STATUSES,
} from '../lib/submissions';
import { cn } from '../lib/utils';

const STATUS_STYLES = {
  New: 'bg-brand/10 text-brand border-brand/30',
  Contacted: 'bg-amber-100 text-amber-700 border-amber-300',
  Scheduled: 'bg-blue-100 text-blue-700 border-blue-300',
  Completed: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  Archived: 'bg-slate-100 text-slate-500 border-slate-300',
};

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

/* ------------------------------------------------------------------ Login */

function Login({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (login(username, password)) onSuccess();
    else setError('Incorrect username or password.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-grad-soft px-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-cream p-8 shadow-soft sm:p-10">
        <Link to="/" className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-brand">
          <ArrowLeft size={16} /> Back to site
        </Link>
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-grad-brand text-white shadow-glow">
          <Lock size={24} />
        </div>
        <h1 className="font-display text-2xl font-semibold text-brand-dark">Submissions Dashboard</h1>
        <p className="mb-7 mt-1 text-sm text-muted">Sign in to view and manage consultation requests.</p>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-brand-dark">Username</span>
            <div className="flex items-center gap-2 rounded-xl border border-input bg-wash px-3.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
              <User size={18} className="text-muted" />
              <input
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                autoFocus
                className="w-full bg-transparent py-3 text-ink outline-none"
                placeholder="Enter username"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-brand-dark">Password</span>
            <div className="flex items-center gap-2 rounded-xl border border-input bg-wash px-3.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
              <Lock size={18} className="text-muted" />
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full bg-transparent py-3 text-ink outline-none"
                placeholder="Enter password"
              />
              <button type="button" onClick={() => setShow((s) => !s)} className="text-muted transition hover:text-brand" aria-label="Toggle password visibility">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {error && <p className="rounded-lg bg-rose/10 px-3 py-2 text-sm font-medium text-rose">{error}</p>}

          <button type="submit" className="btn btn-primary w-full">Sign In</button>
        </form>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Stat card */

function Stat({ icon: Icon, label, value, tone }) {
  return (
    <div className="rounded-2xl border border-border bg-cream p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted">{label}</span>
        <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl', tone)}>
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-2 font-display text-3xl font-semibold text-brand-dark">{value}</p>
    </div>
  );
}

/* ---------------------------------------------------------- Detail drawer */

function Detail({ entry, onClose, onStatus, onNote, onDelete }) {
  const [note, setNote] = useState(entry.notes || '');
  useEffect(() => setNote(entry.notes || ''), [entry.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-border p-6">
        <div>
          <h3 className="font-display text-2xl font-semibold text-brand-dark">{entry.fullName || 'Unnamed'}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <Clock size={14} /> {fmtDate(entry.createdAt)} · {fmtTime(entry.createdAt)}
          </p>
        </div>
        <button onClick={onClose} className="text-sm font-semibold text-muted transition hover:text-brand lg:hidden">Close</button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Status</p>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => onStatus(entry.id, s)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition',
                  entry.status === s ? STATUS_STYLES[s] : 'border-border bg-wash text-muted hover:border-brand/40',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Info icon={Phone} label="Phone" value={entry.phone} href={entry.phone && `tel:${entry.phone}`} />
          <Info icon={Mail} label="Email" value={entry.email} href={entry.email && `mailto:${entry.email}`} />
          <Info icon={User} label="Age" value={entry.age} />
          <Info icon={Briefcase} label="Occupation" value={entry.occupation} />
          <Info icon={CalendarCheck} label="Preferred Mode" value={entry.mode} />
        </div>

        {entry.support?.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Support Areas</p>
            <div className="flex flex-wrap gap-2">
              {entry.support.map((s) => (
                <span key={s} className="rounded-full bg-wash px-3 py-1 text-xs font-medium text-brand-dark">{s}</span>
              ))}
            </div>
          </div>
        )}

        {entry.concern && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Concern</p>
            <p className="rounded-xl bg-wash p-4 text-sm leading-relaxed text-ink">{entry.concern}</p>
          </div>
        )}

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Private Notes</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={() => onNote(entry.id, note)}
            rows={4}
            placeholder="Add notes about this patient (saved automatically)…"
            className="w-full rounded-xl border border-input bg-wash p-3.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>

      <div className="border-t border-border p-6">
        <button
          onClick={() => onDelete(entry.id)}
          className="inline-flex items-center gap-2 rounded-full border border-rose/30 px-4 py-2 text-sm font-semibold text-rose transition hover:bg-rose/10"
        >
          <Trash2 size={16} /> Delete submission
        </button>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value, href }) {
  if (!value) return null;
  const inner = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-wash text-brand"><Icon size={16} /></span>
      <span className="min-w-0">
        <span className="block text-xs text-muted">{label}</span>
        <span className="block truncate text-sm font-medium text-brand-dark">{value}</span>
      </span>
    </>
  );
  const cls = 'flex items-center gap-3 rounded-xl border border-border bg-cream p-3';
  return href ? <a href={href} className={cn(cls, 'transition hover:border-brand/40')}>{inner}</a> : <div className={cls}>{inner}</div>;
}

/* ------------------------------------------------------------- Dashboard */

function Dashboard({ onLogout }) {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');
  const [sort, setSort] = useState('newest');
  const [selectedId, setSelectedId] = useState(null);

  const refresh = () => setItems(getSubmissions());

  useEffect(() => {
    seedIfEmpty();
    refresh();
    const onChange = () => refresh();
    window.addEventListener('submissions:changed', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('submissions:changed', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 1000 * 60 * 60 * 24 * 7;
    return {
      total: items.length,
      new: items.filter((i) => i.status === 'New').length,
      week: items.filter((i) => new Date(i.createdAt).getTime() > weekAgo).length,
      active: items.filter((i) => i.status === 'Scheduled' || i.status === 'Contacted').length,
    };
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items.filter((i) => {
      if (statusFilter !== 'All' && i.status !== statusFilter) return false;
      if (modeFilter !== 'All' && i.mode !== modeFilter) return false;
      if (!q) return true;
      return [i.fullName, i.email, i.phone, i.occupation, ...(i.support || [])]
        .join(' ').toLowerCase().includes(q);
    });
    list = list.sort((a, b) => {
      const d = new Date(a.createdAt) - new Date(b.createdAt);
      return sort === 'newest' ? -d : d;
    });
    return list;
  }, [items, query, statusFilter, modeFilter, sort]);

  const selected = filtered.find((i) => i.id === selectedId) || items.find((i) => i.id === selectedId);

  const handleStatus = (id, status) => updateSubmission(id, { status });
  const handleNote = (id, notes) => updateSubmission(id, { notes });
  const handleDelete = (id) => {
    if (!window.confirm('Delete this submission permanently?')) return;
    deleteSubmission(id);
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-grad-soft">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-cream/90 backdrop-blur-md">
        <div className="container flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-grad-brand text-white shadow-glow">
              <ClipboardList size={20} />
            </span>
            <div>
              <p className="font-display text-lg font-semibold leading-tight text-brand-dark">Brainversation</p>
              <p className="text-xs text-muted">Patient Submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportCSV(filtered)}
              disabled={filtered.length === 0}
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-wash disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download size={16} /> <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand">
              <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Users} label="Total Submissions" value={stats.total} tone="bg-brand/10 text-brand" />
          <Stat icon={Sparkles} label="New / Unreviewed" value={stats.new} tone="bg-amber-100 text-amber-600" />
          <Stat icon={CalendarCheck} label="In Progress" value={stats.active} tone="bg-blue-100 text-blue-600" />
          <Stat icon={CheckCircle2} label="This Week" value={stats.week} tone="bg-emerald-100 text-emerald-600" />
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-input bg-cream px-3.5 shadow-card focus-within:border-brand">
            <Search size={18} className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone, occupation…"
              className="w-full bg-transparent py-2.5 text-sm text-ink outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onChange={setStatusFilter} options={['All', ...STATUSES]} label="Status" />
            <Select value={modeFilter} onChange={setModeFilter} options={['All', 'Online', 'In-Person']} label="Mode" />
            <Select value={sort} onChange={setSort} options={[['newest', 'Newest first'], ['oldest', 'Oldest first']]} />
          </div>
        </div>

        {/* Master-detail */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* List */}
          <div className="space-y-3">
            <p className="text-sm text-muted">
              Showing <strong className="text-brand-dark">{filtered.length}</strong> of {items.length}
            </p>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-cream p-10 text-center text-muted">
                No submissions match your filters.
              </div>
            ) : (
              filtered.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => setSelectedId(entry.id)}
                  className={cn(
                    'w-full rounded-2xl border bg-cream p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-soft',
                    selectedId === entry.id ? 'border-brand ring-2 ring-brand/20' : 'border-border',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-brand-dark">{entry.fullName || 'Unnamed'}</p>
                      <p className="truncate text-sm text-muted">{entry.email || entry.phone || '—'}</p>
                    </div>
                    <span className={cn('shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold', STATUS_STYLES[entry.status])}>
                      {entry.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted">
                    <span className="flex items-center gap-1"><Clock size={12} /> {fmtDate(entry.createdAt)}</span>
                    {entry.mode && <span className="rounded-full bg-wash px-2 py-0.5 font-medium text-brand-dark">{entry.mode}</span>}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Detail */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            {selected ? (
              <div className="h-full overflow-hidden rounded-2xl border border-border bg-cream shadow-soft">
                <Detail
                  entry={selected}
                  onClose={() => setSelectedId(null)}
                  onStatus={handleStatus}
                  onNote={handleNote}
                  onDelete={handleDelete}
                />
              </div>
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-cream/60 p-10 text-center text-muted">
                <ClipboardList size={40} className="mb-3 text-brand/40" />
                <p className="font-medium text-brand-dark">Select a submission</p>
                <p className="text-sm">Choose a patient from the list to view details and manage their record.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Select({ value, onChange, options, label }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-input bg-cream px-3.5 py-2.5 text-sm font-medium text-brand-dark shadow-card outline-none transition focus:border-brand"
    >
      {options.map((o) => {
        const [val, text] = Array.isArray(o) ? o : [o, o];
        return <option key={val} value={val}>{label ? `${label}: ${text}` : text}</option>;
      })}
    </select>
  );
}

/* ------------------------------------------------------------------ Page */

export default function Submissions() {
  const [authed, setAuthed] = useState(isAuthed());

  useEffect(() => { document.title = 'Submissions · Brainversation'; }, []);

  const handleLogout = () => { logout(); setAuthed(false); };

  return authed
    ? <Dashboard onLogout={handleLogout} />
    : <Login onSuccess={() => setAuthed(true)} />;
}
