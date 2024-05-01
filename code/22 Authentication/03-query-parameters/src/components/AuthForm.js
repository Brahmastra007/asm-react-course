import { Form, Link, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

// We use this form for both login and signup
function AuthForm() {
  // We can get the query parameters (after '?' in the url) using this hook
  const [searchParams] = useSearchParams();
  // If the mode is 'login', then we display the Login Form otherwise the Signup Form
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <>
      <Form method="post" className={classes.form}>
        {/* Displaying different title for the form according to the mode */}
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          {/* This link will be used to switch modes, i.e. from 'Login' to 'Signup' and vice versa
          by changing the query parameter */}
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
