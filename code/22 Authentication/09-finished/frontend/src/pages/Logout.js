import { redirect } from 'react-router-dom';

export function action() {
  localStorage.removeItem('token');
  // Clear the expiration time also while logging out
  localStorage.removeItem('expiration');
  return redirect('/');
}