import { redirect } from 'react-router-dom';

// This action will clear the auth token from the local storage and redirect to home page
export function action() {
  localStorage.removeItem('token');
  return redirect('/');
}