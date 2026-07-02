// Simple client-side gate for the submissions dashboard.
// NOTE: This is NOT real security — credentials live in the bundle and the
// check runs in the browser. It only keeps the dashboard out of casual view.
// For genuine protection, move auth + data behind a backend.

const CREDENTIALS = { username: 'Chaandini', password: 'TCFXChaandini@2026' };
const SESSION_KEY = 'brainversation_admin_session';

export function login(username, password) {
  const ok = username === CREDENTIALS.username && password === CREDENTIALS.password;
  if (ok) sessionStorage.setItem(SESSION_KEY, '1');
  return ok;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAuthed() {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}
