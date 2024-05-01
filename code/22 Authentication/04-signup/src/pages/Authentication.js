import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

// Action for handling form submission for login/signup page
export async function action({ request }) {
  // We can get the 'mode' search param for this route from the 'request' object
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  // Throwing an error if url contains unsupported mode
  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  // Awaiting and extracting form data
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  // Sending the 'POST' request to the appropriate url with appropriate data
  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  // If there are some user errors (e.g. validation errors while signup or incorrect credentials
  // error while login), then return the response so that errors can be shown to the user.
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  // If there is some other error, throw exception which will show the error page.
  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // soon: manage that token
  return redirect('/');
}
