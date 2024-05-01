// Function for getting the auth token
export function getAuthToken() {
  const token = localStorage.getItem('token');
  return token;
}