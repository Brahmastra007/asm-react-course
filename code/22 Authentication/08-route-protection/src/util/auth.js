import { redirect } from 'react-router-dom';

export function getAuthToken() {
  const token = localStorage.getItem('token');
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

// Function to check if user is logged in before visiting any restricted routes and if not,
// then redirect to the login page
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
}