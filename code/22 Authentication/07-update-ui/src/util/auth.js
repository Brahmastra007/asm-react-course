export function getAuthToken() {
  const token = localStorage.getItem('token');
  return token;
}

// Loader for getting the auth token
export function tokenLoader() {
  return getAuthToken();
}