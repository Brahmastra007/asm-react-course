import { redirect } from 'react-router-dom';

// Function for getting the remaining duration before the token expires
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  // No token is set
  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  // The token has expired
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  // We have to always return something from the loader function, otherwise we will get errors
  return null;
}
